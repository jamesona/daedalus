export interface Action {
	type: string
}

export declare interface TypedAction<T extends string> extends Action {
	readonly type: T
}

export type ActionType<A> = A extends ActionCreator<infer T, infer C>
	? ReturnType<C> & { type: T }
	: never

export type TypeId<T> = () => T

export type InitialState<T> = Partial<T> | TypeId<Partial<T>> | void

export interface ActionReducer<T, V extends Action = Action> {
	(state: T | undefined, action: V): T
}

export type ActionReducerMap<T, V extends Action = Action> = {
	[p in keyof T]: ActionReducer<T[p], V>
}

export interface ActionReducerFactory<T, V extends Action = Action> {
	(
		reducerMap: ActionReducerMap<T, V>,
		initialState?: InitialState<T>
	): ActionReducer<T, V>
}

export interface StoreFeature<T, V extends Action = Action> {
	key: string
	reducers: ActionReducerMap<T, V>
	reducerFactory: ActionReducerFactory<T, V>
	initialState?: InitialState<T>
}

export type Selector<T, V> = (state: T) => V

export type SelectorWithProps<State, Props, Result> = (
	state: State,
	props: Props
) => Result

export const arraysAreNotAllowedMsg =
	'arrays are not allowed in action creators'
type ArraysAreNotAllowed = typeof arraysAreNotAllowedMsg

export const typePropertyIsNotAllowedMsg =
	'type property is not allowed in action creators'
type TypePropertyIsNotAllowed = typeof typePropertyIsNotAllowedMsg

export type FunctionIsNotAllowed<
	T,
	ErrorMessage extends string
> = T extends Function ? ErrorMessage : T

export type Creator<
	P extends any[] = any[],
	R extends object = object
> = FunctionWithParametersType<P, R>

export type NotAllowedCheck<T extends object> = T extends any[]
	? ArraysAreNotAllowed
	: T extends { type: any }
	? TypePropertyIsNotAllowed
	: unknown

export type ActionCreator<
	T extends string = string,
	C extends Creator = Creator
> = C & TypedAction<T>

export interface Props<T> {
	_as: 'props'
	_p: T
}

export type FunctionWithParametersType<P extends unknown[], R = void> = (
	...args: P
) => R
