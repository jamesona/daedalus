export type VariableStat = 'HP' | 'MP' | 'SP'

export interface HasVariableStats {
	HP: number
	MP: number
	SP: number
}

export const VariableStats = {
	HP: 'Health Points',
	MP: 'Magic Points',
	SP: 'Stamina Points'
}
