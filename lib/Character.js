const Point = require("./Point");
const CombatEngine = require("./combat/CombatEngine");
const HealthManager = require("./HealthManager");
class Character {
  constructor(job, factionRepository) {
    this._setRange(job);
    this._level = 1;
    this._damage = 100;
    this._healing = 100;
    this._position = new Point(0, 0);
    this._healthManager = new HealthManager(1000);
    this._factionRepository = factionRepository;
  }

  //maybe refactor into another class with job,range
  _setRange(job) {
    switch (job) {
      case "ranged":
        this.range = 20;
        break;
      case "melee":
        this.range = 2;
        break;
      default:
        throw new Error("job not valid");
    }
  }

  getLevel() {
    return this._level;
  }
  setLevel(level) {
    this._level = level;
  }

  getHealing() {
    return this._healing;
  }
  setHealing(healing) {
    this._healing = healing;
  }

  getDamage() {
    return this._damage;
  }
  setDamage(damage) {
    this._damage = damage;
  }

  isAlive() {
    return this._healthManager.getHp() > 0;
  }

  setPosition(point) {
    this._position = point;
  }

  getPosition() {
    return this._position;
  }

  setHp(hp) {
    this._healthManager.setHp(hp);
  }
  getHp() {
    return this._healthManager.getHp();
  }

  joinFaction(name) {
    this._factionRepository.getFactionByName(name).addMember(this);
  }

  leaveFaction(name) {
    this._factionRepository.getFactionByName(name).removeMember(this);
  }

  getFactions() {
    return this._factionRepository.getFactionsByMember(this);
  }

  _isAlly(character) {
    return this.getFactions().some((r) => character.getFactions().includes(r));
  }

  attack(target) {
    new CombatEngine().attack(this, target);
  }

  heal(target) {
    new CombatEngine().heal(this, target);
  }

  isCharacterInRange(character) {
    if (
      this.getPosition().getDistanceFrom(character.getPosition()) <= this.range
    ) {
      return true;
    }
    return false;
  }
}

module.exports = Character;
