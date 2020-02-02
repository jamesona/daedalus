import { BehaviorSubject } from 'rxjs'
import {
	StateSubject,
	ActionsSubject,
	ReducerManager,
	Store,
	ActionReducerMap,
	ActionReducer
} from '../lib/store'

type GameAction = any
type GameState = any

const state$: StateSubject = new BehaviorSubject<GameState>(undefined)
const actionsObserver: ActionsSubject = new ActionsSubject()
const reducerManager: ReducerManager = new ReducerManager(
	(
		reducers: ActionReducerMap<GameState, GameAction>,
		initialState?: GameState
	): ActionReducer<GameState, GameAction> => {
		return (state: GameState, action: GameAction) =>
			Object.values(reducers).reduce(
				(state, reducer) => reducer(state, action),
				{ ...initialState, ...state }
			)
	},
	{}
)

export const store: Store<GameState> = new Store<GameState>(
	state$,
	actionsObserver,
	reducerManager
)
