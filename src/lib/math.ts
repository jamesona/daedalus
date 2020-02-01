export class ExtendedMath {
	public static parseHex(n: string): number {
		const decimal = parseInt(n || '0', 16)
		return decimal
	}

	public static toPositiveDeg(deg: number): number {
		return deg < 0 ? deg + 360 : deg
	}

	public static sum(...numbers: number[]): number {
		return numbers.reduce((sum, n) => sum + n, 0)
	}

	public static average(...numbers: number[]): number {
		return ExtendedMath.sum(...numbers) / numbers.length
	}
}
