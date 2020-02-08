import Pointer from '../assets/img/pointer.png'
import { config } from '../config'
import { Store } from '../lib/store'
import { store, GameState } from './store'
import { CanvasAPI } from '../lib/canvas'

export type ChangeScene = (scene: Renderable) => void

export abstract class Renderable extends CanvasAPI {
	protected store: Store<GameState> = store

	constructor(protected setActiveScene: ChangeScene) {
		super()
		if (this.onInit) setTimeout(() => (this.onInit as any)(), 1)
	}

	public onInit?(): void
	public onChanges?(): void
	public abstract render(): void

	public get state() {
		return this.store.currentState
	}

	public get cursorPosition() {
		return this.state.input.cursorPosition
	}

	public printState(
		x: number,
		y: number,
		size: number,
		selector?: (state: GameState) => any,
		color: string = 'yellow'
	) {
		const { currentState } = this.store
		const text = JSON.stringify(
			selector ? selector(currentState) : currentState
		)

		this.fillText({
			x,
			y,
			text,
			size,
			name: config.fontName,
			color
		})
	}

	public setFontSize(size: number, font: string = config.fontName) {
		super.setFontSize(size, font)
	}

	public drawCursor(
		x: number = this.cursorPosition ? this.cursorPosition[0] : 0,
		y: number = this.cursorPosition ? this.cursorPosition[1] : 0
	) {
		this.loadFrame()
		const image = new Image()
		image.src = Pointer
		this.ctx.drawImage(image, x - 4, y - 2)
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
