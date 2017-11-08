"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HP_FACTOR = 2;
const MP_FACTOR = 2;
const SP_FACTOR = 2;
const WIL_FACTOR = 0.05;
const ATT_FACTOR = 0.05;
const ACC_FACTOR = 0.05;
const EVA_FACTOR = 0.02;
const DEF_FACTOR = 0.00;
class Creature {
    constructor(type) {
        this.inventory = [];
        this.abilities = [];
        this.purse = 0;
        this.HP_FACTOR = type['HP_FACTOR'] || HP_FACTOR;
        this.MP_FACTOR = type['MP_FACTOR'] || MP_FACTOR;
        this.SP_FACTOR = type['SP_FACTOR'] || SP_FACTOR;
        this.WIL_FACTOR = type['WIL_FACTOR'] || WIL_FACTOR;
        this.ATT_FACTOR = type['ATT_FACTOR'] || ATT_FACTOR;
        this.ACC_FACTOR = type['ACC_FACTOR'] || ACC_FACTOR;
        this.EVA_FACTOR = type['EVA_FACTOR'] || EVA_FACTOR;
        this.DEF_FACTOR = type['DEF_FACTOR'] || DEF_FACTOR;
        this._con = type.con || 5;
        this._str = type.str || 5;
        this._int = type.int || 5;
        this._dex = type.dex || 5;
        this.type = type;
        this.sprite = type['sprite'];
        this.location = type.location || null;
        this.name = type.name || 'creature';
        this.purse =
            this.hp = this.maxHp;
        this.mp = this.maxMp;
        this.sp = this.maxSp;
        if (type.purse)
            this.purse = genPurse(type.purse);
    }
    toString() {
        return this.type;
    }
    get con() {
        return this.calcStat('con', this._con, this.effects);
    }
    get str() {
        return this.calcStat('str', this._str, this.effects);
    }
    get int() {
        return this.calcStat('int', this._int, this.effects);
    }
    get dex() {
        return this.calcStat('dex', this._dex, this.effects);
    }
    get maxHp() {
        return this.calcStat('sp', (this.con * HP_FACTOR), this.effects);
    }
    get maxMp() {
        return this.calcStat('mp', (this.int * MP_FACTOR), this.effects);
    }
    get maxSp() {
        return this.calcStat('sp', (this.dex * SP_FACTOR), this.effects);
    }
    get wil() {
        return this.calcStat('wil', (this.int * WIL_FACTOR), this.effects);
    }
    get att() {
        return this.calcStat('att', (this.str * ATT_FACTOR), this.effects);
    }
    get acc() {
        return this.calcStat('acc', (this.dex * ACC_FACTOR), this.effects);
    }
    get eva() {
        return this.calcStat('eva', (this.dex - this.wgt / this.str * 10) * EVA_FACTOR, this.effects);
    }
    get def() {
        return this.calcStat('def', (this.con * DEF_FACTOR), this.effects);
    }
    get wgt() {
        return this.calcStat('wgt', 0, this.effects);
    }
    get effects() {
        return [].concat(this.abilities, this.inventory
            .filter(item => item.effect)
            .map(item => item.effect));
    }
    calcStat(stat, base, set) {
        let items = set.filter(item => item[stat]);
        let sumItems = items.filter(item => item[stat].match(/[+-]/));
        let productItems = items.filter(item => item[stat].match(/\*/));
        let sum = sumItems.reduce((sum, item) => {
            return eval(sum + item[stat]);
        }, 0);
        let product = productItems.reduce((sum, item) => {
            return eval(sum + item[stat]);
        }, 1);
        return (base + sum) * product;
    }
}
exports.Creature = Creature;
function genPurse(range) {
    let difference = Math.abs(eval(range));
    let minimum = Math.min.apply(null, range.split('-').map(val => Number(val)));
    let ammount = Math.random() * difference + minimum;
    return Math.round(ammount);
}
//# sourceMappingURL=creature.js.map