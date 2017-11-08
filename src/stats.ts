export type StatName = ('con'|'str'|'int'|'dex'|'wil'|'att'|'acc'|'eva'|'def'|'wgt'|'hp'|'mp'|'sp')

export type BaseStat = number

export type ComputedStat = () => number

export interface BaseStats {
	_con: BaseStat
	_str: BaseStat
	_int: BaseStat
	_dex: BaseStat
	hp: BaseStat
	mp: BaseStat
	sp: BaseStat
}

export interface ComputedStats {
	con: ComputedStat
	str: ComputedStat
	int: ComputedStat
	dex: ComputedStat
	wil: ComputedStat
	att: ComputedStat
	acc: ComputedStat
	eva: ComputedStat
	def: ComputedStat
	wgt: ComputedStat
	maxHp: ComputedStat
	maxMp: ComputedStat
	maxSp: ComputedStat
}

export interface Stats extends BaseStats, ComputedStats {}

export class StatMod {
	mod: ('+'|'-'|'*'|'/')
	val: number
}

export interface Modifiers {
	con?: StatMod
	str?: StatMod
	int?: StatMod
	dex?: StatMod
	wil?: StatMod
	att?: StatMod
	acc?: StatMod
	eva?: StatMod
	def?: StatMod
	wgt?: StatMod
}
