import { BehaviorSubject, Observable } from 'rxjs'

import { ActionsSubject } from './actions_subject'
import { ActionReducer, StoreFeature, ActionReducerMap, Action } from './models'

export abstract class ReducerObservable extends Observable<
	ActionReducer<any, any>
> {}
export abstract class ReducerManagerDispatcher extends ActionsSubject {}

export function makeDefaultReducerFactory<T, U extends Action>() {
	return (
		reducerMap: ActionReducerMap<T, Action>,
		initialState: T = {} as any
	): ActionReducer<T, U> => {
		const keys: Array<keyof T> = Object.keys(reducerMap) as Array<keyof T>
		const combine: ActionReducer<T, U> = ((state: T, action: U) => {
			const combinedState: T = {
				...initialState,
				...state
			}
			return keys.reduce((state, key) => {
				const newState: T = {
					...state,
					[key]: reducerMap[key](state[key], action)
				}

				return newState
			}, combinedState)
		}) as ActionReducer<T, U>
		return combine
	}
}

export class ReducerManager extends BehaviorSubject<ActionReducer<any, any>> {
	constructor(
		private reducers: ActionReducerMap<any, any>,
		private initialState: object,
		private reducerFactory = makeDefaultReducerFactory<any, any>()
	) {
		super(reducerFactory(reducers, initialState))
	}

	addFeature(feature: StoreFeature<any, any>) {
		this.addFeatures([feature])
	}

	addFeatures(features: StoreFeature<any, any>[]) {
		const reducers = features.reduce(
			(reducerMap, { reducers, initialState, key }) => {
				const reducer = this.reducerFactory(reducers, initialState)

				reducerMap[key] = reducer
				return reducerMap
			},
			{} as { [key: string]: ActionReducer<any, any> }
		)

		this.addReducers(reducers)
	}

	addReducer(key: string, reducer: ActionReducer<any, any>) {
		this.addReducers({ [key]: reducer })
	}

	addReducers(reducers: { [key: string]: ActionReducer<any, any> }) {
		this.updateReducers(reducers)
	}

	private updateReducers(newReducers: ActionReducerMap<any, any>) {
		this.reducers = { ...this.reducers, ...newReducers }
		this.next(this.reducerFactory(this.reducers, this.initialState))
	}
}
