export type CTX = CanvasRenderingContext2D

const frameCache = new Image()

export class CanvasAPI {
	public static readonly canvas: HTMLCanvasElement = document.createElement(
		'canvas'
	)
	public static readonly ctx: CTX = CanvasAPI.canvas.getContext('2d') as CTX

	public get ctx() {
		return CanvasAPI.ctx
	}

	public get canvas() {
		return CanvasAPI.canvas
	}

	public getClientBoundingRect() {
		return this.canvas.getBoundingClientRect()
	}

	public getFontName() {
		return this.ctx.font.split(' ').pop()
	}

	public clear() {
		const { width, height } = this.getClientBoundingRect()
		this.fillRect({ x: 0, y: 0, width, height, color: 'black' })
	}

	public saveFrame(): void {
		frameCache.src = this.ctx.canvas.toDataURL()
	}

	public loadFrame(): void {
		if (frameCache.src) {
			this.ctx.drawImage(frameCache, 0, 0)
		}
	}

	public setFontSize(size: number, font: string) {
		const { width, height } = document.body.getBoundingClientRect()
		const relativeSize = Math.floor((size / ((width + height) / 4)) * 100)
		this.ctx.font = `${relativeSize}px "${font}"`
	}

	public doWithFont<T = void>({
		fn,
		align,
		baseline,
		color,
		alpha,
		size,
		name
	}: DoWithFontParams<T>): T {
		const { font, textAlign, textBaseline } = this.ctx
		this.setFontSize(size, name)
		this.ctx.textAlign = align || textAlign
		this.ctx.textBaseline = baseline || textBaseline
		const value = this.doWithColor({
			fn: () => fn(this.ctx),
			color,
			alpha
		})
		this.ctx.font = font
		this.ctx.textAlign = textAlign
		this.ctx.textBaseline = textBaseline
		return value
	}

	public doWithColor<T = void>({ fn, color, alpha }: DoWithColorParams<T>): T {
		const { globalAlpha, fillStyle } = this.ctx
		this.ctx.fillStyle = color || fillStyle
		this.ctx.globalAlpha = alpha || 1
		const value = fn(this.ctx)
		this.ctx.fillStyle = fillStyle
		this.ctx.globalAlpha = globalAlpha
		return value
	}

	public fillRect({ x, y, width, height, color, alpha }: FillRectParams): void {
		this.doWithColor({
			fn: () => this.ctx.fillRect(x, y, width, height),
			color,
			alpha
		})
	}

	public fillText({
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
			fn: () => this.ctx.fillText(text, x, y),
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
	fn: (ctx: CTX) => T
}

export type DoWithFontParams<T> = FontParams & CtxFunctionWrapper<T>
export type DoWithColorParams<T> = ColorParams & CtxFunctionWrapper<T>
