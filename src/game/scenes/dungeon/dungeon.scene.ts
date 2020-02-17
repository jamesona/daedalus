import { Renderable } from '../../renderable'
import { World } from './world'
import { Scene } from '../scene'

export class Dungeon extends Scene {
	private world: World = new World((scene: Renderable) =>
		this.setActiveScene(scene)
	)

	public render() {
		this.world.render()
	}
}
