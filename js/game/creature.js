'use strict'
module(() => {
	let HP_FACTOR = 2
	let MP_FACTOR = 2
	let SP_FACTOR = 2
	let WIL_FACTOR = 0.05
	let ATT_FACTOR = 0.05
	let ACC_FACTOR = 0.05
	let EVA_FACTOR = 0.02
	class Creature {
		constructor(config) {
			if (!config) config = {}
			this.location = config.location || null
			HP_FACTOR = config['HP_FACTOR'] || HP_FACTOR
			MP_FACTOR = config['MP_FACTOR'] || MP_FACTOR
			SP_FACTOR = config['SP_FACTOR'] || SP_FACTOR
			WIL_FACTOR = config['WIL_FACTOR'] || WIL_FACTOR
			ATT_FACTOR = config['ATT_FACTOR'] || ATT_FACTOR
			ACC_FACTOR = config['ACC_FACTOR'] || ACC_FACTOR
			EVA_FACTOR = config['EVA_FACTOR'] || EVA_FACTOR
			this.type = config.type || null
			this.name = config.name || 'creature'
			this.purse = config.purse || 0
			this.inventory = config.inventory || []
			this.abilities = config.abilities || []
			this.baseStats = {
				con: config.con || 5,
				str: config.str || 5,
				int: config.int || 5,
				dex: config.dex || 5
			}
			this.hp = this.maxHp
			this.mp = this.maxMp
			this.sp = this.maxSp
			this.sprite = 0
		}

		toString() {
			return this.type
		}

		get con() {
			return netStat('con', this.baseStats.con, this.effects)
		}

		get str() {
			return netStat('str', this.baseStats.str, this.effects)
		}

		get int() {
			return netStat('int', this.baseStats.int, this.effects)
		}

		get dex() {
			return netStat('dex', this.baseStats.dex, this.effects)
		}

		get maxHp() {
			return netStat('sp', (this.con * HP_FACTOR), this.effects)
		}

		get maxMp() {
			return netStat('mp', (this.int * MP_FACTOR), this.effects)
		}

		get maxSp() {
			return netStat('sp', (this.dex * SP_FACTOR), this.effects)
		}

		get wil() {
			return netStat('wil', (this.int * WIL_FACTOR), this.effects)
		}

		get att() {
			return netStat('att', (this.str * ATT_FACTOR), this.effects)
		}

		get acc() {
			return netStat('acc', (this.dex * ACC_FACTOR), this.effects)
		}

		get eva() {
			return netStat('eva', (this.dex - this.wgt / this.str * 10) * EVA_FACTOR, this.effects)
		}

		get def() {
			return netStat('def', (this.con * DEF_FACTOR), this.effects)
		}

		get wgt() {
			return netStat('wgt', 0, this.inventory)
		}

		get effects() {
			return [].concat(this.abilities, this.inventory
				.filter(item => item.effect)
				.map(item => item.effect)
			)
		}
	}

	let netStat = function(stat, base, set) {
		let items = set.filter(item => item[stat])
		let sumItems = items.filter(item => item[stat].match(/[+-]/))
		let productItems = items.filter(item => item[stat].match(/\*/))
		let sum = sumItems.reduce((sum, item) => {
			return eval(sum + item[stat])
		}, 0)
		let product = productItems.reduce((sum, item) => {
			return eval(sum + item[stat])
		}, 1)
		return (base + sum) * product
	}
	exports(Creature)
})
