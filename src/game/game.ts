import { Renderable } from './renderable'
import { MainMenu } from './scenes/main-menu'
import { InputHandler } from './input-handler/input-handler'

export class Game {
	private _inputHandler = new InputHandler()
	private _canvas: HTMLCanvasElement = document.createElement('canvas')
	private _renderContext = this._canvas.getContext(
		'2d'
	) as CanvasRenderingContext2D
	private _activeScene: Renderable = new MainMenu((scene: Renderable) =>
		this.setActiveScene(scene)
	)

	constructor(hostElement: HTMLElement) {
		hostElement.innerHTML = ''
		hostElement.appendChild(this._canvas)
		window.addEventListener('resize', () => this.onClientRectUpdate())
		this._inputHandler
			.cursorPosition$()
			.subscribe(([clientX, clientY]: [number, number]) => {
				this._activeScene.drawCursor(this._renderContext, clientX, clientY)
			})
		this.onClientRectUpdate()
	}

	public setActiveScene(scene: Renderable) {
		this._activeScene = scene
	}

	public onClientRectUpdate() {
		const rect: DOMRect = this._canvas.getBoundingClientRect()
		this._canvas.setAttribute('width', String(rect.width))
		this._canvas.setAttribute('height', String(rect.height))
		this.render()
	}

	public setScene(scene: Renderable) {
		this._activeScene = scene
	}

	public render() {
		this._activeScene.clear(this._renderContext)
		this._activeScene.render(this._renderContext)
		this._activeScene.saveFrame(this._renderContext)
	}
}
