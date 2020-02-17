import { ActionReducerMap, makeDefaultReducerFactory } from '../../../lib/store'
import {
	MainMenuState,
	mainMenuReducer,
	createInitialState as createMainMenuState
} from '../main-menu/store/reducer'
import {
	DungeonState,
	dungeonReducer,
	createInitialState as createDungeonState
} from '../dungeon/store/reducer'

export interface ScenesState {
	'main-menu': MainMenuState
	dungeon: DungeonState
}

const reducers: ActionReducerMap<ScenesState, any> = {
	'main-menu': mainMenuReducer,
	dungeon: dungeonReducer
}

export const createInitialState = (): ScenesState => ({
	'main-menu': createMainMenuState(),
	dungeon: createDungeonState()
})

export const reducer = makeDefaultReducerFactory<any, any>()(
	reducers,
	createInitialState()
)
