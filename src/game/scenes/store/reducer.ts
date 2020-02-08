import { ActionReducerMap, makeDefaultReducerFactory } from '../../../lib/store'
import {
	MainMenuState,
	mainMenuReducer,
	createInitialState as createMainMenuState
} from '../main-menu/store/reducer'

export interface ScenesState {
	'main-menu': MainMenuState
}

const reducers: ActionReducerMap<ScenesState, any> = {
	'main-menu': mainMenuReducer
}

export const createInitialState = (): ScenesState => ({
	'main-menu': createMainMenuState()
})

export const reducer = makeDefaultReducerFactory<any, any>()(
	reducers,
	createInitialState()
)
