/// <reference path='../images.d.ts'/>
import Pointer from '../assets/img/pointer.png'

import { GameState } from './game-state'
import { Renderable } from './renderable'
import { MainMenu } from './scenes/main-menu'

export class Game {
	private _state: GameState = new GameState()
	private canvas: HTMLCanvasElement = document.createElement('canvas')
	private renderContext = this.canvas.getContext(
		'2d'
	) as CanvasRenderingContext2D
	private activeScene: Renderable = new MainMenu(() => this._state)

	constructor(hostElement: HTMLElement) {
		hostElement.innerHTML = ''
		hostElement.appendChild(this.canvas)

		window.addEventListener('resize', () => this.onClientRectUpdate())

		document.addEventListener('mousemove', (e: MouseEvent) => {
			const { clientX, clientY } = e
			this.state = {
				...this.state,
				cursorPosition: [clientX, clientY]
			}
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
		this._state = new GameState(this._state, newState)
		this.render()
	}

	public get state() {
		return this._state
	}

	public get width() {
		return Number(this.canvas.getAttribute('width'))
	}

	public set width(val: number) {
		this.canvas.setAttribute('width', String(val))
	}

	public get height() {
		return Number(this.canvas.getAttribute('height'))
	}

	public set height(val: number) {
		this.canvas.setAttribute('height', String(val))
	}

	public onClientRectUpdate() {
		const rect: DOMRect = this.canvas.getBoundingClientRect()
		this.width = rect.width
		this.height = rect.height
		this.canvas.setAttribute('width', String(rect.width))
		this.canvas.setAttribute('height', String(rect.height))
		this.render()
	}

	public setScene(scene: Renderable) {
		this.activeScene = scene
	}

	public render() {
		this.renderContext.fillStyle = 'black'
		this.renderContext.fillRect(0, 0, this.width, this.height)
		this.activeScene.render(this.renderContext)
		this.drawCursor(this.renderContext)
	}

	private drawCursor(ctx: CanvasRenderingContext2D) {
		if (this.state.cursorPosition) {
			const image = new Image()
			image.src = Pointer
			const [mx, my] = this.state.cursorPosition
			ctx.drawImage(image, mx - 4, my - 2)
		}
	}
}
