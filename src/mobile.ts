import { Item } from './item'
import { Ability } from './ability'
import { Creature } from './creature'
import { StatName, Stats, Modifiers } from './stats'
import { Location } from './world'

const HP_FACTOR = 2
const MP_FACTOR = 2
const SP_FACTOR = 2
const WIL_FACTOR = 0.05
const ATT_FACTOR = 0.05
const ACC_FACTOR = 0.05
const EVA_FACTOR = 0.02
const DEF_FACTOR = 0.00

export class Mobile implements Stats {
	HP_FACTOR: number
	MP_FACTOR: number
	SP_FACTOR: number
	WIL_FACTOR: number
	ATT_FACTOR: number
	ACC_FACTOR: number
	EVA_FACTOR: number
	DEF_FACTOR: number
	_con: number
	_str: number
	_int: number
	_dex: number
	type: Creature
	sprite: string
	location: Location
	name: string
	hp: number
	mp: number
	sp: number
	inventory: Item[] = []
	abilities: Ability[] = []
	purse: number = 0

	constructor(type: Creature, start: Location) {
		this.HP_FACTOR = type['HP_FACTOR'] || HP_FACTOR
		this.MP_FACTOR = type['MP_FACTOR'] || MP_FACTOR
		this.SP_FACTOR = type['SP_FACTOR'] || SP_FACTOR
		this.WIL_FACTOR = type['WIL_FACTOR'] || WIL_FACTOR
		this.ATT_FACTOR = type['ATT_FACTOR'] || ATT_FACTOR
		this.ACC_FACTOR = type['ACC_FACTOR'] || ACC_FACTOR
		this.EVA_FACTOR = type['EVA_FACTOR'] || EVA_FACTOR
		this.DEF_FACTOR = type['DEF_FACTOR'] || DEF_FACTOR
		this._con = type._con
		this._str = type._str
		this._int = type._int
		this._dex = type._dex
		this.type = type
		this.sprite = type['sprite']
		this.location = start
		this.name = type.name || 'creature'
		this.purse = 0
		this.hp = this.maxHp()
		this.mp = this.maxMp()
		this.sp = this.maxSp()
		if (type.abilities) type.abilities.forEach(ability => {
			this.abilities.push(ability)
		})
		if (type.purse) this.purse = genPurse(type.purse)
	}

	toString() {
		return this.type
	}

	con() {
		return calcStat('con', this._con, this.effects())
	}

	str() {
		return calcStat('str', this._str, this.effects())
	}

	int() {
		return calcStat('int', this._int, this.effects())
	}

	dex() {
		return calcStat('dex', this._dex, this.effects())
	}

	maxHp() {
		return calcStat('sp', (this.con() * HP_FACTOR), this.effects())
	}

	maxMp() {
		return calcStat('mp', (this.int() * MP_FACTOR), this.effects())
	}

	maxSp() {
		return calcStat('sp', (this.dex() * SP_FACTOR), this.effects())
	}

	wil() {
		return calcStat('wil', (this.int() * WIL_FACTOR), this.effects())
	}

	att() {
		return calcStat('att', (this.str() * ATT_FACTOR), this.effects())
	}

	acc() {
		return calcStat('acc', (this.dex() * ACC_FACTOR), this.effects())
	}

	eva() {
		return calcStat('eva', (this.dex() - this.wgt() / this.str() * 10) * EVA_FACTOR, this.effects())
	}

	def() {
		return calcStat('def', (this.con() * DEF_FACTOR), this.effects())
	}

	wgt() {
		return calcStat('wgt', 0, this.effects())
	}

	effects(): Modifiers[] {
		return [].concat(this.abilities, this.inventory
			.filter(item => item.effect)
			.map(item => item.effect)
		)
	}

}

function calcStat(stat: StatName, base: number, set: Modifiers[]): number {
	let items = set.filter(item => item[stat])
	let sumItems = items.filter(item => item[stat].mod.match(/[+-]/))
	let productItems = items.filter(item => item[stat].mod.match(/\*/))
	let sum = sumItems.reduce((sum, item) => {
		return eval(sum + item[stat].mod + item[stat].val)
	}, 0)
	let product = productItems.reduce((sum, item) => {
		return eval(sum + item[stat].mod + item[stat].val)
	}, 1)
	return (base + sum) * product
}

function genPurse(range: string): number {
	let difference = Math.abs(eval(range))
	let minimum = Math.min.apply(null, range.split('-').map(val => Number(val)))
	let ammount = Math.random() * difference + minimum
	return Math.round(ammount)
}
