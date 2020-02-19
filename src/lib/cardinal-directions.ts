export enum CardinalDirections {
	'north',
	'east',
	'south',
	'west'
}

export enum IntercardinalDirections {
	'northeast',
	'southeast',
	'southwest',
	'northwest'
}

export function getCardinalCompliment(
	direction: CardinalDirection
): CardinalDirection {
	return CardinalDirections[
		(CardinalDirections[direction] + 2) % 4
	] as CardinalDirection
}

export type CardinalDirection = keyof typeof CardinalDirections

export type CardinalMap<T> = {
	[key in CardinalDirection]: T
}
