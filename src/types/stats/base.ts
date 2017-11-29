export type BaseStat = 'CON' | 'STR' | 'INT' | 'DEX' | 'EXP'

export interface HasBaseStats {
	CON: number
	STR: number
	INT: number
	DEX: number
	EXP: number
}

export const BaseStats = {
	CON: 'Constitution',
	STR: 'Strength',
	INT: 'Intelligence',
	DEX: 'Dexterity',
	EXP: 'Experience'
}
