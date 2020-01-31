import { config } from '../config'

type CTX = CanvasRenderingContext2D

export abstract class Renderable {
	public get state(): any {
		return
	}

	constructor(stateGetter: () => any) {
		Object.defineProperty(this, 'state', {
			get: stateGetter
		})
	}

	public abstract render(ctx: CTX): void

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

	public cursorInArea(x1: number, y1: number, x2: number, y2: number) {
		const [mx, my] = this.state.cursorPosition
		const isInArea = mx >= x1 && mx <= x2 && my >= y1 && my <= y2

		return isInArea
	}

	public keyIsPressed(key: keyof typeof config.keyBindings) {
		return config.keyBindings[key].some(key => this.state.keys.includes(key))
	}
}
