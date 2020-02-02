import { BehaviorSubject, Observable } from 'rxjs'

import { ActionsSubject } from './actions_subject'
import {
	Action,
	ActionReducer,
	ActionReducerFactory,
	StoreFeature,
	ActionReducerMap
} from './models'

export abstract class ReducerObservable extends Observable<
	ActionReducer<any, any>
> {}
export abstract class ReducerManagerDispatcher extends ActionsSubject {}
export const UPDATE = 'update-reducers' as 'update-reducers'

export class ReducerManager extends BehaviorSubject<ActionReducer<any, any>> {
	private reducers: ActionReducerMap<any, any> = {}

	constructor(
		private dispatcher: ReducerManagerDispatcher,
		private reducerFactory: ActionReducerFactory<any, any>,
		private initialState: object
	) {
		super(reducerFactory({}, {}))
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
		this.dispatcher.next(<Action>{
			type: UPDATE,
			features: Object.keys(newReducers)
		})
	}
}
