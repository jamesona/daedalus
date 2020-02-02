import { BehaviorSubject } from 'rxjs'
import {
	StateObservable,
	ActionsSubject,
	ReducerManagerDispatcher,
	ActionReducerMap,
	ActionReducerFactory,
	ReducerManager,
	Store,
	createReducerFactory
} from '../../lib/store'
import { combineReducers } from '../../lib/store/utils'
import { userInputReducer } from '../input-handler'

const initialState: any = {}
type GameAction = any
type GameState = any

const state$: StateObservable = new BehaviorSubject<GameState>(undefined)
const actionsObserver: ActionsSubject = new ActionsSubject()
const dispatcher: ReducerManagerDispatcher = new ActionsSubject()
const reducers: ActionReducerMap<GameState, GameAction> = {
	input: userInputReducer
}
const reducerFactory: ActionReducerFactory<any, any> = createReducerFactory(
	combineReducers(reducers, initialState),
	[]
)
const reducerManager: ReducerManager = new ReducerManager(
	dispatcher,
	initialState,
	reducers,
	reducerFactory
)

export const store: Store<GameState> = new Store<GameState>(
	state$,
	actionsObserver,
	reducerManager
)
