/// <reference path='../images.d.ts'/>
import Pointer from '../assets/img/pointer.png'

import { Renderable } from './renderable'
import { MainMenu } from './scenes/main-menu'

interface GameState {
	cursorPosition: [number, number]
}

export class Game {
	private _state: GameState = {
		cursorPosition: [0, 0]
	}
	private element: HTMLCanvasElement = document.createElement('canvas')
	private renderContext = this.element.getContext(
		'2d'
	) as CanvasRenderingContext2D
	private activeScene: Renderable = new MainMenu(() => this._state)

	constructor(hostElement: HTMLElement) {
		hostElement.innerHTML = ''
		hostElement.appendChild(this.element)

		window.addEventListener('resize', () => this.onClientRectUpdate())

		document.addEventListener('mousemove', (e: MouseEvent) => {
			const { clientX, clientY } = e
			this.state = {
				...this.state,
				cursorPosition: [clientX, clientY]
			}
		})

		this.onClientRectUpdate()
	}

	public set state(newState) {
		this._state = newState
		this.render()
	}

	public get state() {
		return this._state
	}

	public get width() {
		return Number(this.element.getAttribute('width'))
	}

	public set width(val: number) {
		this.element.setAttribute('width', String(val))
	}

	public get height() {
		return Number(this.element.getAttribute('height'))
	}

	public set height(val: number) {
		this.element.setAttribute('height', String(val))
	}

	public onClientRectUpdate() {
		const rect: DOMRect = this.element.getBoundingClientRect()
		this.width = rect.width
		this.height = rect.height
		this.element.setAttribute('width', String(rect.width))
		this.element.setAttribute('height', String(rect.height))
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
		const image = new Image()
		image.src = Pointer
		const [mx, my] = this.state.cursorPosition
		ctx.drawImage(image, mx - 4, my - 2)
	}
}
