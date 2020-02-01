import { config } from '../config'
import { GameState } from './game-state'

type CTX = CanvasRenderingContext2D

export abstract class Renderable {
	constructor(
		stateGetter: () => GameState,
		public state: GameState = undefined as never
	) {
		Object.defineProperty(this, 'state', {
			get: stateGetter
		})
	}

	public abstract render(ctx: CTX): void

	public isDefined<T>(value: T): value is Exclude<T, undefined> {
		return value !== undefined
	}

	public isNotNull<T>(value: T): value is Exclude<T, null> {
		return value !== null
	}

	public isNotNullish<T>(value: T): value is Exclude<T, null | undefined> {
		return this.isDefined(value) && this.isNotNull(value)
	}

	public getCanvas(ctx: CTX) {
		return ctx.canvas
	}

	public getClientBoundingRect(ctx: CTX) {
		this.getCanvas(ctx).getBoundingClientRect()
	}

	public getFontName(ctx: CTX) {
		return ctx.font.split(' ').pop()
	}

	public setFontSize(
		ctx: CanvasRenderingContext2D,
		size: number,
		font: string = config.fontName
	) {
		ctx.font = `${size * 10}% "${font}"`
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
		this.setFontSize(ctx, size, name || config.fontName)
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

	public cursorInArea(x1: number, y1: number, x2: number, y2: number) {
		if (!this.state.cursorPosition) return false

		const [mx, my] = this.state.cursorPosition
		const isInArea = mx >= x1 && mx <= x2 && my >= y1 && my <= y2

		return isInArea
	}

	public keyIsPressed(key: keyof typeof config.keyBindings) {
		return config.keyBindings[key].some(boundKey =>
			this.state.keys.includes(boundKey)
		)
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
	name?: string
}

export interface FillTextParams extends FillParams {
	text: string
}

export interface CtxFunctionWrappper<T> {
	ctx: CTX
	fn: (ctx: CTX) => T
}

export type DoWithFontParams<T> = FontParams & CtxFunctionWrappper<T>
export type DoWithColorParams<T> = ColorParams & CtxFunctionWrappper<T>
