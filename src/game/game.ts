import { Renderable } from './renderable'
import { MainMenu } from './scenes/main-menu'
import { InputHandler } from './input-handler/input-handler'
import { store } from './store'
import { CanvasAPI } from '../lib/canvas'

export class Game extends CanvasAPI {
	private _activeScene: Renderable | undefined
	private _resizeListener: any | undefined

	constructor(hostElement: HTMLElement) {
		super()
		hostElement.innerHTML = ''
		hostElement.appendChild(this.canvas)
		store.select(state => state).subscribe(() => this.render())
		InputHandler.onInit()
		this.setActiveScene(
			new MainMenu((scene: Renderable) => this.setActiveScene(scene))
		)
		this.onClientRectUpdate()
	}

	public setActiveScene(scene: Renderable) {
		this._activeScene = scene
	}

	public onClientRectUpdate() {
		if (!this._resizeListener) {
			this._resizeListener = window.addEventListener('resize', () =>
				this.onClientRectUpdate()
			)
		}
		const rect: DOMRect = this.canvas.getBoundingClientRect()
		this.canvas.setAttribute('width', String(rect.width))
		this.canvas.setAttribute('height', String(rect.height))
		this.clear()
		this.render()
	}

	public setScene(scene: Renderable) {
		this._activeScene = scene
	}

	public render() {
		if (this._activeScene) {
			this._activeScene.clear()
			this._activeScene.render()
			// this._activeScene.saveFrame()
			this._activeScene.drawCursor()
		}
	}
}
