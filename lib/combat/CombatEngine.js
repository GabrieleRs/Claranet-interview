const modifiers = require("./CombatModifiers");

class CombatEngine {
  constructor() {}
  attack(initiator, target) {
    let rules = [];
    switch (target.constructor.name) {
      case "Character":
        rules = [
          modifiers.cannotDamageAlly,
          modifiers.cannotDamageOutOfRange,
          modifiers.cannotSelfDamage,
          modifiers.levelDiffDamageIncrease,
          modifiers.levelDiffDamageReduction,
        ];
        break;
      default:
        rules = [modifiers.cannotDamageOutOfRange];
        break;
    }
    let damage = initiator.getDamage();
    for (const rule of rules) {
      damage = rule(initiator, target, damage);
    }
    target.setHp(target.getHp() - damage);
  }

  heal(initiator, target) {
    let rules = [];
    switch (target.constructor.name) {
      case "Character":
        rules = [modifiers.cannotHealOtherFactions];
        break;
      default:
        rules = [modifiers.cannotHeal];
        break;
    }
    let healing = initiator.getHealing();
    for (const rule of rules) {
      healing = rule(initiator, target, healing);
    }
    target.setHp(target.getHp() + healing);
  }
}

module.exports = CombatEngine;
