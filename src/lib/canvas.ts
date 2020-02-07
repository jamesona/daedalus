export type CTX = CanvasRenderingContext2D

const frameCache = new Image()

export class CanvasAPI {
	public getCanvas(ctx: CTX) {
		return ctx.canvas
	}

	public getClientBoundingRect(ctx: CTX) {
		return this.getCanvas(ctx).getBoundingClientRect()
	}

	public getFontName(ctx: CTX) {
		return ctx.font.split(' ').pop()
	}

	public clear(ctx: CTX) {
		const { width, height } = this.getClientBoundingRect(ctx)
		this.fillRect({ ctx, x: 0, y: 0, width, height })
	}

	public saveFrame(ctx: CTX): void {
		ctx.canvas.toBlob(blob => {
			if (frameCache.src) {
				URL.revokeObjectURL(frameCache.src)
			}
			frameCache.src = URL.createObjectURL(blob)
		})
	}

	public loadFrame(ctx: CTX): void {
		if (frameCache.src) {
			ctx.drawImage(frameCache, 0, 0)
		}
	}

	public setFontSize(
		ctx: CanvasRenderingContext2D,
		size: number,
		font: string
	) {
		ctx.font = `${size}% "${font}"`
	}

	public doWithFont<T = void>({
		ctx,
		fn,
		align,
		baseline,
		color,
		alpha,
		size,
		name
	}: DoWithFontParams<T>): T {
		const { font, textAlign, textBaseline } = ctx
		this.setFontSize(ctx, size, name)
		ctx.textAlign = align || textAlign
		ctx.textBaseline = baseline || textBaseline
		const value = this.doWithColor({
			ctx,
			fn: () => fn(ctx),
			color,
			alpha
		})
		ctx.font = font
		ctx.textAlign = textAlign
		ctx.textBaseline = textBaseline
		return value
	}

	public doWithColor<T = void>({
		ctx,
		fn,
		color,
		alpha
	}: DoWithColorParams<T>): T {
		const { globalAlpha, fillStyle } = ctx
		ctx.fillStyle = color || fillStyle
		ctx.globalAlpha = alpha || 1
		const value = fn(ctx)
		ctx.fillStyle = fillStyle
		ctx.globalAlpha = globalAlpha
		return value
	}

	public fillRect({
		ctx,
		x,
		y,
		width,
		height,
		color,
		alpha
	}: FillRectParams): void {
		this.doWithColor({
			ctx,
			fn: () => ctx.fillRect(x, y, width, height),
			color,
			alpha
		})
	}

	public fillText({
		ctx,
		text,
		x,
		y,
		color,
		alpha,
		size,
		align,
		baseline,
		name
	}: FillParams & FontParams & { text: string }): void {
		this.doWithFont({
			ctx,
			fn: () => ctx.fillText(text, x, y),
			color,
			alpha,
			size,
			align,
			baseline,
			name
		})
	}
}

export interface ColorParams {
	color?: string
	alpha?: number
}

export interface FillParams extends ColorParams {
	ctx: CTX
	x: number
	y: number
}

export interface FillRectParams extends FillParams {
	width: number
	height: number
}

export interface FontParams extends ColorParams {
	size: number
	align?: CanvasTextAlign
	baseline?: CanvasTextBaseline
	name: string
}

export interface FillTextParams extends FillParams {
	text: string
}

export interface CtxFunctionWrapper<T> {
	ctx: CTX
	fn: (ctx: CTX) => T
}

export type DoWithFontParams<T> = FontParams & CtxFunctionWrapper<T>
export type DoWithColorParams<T> = ColorParams & CtxFunctionWrapper<T>
