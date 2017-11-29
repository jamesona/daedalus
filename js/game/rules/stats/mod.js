"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const derived_1 = require("./derived");
const variable_1 = require("./variable");
exports.Stats = [].concat(Object.keys(base_1.BaseStats), Object.keys(derived_1.DerivedStats), Object.keys(variable_1.VariableStats));
const Operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
};
function statFromMod(mod) {
    return Object.keys(mod)[0];
}
exports.statFromMod = statFromMod;
function applyMod(value, mod) {
    const operator = Operators[mod[0]];
    const operand = mod[1];
    return operator(value, operand);
}
exports.applyMod = applyMod;
function applyMods(subject, mods) {
    mods.forEach(mod => {
        const stat = statFromMod(mod);
        const before = subject[stat];
        subject[stat] = applyMod(before, mod[stat]);
    });
}
exports.applyMods = applyMods;
//# sourceMappingURL=mod.js.map