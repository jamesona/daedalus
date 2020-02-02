import {
	Action,
	ActionReducerMap,
	ActionReducerFactory,
	StoreFeature,
	InitialState,
	MetaReducer
} from './models'

import { ActionsSubject } from './actions_subject'
import { ReducerManager, ReducerObservable } from './reducer_manager'
import { ScannedActionsSubject } from './scanned_actions_subject'
import { Store } from './store'

export class StoreRootModule {
	constructor(
		public actions$: ActionsSubject,
		public reducer$: ReducerObservable,
		public scannedActions$: ScannedActionsSubject,
		public store: Store<any>,
		public guard: any
	) {}
}

export class StoreFeatureModule {
	constructor(
		private features: StoreFeature<any, any>[],
		private featureReducers: ActionReducerMap<any>[],
		private reducerManager: ReducerManager
	) {
		const feats = features.map((feature, index) => {
			const featureReducerCollection = this.featureReducers.shift()
			const reducers = featureReducerCollection![index]

			return {
				...feature,
				reducers,
				initialState: _initialStateFactory(feature.initialState)
			}
		})

		reducerManager.addFeatures(feats)
	}

	ngOnDestroy() {
		this.reducerManager.removeFeatures(this.features)
	}
}

export interface StoreConfig<T, V extends Action = Action> {
	initialState?: InitialState<T>
	reducerFactory?: ActionReducerFactory<T, V>
	metaReducers?: MetaReducer<T, V>[]
}

export function _createStoreReducers(reducers: ActionReducerMap<any, any>) {
	return reducers
}

export function _createFeatureStore(featureStores: StoreFeature<any, any>[]) {
	return featureStores.map(feat => {
		return feat
	})
}

export function _createFeatureReducers(
	reducerCollection: ActionReducerMap<any, any>[]
) {
	const reducers = reducerCollection.map(reducer => {
		return reducer
	})

	return reducers
}

export function _initialStateFactory(initialState: any): any {
	if (typeof initialState === 'function') {
		return initialState()
	}

	return initialState
}

export function _concatMetaReducers(
	metaReducers: MetaReducer[],
	userProvidedMetaReducers: MetaReducer[]
): MetaReducer[] {
	return metaReducers.concat(userProvidedMetaReducers)
}
