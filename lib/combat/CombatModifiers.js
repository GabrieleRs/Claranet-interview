function isAlly(initiator, target) {
  return initiator.getFactions().some((r) => target.getFactions().includes(r));
}

function cannotDamageAlly(initiator, target, damage) {
  if (isAlly(initiator, target)) return 0;
  return damage;
}

function cannotDamageOutOfRange(initiator, target, damage) {
  if (!initiator.isCharacterInRange(target)) return 0;
  return damage;
}

function cannotSelfDamage(initiator, target, damage) {
  if (initiator === target) return 0;
  return damage;
}

function levelDiffDamageIncrease(initiator, target, damage) {
  if (initiator.getLevel() - target.getLevel() >= 5) return damage + damage / 2;
  return damage;
}

function levelDiffDamageReduction(initiator, target, damage) {
  if (target.getLevel() - initiator.getLevel() >= 5) return damage / 2;
  return damage;
}

function cannotHealOtherFactions(initiator, target, healing) {
  if (!isAlly(initiator, target) && initiator !== target) return 0;
  return healing;
}

function cannotHeal(initiator, target, healing) {
  return 0;
}

module.exports = {
  cannotDamageAlly,
  cannotDamageOutOfRange,
  levelDiffDamageIncrease,
  levelDiffDamageReduction,
  cannotSelfDamage,
  cannotHealOtherFactions,
  cannotHeal,
};
