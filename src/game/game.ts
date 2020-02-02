import Pointer from '../assets/img/pointer.png'

import { GameState } from './game-state'
import { Renderable } from './renderable'
import { MainMenu } from './scenes/main-menu'
import { store } from './store'
import { InputHandler } from '../lib/input-handler'

let lastCursorPosition: [number, number]

export class Game {
	private _frameCache = new Image()
	private _store = store
	private _inputHandler = new InputHandler(this._store)
	private _state: GameState = new GameState()
	private _canvas: HTMLCanvasElement = document.createElement('canvas')
	private _renderContext = this._canvas.getContext(
		'2d'
	) as CanvasRenderingContext2D
	private activeScene: Renderable = new MainMenu(
		() => this._state,
		newState => {
			this.state = { ...newState }
		},
		(scene: Renderable) => {
			this.activeScene = scene
		}
	)

	constructor(hostElement: HTMLElement) {
		hostElement.innerHTML = ''
		hostElement.appendChild(this._canvas)

		window.addEventListener('resize', () => this.onClientRectUpdate())

		this._inputHandler.cursorPosition$().subscribe(([clientX, clientY]) => {
			lastCursorPosition = [clientX, clientY]
			this._renderContext.restore()
			this.drawCursor(clientX, clientY)
		})

		document.addEventListener('keydown', (e: KeyboardEvent) => {
			const { key } = e

			e.preventDefault()
			e.stopImmediatePropagation()

			this.state = {
				keys: [...(this.state.keys || []), key]
			}
		})

		document.addEventListener('keyup', (e: KeyboardEvent) => {
			e.preventDefault()
			e.stopImmediatePropagation()

			this.state = {
				keys: (this.state?.keys || []).filter(key => key !== e.key)
			}
		})

		document.addEventListener('mousedown', () => {
			this.state = {
				...this.state,
				mouseDown: true
			}
		})

		document.addEventListener('mouseup', () => {
			this.state = {
				...this.state,
				mouseDown: false
			}
		})

		this.onClientRectUpdate()
	}

	public set state(newState: Partial<GameState>) {
		this._state = new GameState(this._state, {
			...newState,
			cursorPosition: lastCursorPosition
		})
		this.render()
	}

	public get state() {
		return this._state
	}

	public get width() {
		return Number(this._canvas.getAttribute('width'))
	}

	public set width(val: number) {
		this._canvas.setAttribute('width', String(val))
	}

	public get height() {
		return Number(this._canvas.getAttribute('height'))
	}

	public set height(val: number) {
		this._canvas.setAttribute('height', String(val))
	}

	public onClientRectUpdate() {
		const rect: DOMRect = this._canvas.getBoundingClientRect()
		this.width = rect.width
		this.height = rect.height
		this._canvas.setAttribute('width', String(rect.width))
		this._canvas.setAttribute('height', String(rect.height))
		this.render()
	}

	public setScene(scene: Renderable) {
		this.activeScene = scene
	}

	public render() {
		this._renderContext.fillStyle = 'black'
		this._renderContext.fillRect(0, 0, this.width, this.height)
		this.activeScene.render(this._renderContext)
		this.saveFrame()
	}

	private saveFrame(): void {
		this._canvas.toBlob(blob => {
			if (this._frameCache.src) {
				URL.revokeObjectURL(this._frameCache.src)
			}
			this._frameCache.src = URL.createObjectURL(blob)
		})
	}

	private loadFrame(): void {
		if (this._frameCache.src) {
			this._renderContext.drawImage(this._frameCache, 0, 0)
		}
	}

	private drawCursor(x: number, y: number) {
		this.loadFrame()
		const image = new Image()
		image.src = Pointer
		this._renderContext.drawImage(image, x - 4, y - 2)
	}
}
