export class Nullish {
	public isDefined<T>(value: T): value is Exclude<T, undefined> {
		return value !== undefined
	}

	public isNotNull<T>(value: T): value is Exclude<T, null> {
		return value !== null
	}

	public isNotNullish<T>(value: T): value is Exclude<T, null | undefined> {
		return this.isDefined(value) && this.isNotNull(value)
	}
}
