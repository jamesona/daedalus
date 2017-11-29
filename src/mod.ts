import { Operator, OperatorFunction, Modifier, StatModifier, HasStats } from '@daedalus/types'

const Operators: {[operator in Operator]: OperatorFunction} = {
	'+': (a: number, b: number) => a + b,
	'-': (a: number, b: number) => a - b,
	'*': (a: number, b: number) => a * b,
	'/': (a: number, b: number) => a / b
}

export function statFromMod(mod: StatModifier) {
	return Object.keys(mod)[0]
}

export function applyMod(value: number, mod: Modifier){
	const operator = Operators[mod[0]]
	const operand = mod[1]
	return operator(value, operand)
}

export function applyMods(subject: HasStats, mods: StatModifier[]) {
	mods.forEach(mod => {
		const stat = statFromMod(mod)
		const before = subject[stat]
		subject[stat] = applyMod(before, mod[stat])
	})
}
