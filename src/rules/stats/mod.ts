import { BaseStat, BaseStats, HasBaseStats } from './base'
import { DerivedStat, DerivedStats, HasDerivedStats } from './derived'
import { VariableStat, VariableStats, HasVariableStats } from './variable'

export type Stat = BaseStat | DerivedStat | VariableStat
export interface HasStats extends HasBaseStats, HasDerivedStats, HasVariableStats {}
export const Stats = [].concat(
	Object.keys(BaseStats),
	Object.keys(DerivedStats),
	Object.keys(VariableStats)
)


type Operator = '+' | '-' | '*' | '/'
type OperatorFunction = (a: number, b: number) => number
const Operators: {[operator in Operator]: OperatorFunction} = {
	'+': (a: number, b: number) => a + b,
	'-': (a: number, b: number) => a - b,
	'*': (a: number, b: number) => a * b,
	'/': (a: number, b: number) => a / b
}

export type Modifier = [Operator, number]

export type StatModifier = {[stat in Stat]: Modifier}

export type StatModifiers = StatModifier[]

export function statFromMod(mod: StatModifier) {
	return Object.keys(mod)[0]
}

export function applyMod(value: number, mod: Modifier){
	const operator = Operators[mod[0]]
	const operand = mod[1]
	return operator(value, operand)
}

export function applyMods(subject: HasStats, mods: StatModifiers) {
	mods.forEach(mod => {
		const stat = statFromMod(mod)
		const before = subject[stat]
		subject[stat] = applyMod(before, mod[stat])
	})
}
