import { ExtendedMath } from './math'

export class Color {
	public static hexToRGB(color: string): [number, number, number] {
		const [r, g, b, rr, gg, bb] = color.split('').filter(c => c != '#')
		return [
			ExtendedMath.parseHex(r + (rr || r)),
			ExtendedMath.parseHex(g + (gg || g)),
			ExtendedMath.parseHex(b + (bb || b))
		]
	}

	public static rgbToHex(...rgb: [number, number, number]): string {
		return rgb.reduce((str, n) => str + n.toString(16), '#')
	}

	public static rgbToHSL(
		r: number,
		g: number,
		b: number
	): [number, number, number] {
		const [red, green, blue] = [r / 255, g / 255, b / 255]
		const max = Math.max(red, green, blue)
		const min = Math.min(red, green, blue)
		let hue = 0
		let sat = 0
		let lum = (max + min) / 2

		if (max !== min) {
			const delta = max - min
			sat = lum >= 0.5 ? delta / (2 - (max + min)) : delta / (max + min)
			switch (max) {
				case red:
					hue = ((green - blue) / delta + 0) * 60
					break
				case green:
					hue = ((blue - red) / delta + 2) * 60
					break
				case blue:
					hue = ((red - green) / delta + 4) * 60
					break
			}
		}

		return [hue, sat, lum]
	}

	public static hexToHSL(color: string): [number, number, number] {
		return Color.rgbToHSL(...Color.hexToRGB(color))
	}

	public static hslToRGB(
		hue: number,
		sat: number,
		lum: number
	): [number, number, number] {
		let red: number, green: number, blue: number

		if (sat == 0) {
			red = green = blue = lum
		} else {
			const hue2rgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1
				if (t > 1) t -= 1
				if (t < 1 / 6) return p + (q - p) * 6 * t
				if (t < 1 / 2) return q
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
				return p
			}

			const q = lum < 0.5 ? lum * (1 + sat) : lum + sat - lum * sat
			const p = 2 * lum - q
			red = hue2rgb(p, q, hue + 1 / 3)
			green = hue2rgb(p, q, hue)
			blue = hue2rgb(p, q, hue - 1 / 3)
		}

		return [
			Math.round(red * 255),
			Math.round(green * 255),
			Math.round(blue * 255)
		]
	}

	public static hslToHex(h: number, s: number, l: number): string {
		return Color.rgbToHex(...Color.hslToRGB(h, s, l))
	}
}
