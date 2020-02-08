class TypesafeArray<T> extends Array<T> {
	constructor(private arr: Array<T>) {
		super()
	}

	public map<U>(projector: (value: T, index: number, array: Array<T>) => U) {
		return this.arr.map(projector)
	}

	public forEach(callback: (value: T, index: number, array: Array<T>) => void) {
		return this.arr.forEach(callback)
	}

	public find(
		predicate: (value: T, index: number, array: Array<T>) => boolean
	) {
		return this.arr.find(predicate)
	}
}

export function keys<T extends object>(obj: T): Array<keyof T> {
	return new TypesafeArray(Object.keys(obj) as Array<keyof T>)
}
