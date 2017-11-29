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


export type Operator = '+' | '-' | '*' | '/'

export type OperatorFunction = (a: number, b: number) => number

export type Modifier = [Operator, number]

export type StatModifier = {[stat in Stat]: Modifier}

export type StatModifiers = StatModifier[]
