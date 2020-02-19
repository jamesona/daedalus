export enum CardinalDirections {
	north,
	northeast,
	east,
	southeast,
	south,
	southwest,
	west,
	northwest
}

export type CardinalDirection = keyof typeof CardinalDirections

export type CardinalMap<T> = {
	[key in CardinalDirection]: T
}
