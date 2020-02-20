import Character from '../../../assets/img/character.png'
import { Actor } from '../../actor'
import { config } from '../../../config'

export class Player extends Actor {
	static readonly texture = (() => {
		const img = new Image()
		img.src = Character
		return img
	})()

	constructor() {
		super([5, 7])
	}

	public render() {
		const {
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			drawX,
			drawY,
			drawWidth,
			drawHeight
		} = this.textureCoords

		this.ctx.imageSmoothingEnabled = false
		this.ctx.drawImage(
			Player.texture,
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			drawX,
			drawY,
			drawWidth,
			drawHeight
		)
	}

	public get renderSize(): number {
		// return Math.min(
		// 	Math.floor(width / config.roomSize[0]),
		// 	Math.floor(height / config.roomSize[1])
		// )
		return 100
	}

	public get tileRenderSize(): number {
		const { width, height } = this.ctx.canvas.getBoundingClientRect()

		return Math.min(
			Math.floor(width / config.roomSize[0]),
			Math.floor(height / config.roomSize[1])
		)
	}

	public get textureCoords() {
		const { width, height } = this.ctx.canvas.getBoundingClientRect()
		const [sourceX, sourceY] = [0, 0]
		const sourceWidth = 47
		const sourceHeight = 70

		const drawWidth = this.renderSize * 0.8
		const drawHeight = this.renderSize

		const [centerX, centerY] = [width / 2, height / 2]
		const [startX, startY] = [
			centerX -
				(this.tileRenderSize * (config.roomSize[0] - 2) + sourceWidth) / 2,
			centerY -
				(this.tileRenderSize * (config.roomSize[1] - 2) + sourceHeight) / 2
		]
		const [x, y] = this.locationInRoom
		const [offsetX, offsetY] = [
			this.tileRenderSize * x,
			this.tileRenderSize * y
		]
		const [drawX, drawY] = [startX + offsetX, startY + offsetY]

		return {
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			drawX,
			drawY,
			drawWidth,
			drawHeight
		}
	}
}
