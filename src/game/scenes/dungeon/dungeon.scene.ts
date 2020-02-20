import { Renderable } from '../../renderable'
import { World } from './world'
import { Scene } from '../scene'
import { Player } from '../../actors/player'
import { selectRooms } from './store/selectors'
import { Room } from './room'
import { setActiveRoom } from './store/actions'
import { ofType } from '../../../lib/store'
import { map } from 'rxjs/operators'

export class Dungeon extends Scene {
	private world: World = new World((scene: Renderable) =>
		this.setActiveScene(scene)
	)

	private player: Player = new Player()
	private previousActiveRoom: Room | undefined

	public onSetActiveRoom$ = this.store.actions$.pipe(
		ofType(setActiveRoom),
		map(({ roomID }) => this.store.selectSync(selectRooms).entities[roomID])
	)

	public onInit() {
		this.onSetActiveRoom$.subscribe(activeRoom => {
			if (activeRoom) {
				if (this.previousActiveRoom) {
					this.previousActiveRoom.removeActor(this.player)
				}

				activeRoom.addActor(this.player)
				this.previousActiveRoom = activeRoom
			}
		})
	}

	public render() {
		this.world.render()
	}
}
