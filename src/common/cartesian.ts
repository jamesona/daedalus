export type OrderedPair = [number, number]

export interface Row<T> {
	[column: number]: T
}

export interface CartesianGrid<T> {
	[row: number]: Row<T>
}
