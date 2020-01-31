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
}
