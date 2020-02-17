import Tiles from '../../../assets/img/tiles.png'
import { config } from '../../../config'
import { Renderable, ChangeScene } from '../../renderable'

export class Tile extends Renderable {
	static readonly textures = (() => {
		const img = new Image()
		img.src = Tiles
		return img
	})()
	static readonly type = (() => {
		enum TileTypes {
			Wall_1,
			Wall_2,
			Wall_3,
			Wall_4,

			Wall_5,
			Wall_6,
			Wall_7,
			Door_SW,

			Door_SE,
			Inner_Corners,
			W_Wall,
			E_Wall,

			Inner_Walls,
			SW_Corner,
			SE_Corner,
			Floor
		}
		return TileTypes
	})()

	public needsToRender: boolean = true

	constructor(
		public location: [number, number],
		public type: number,
		setActiveScene: ChangeScene
	) {
		super(setActiveScene)
	}

	public get textureCoords(): [number, number] {
		return [this.type % 4, Math.floor(this.type / 4)]
	}

	public render() {
		const { width, height } = this.ctx.canvas.getBoundingClientRect()
		const [tx, ty] = this.textureCoords
		const [sx, sy] = [tx * config.tileSize, ty * config.tileSize]
		const sw = config.tileSize
		const sh = config.tileSize

		const renderSize = Math.min(
			Math.floor(width / config.roomSize[0]),
			Math.floor(height / config.roomSize[1])
		)
		const [dx, dy] = this.location
		const dw = renderSize
		const dh = renderSize

		this.ctx.imageSmoothingEnabled = false
		this.ctx.drawImage(Tile.textures, sx, sy, sw, sh, dx, dy, dw, dh)
	}
}
