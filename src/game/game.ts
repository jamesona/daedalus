export class Game {
	private canvas: HTMLCanvasElement = document.createElement('canvas')
	private renderContext = this.canvas.getContext('2d') as CanvasRenderingContext2D
	private get width() {
		return Number(this.canvas.getAttribute('width'))
	}
	private set width(val: number) {
		this.canvas.setAttribute('width', String(val))
	}
	private get height() {
		return Number(this.canvas.getAttribute('height'))
	}
	private set height(val: number) {
		this.canvas.setAttribute('height', String(val))
	}

	constructor(hostElement: HTMLElement) {

		hostElement.innerHTML = ''
		hostElement.appendChild(this.canvas)
		window.addEventListener('resize', () => this.onClientRectUpdate())
		this.onClientRectUpdate()
	}

	public onClientRectUpdate() {
		const rect: DOMRect = this.canvas.getBoundingClientRect()
		this.width = rect.width
		this.height = rect.height
		this.canvas.setAttribute('width', String(rect.width))
		this.canvas.setAttribute('height', String(rect.height))
		this.render()
		console.log('Updating client dimensions')
	}

	public render() {
		this.renderContext.fillStyle = 'black'
		this.renderContext.fillRect(0, 0, this.width, this.height)
		this.renderContext.fillStyle = 'white'
		this.renderContext.font = `20px "Press Start 2P"`
		this.renderContext.fillText('READY PLAYER 1', 10, 100)
	}
}
