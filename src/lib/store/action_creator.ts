import {
	Creator,
	ActionCreator,
	TypedAction,
	FunctionWithParametersType,
	NotAllowedCheck,
	Props
} from './models'

export function createAction<T extends string>(
	type: T
): ActionCreator<T, () => TypedAction<T>>
export function createAction<T extends string, P extends object>(
	type: T,
	config: Props<P> & NotAllowedCheck<P>
): ActionCreator<T, (props: P & NotAllowedCheck<P>) => P & TypedAction<T>>
export function createAction<
	T extends string,
	P extends any[],
	R extends object
>(
	type: T,
	creator: Creator<P, R> & NotAllowedCheck<R>
): FunctionWithParametersType<P, R & TypedAction<T>> & TypedAction<T>

export function createAction<T extends string, C extends Creator>(
	type: T,
	config?: { _as: 'props' } | C
): ActionCreator<T> {
	if (typeof config === 'function') {
		return defineType(type, (...args: any[]) => ({
			...config(...args),
			type
		}))
	}
	const as = config ? config._as : 'empty'
	switch (as) {
		case 'empty':
			return defineType(type, () => ({ type }))
		case 'props':
			return defineType(type, (props: object) => ({
				...props,
				type
			}))
		default:
			throw new Error('Unexpected config.')
	}
}

export function props<P extends object>(): Props<P> {
	return { _as: 'props', _p: undefined! }
}

function defineType<T extends string>(
	type: T,
	creator: Creator
): ActionCreator<T> {
	return Object.defineProperty(creator, 'type', {
		value: type,
		writable: false
	})
}
