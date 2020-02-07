import { BehaviorSubject } from 'rxjs'
import {
	StateSubject,
	ActionsSubject,
	ReducerManager,
	Store
} from '../lib/store'

type GameState = any

const state$: StateSubject = new BehaviorSubject<GameState>(undefined)
const actionsObserver: ActionsSubject = new ActionsSubject()
const reducerManager: ReducerManager = new ReducerManager({}, {})

export const store: Store<GameState> = new Store<GameState>(
	state$,
	actionsObserver,
	reducerManager
)
