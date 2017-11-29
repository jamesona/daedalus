export type DerivedStat = 'WIL' | 'ATT' | 'ACC' | 'EVA' | 'DEF' | 'WGT' | 'MHP' | 'MMP' | 'MSP' | 'LVL'

export interface HasDerivedStats {
	WIL: number
	ATT: number
	ACC: number
	EVA: number
	DEF: number
	WGT: number
	MHP: number
	MMP: number
	MSP: number
	LVL: number
}

export const DerivedStats = {
	WIL: 'Willpower',
	ATT: 'Attack',
	ACC: 'Accuracy',
	EVA: 'Evasion',
	DEF: 'Defence',
	WGT: 'Weight',
	MHP: 'Max Health Points',
	MMP: 'Max Magic Points',
	MSP: 'Max Stamina Points',
	LVL: 'Level'
}
