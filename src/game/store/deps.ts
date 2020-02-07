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

export interface GameState {
	input: InputState
}

const initialState: GameState = {
	input: makeInputState()
}
const reducers: ActionReducerMap<GameState, any> = {
	input: userInputReducer
}

export const stateSubject: StateSubject = new BehaviorSubject<GameState>(
	initialState
)
export const actionsObserver: ActionsSubject = new ActionsSubject()
export const reducerManager: ReducerManager = new ReducerManager(
	reducers,
	initialState
)
