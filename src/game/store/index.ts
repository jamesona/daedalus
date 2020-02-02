import { Subject } from 'rxjs'
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

const initialState: any = {}
type GameAction = any
type GameState = any

const state$: StateObservable = new Subject<any>().asObservable()
const actionsObserver: ActionsSubject = new ActionsSubject()
const dispatcher: ReducerManagerDispatcher = new ActionsSubject()
const reducers: ActionReducerMap<GameState, GameAction> = {}
const reducerFactory: ActionReducerFactory<
	any,
	any
> = createReducerFactory(combineReducers(reducers, initialState), [
	window['__REDUX_DEVTOOLS_EXTENSION__' as any]
		? (window['__REDUX_DEVTOOLS_EXTENSION__' as any] as any)()
		: <T>(state: T) => state
])
const reducerManager: ReducerManager = new ReducerManager(
	dispatcher,
	initialState,
	reducers,
	reducerFactory
)

export const store: Store<any> = new Store<any>(
	state$,
	actionsObserver,
	reducerManager
)
