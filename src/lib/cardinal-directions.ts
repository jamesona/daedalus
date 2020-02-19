export enum CardinalDirections {
	'north',
	'northeast',
	'east',
	'southeast',
	'south',
	'southwest',
	'west',
	'northwest'
}

export enum ComplimentaryCardinalDirections {
	'south',
	'southwest',
	'west',
	'northwest',
	'north',
	'northeast',
	'east',
	'southeast'
}

export function getCardinalCompliment(
	direction: CardinalDirection
): CardinalDirection {
	return CardinalDirections[
		(CardinalDirections[direction] + 4) % 8
	] as CardinalDirection
}

export type CardinalDirection = keyof typeof CardinalDirections

export type CardinalMap<T> = {
	[key in CardinalDirection]: T
}
