import { Renderable } from '../renderable'

export type ChangeScene = (scene: Renderable) => void

export abstract class Scene extends Renderable {
	constructor(protected setActiveScene: ChangeScene) {
		super()
	}

	public onInit?(): void
	public onChanges?(): void
	public abstract render(): void
}
