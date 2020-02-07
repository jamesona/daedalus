import { Store } from '../../lib/store'
import {
	stateSubject,
	actionsObserver,
	reducerManager,
	GameState
} from './deps'

export { GameState } from './deps'
export const store: Store<GameState> = new Store<GameState>(
	stateSubject,
	actionsObserver,
	reducerManager
)
