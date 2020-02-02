import { Renderable } from '../renderable'
import { World } from '../world'

export class Dungeon extends Renderable {
	private world: World = new World(this.store, (scene: Renderable) =>
		this.setActiveScene(scene)
	)

	public render(ctx: CanvasRenderingContext2D) {
		this.world.render(ctx)

		// const { width, height } = this.getClientBoundingRect(ctx)
		// this.fillText({
		// 	ctx,
		// 	text: 'Hello Dungeon',
		// 	size: config.fontScale,
		// 	x: width / 2,
		// 	y: height / 2,
		// 	color: '#fff',
		// 	align: 'center'
		// })
	}
}
