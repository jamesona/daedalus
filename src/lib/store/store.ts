import { Observable, Observer, Operator } from 'rxjs'
import {
	distinctUntilChanged,
	map,
	pluck,
	withLatestFrom
} from 'rxjs/operators'

import { ActionsSubject } from './actions_subject'
import {
	Action,
	FunctionIsNotAllowed,
	StoreFeature,
	ActionReducer
} from './models'
import { ReducerManager } from './reducer_manager'
import { StateSubject } from './state'

export class Store<T> extends Observable<T> implements Observer<Action> {
	actions$ = this.actionsObserver.asObservable()

	constructor(
		private stateSubject: StateSubject,
		private actionsObserver: ActionsSubject,
		private reducerManager: ReducerManager
	) {
		super()

		this.source = stateSubject.asObservable()

		this.actionsObserver
			.asObservable()
			.pipe(
				withLatestFrom(
					this.stateSubject.asObservable(),
					this.reducerManager.asObservable(),
					(action, state, reducer) => reducer(state, action)
				),
				distinctUntilChanged()
			)
			.subscribe(state => this.stateSubject.next(state))
	}

	get currentState(): T {
		return this.stateSubject.getValue()
	}

	selectSync<K>(selector: (state: T) => K) {
		return selector(this.currentState)
	}

	selectByPath(...pathSegments: string[]) {
		return this.pipe(pluck(...pathSegments), distinctUntilChanged())
	}

	selectByFunction<U>(selector: (state: T) => U) {
		return this.pipe(
			map(source => {
				return selector(source)
			})
		)
	}

	lift<R>(operator: Operator<T, R>): Store<R> {
		const store = new Store<R>(
			this.stateSubject,
			this.actionsObserver,
			this.reducerManager
		)
		store.operator = operator

		return store
	}

	dispatch<V extends Action = Action>(
		action: V &
			FunctionIsNotAllowed<
				V,
				'Functions are not allowed to be dispatched. Did you forget to call action creator function?'
			>
	) {
		this.actionsObserver.next(action)
	}

	next(action: Action) {
		this.actionsObserver.next(action)
	}

	error(err: any) {
		this.actionsObserver.error(err)
	}

	complete() {
		this.actionsObserver.complete()
	}

	addReducer<State, Actions extends Action = Action>(
		key: string,
		reducer: ActionReducer<State, Actions>
	) {
		this.reducerManager.addReducer(key, reducer)
	}

	addReducerMap<State, Actions extends Action>(
		feature: StoreFeature<State, Actions>
	) {
		this.reducerManager.addFeature(feature)
	}
}
