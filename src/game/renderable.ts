import Pointer from '../assets/img/pointer.png'
import { config } from '../config'
import { Store } from '../lib/store'
import { store, GameState } from './store'
import { CanvasAPI, CTX } from '../lib/canvas'

export type ChangeScene = (scene: Renderable) => void

export abstract class Renderable extends CanvasAPI {
	protected store: Store<GameState> = store

	constructor(protected setActiveScene: ChangeScene) {
		super()
		if (this.onInit) this.onInit()
	}

	public onInit?(): void
	public abstract render(ctx: CTX): void

	public get state() {
		return this.store.currentState
	}

	public setFontSize(
		ctx: CanvasRenderingContext2D,
		size: number,
		font: string = config.fontName
	) {
		super.setFontSize(ctx, size, font)
	}

	public drawCursor(ctx: CTX, x: number, y: number) {
		this.loadFrame(ctx)
		const image = new Image()
		image.src = Pointer
		ctx.drawImage(image, x - 4, y - 2)
	}

	public cursorInArea(x1: number, y1: number, x2: number, y2: number) {
		if (!this.state?.input?.cursorPosition) return false
		const [mx, my] = this.state.input.cursorPosition
		const isInArea = mx >= x1 && mx <= x2 && my >= y1 && my <= y2

		return isInArea
	}

	public keyIsPressed(key: keyof typeof config.keyBindings) {
		return this.state?.input?.keysDown?.includes(key)
	}
}
