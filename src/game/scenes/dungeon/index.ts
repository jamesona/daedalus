import { Renderable } from '../../renderable'
import { World } from './world'

export class Dungeon extends Renderable {
	private world: World = new World((scene: Renderable) =>
		this.setActiveScene(scene)
	)

	public render() {
		this.world.render()
	}
}
