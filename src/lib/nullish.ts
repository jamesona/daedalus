export class Nullish {
	public static isDefined<T>(value: T): value is Exclude<T, undefined> {
		return value !== undefined
	}

	public static isNotNull<T>(value: T): value is Exclude<T, null> {
		return value !== null
	}

	public static isNotNullish<T>(value: T): value is Exclude<T, null | undefined> {
		return Nullish.isDefined(value) && Nullish.isNotNull(value)
	}
}
