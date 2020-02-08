import { BehaviorSubject } from 'rxjs'

import {
	StateSubject,
	ActionsSubject,
	ReducerManager,
	ActionReducerMap
} from '../../lib/store'

import {
	userInputReducer,
	InputState,
	createInitialState as makeInputState
} from '../input-handler/reducer'
import { ScenesState } from '../scenes/store/reducer'
import {
	createInitialState as makeScenesState,
	reducer as scenesReducer
} from '../scenes/store/reducer'

export interface GameState {
	input: InputState
	scenes: ScenesState
}

const initialState: GameState = {
	input: makeInputState(),
	scenes: makeScenesState()
}
const reducers: ActionReducerMap<GameState, any> = {
	input: userInputReducer,
	scenes: scenesReducer
}

export const stateSubject: StateSubject = new BehaviorSubject<GameState>(
	initialState
)
export const actionsObserver: ActionsSubject = new ActionsSubject()
export const reducerManager: ReducerManager = new ReducerManager(
	reducers,
	initialState
)
