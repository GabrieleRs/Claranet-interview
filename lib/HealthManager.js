class HealthManager {
  constructor(startingHp) {
    this._startingHp = startingHp;
    this._hp = startingHp;
  }
  getHp() {
    return this._hp;
  }

  setHp(hp) {
    this._hp = hp;
    if (this._hp < 0) {
      this._hp = 0;
    }
    if (this._hp > this._startingHp) {
      this._hp = this._startingHp;
    }
  }
}

module.exports = HealthManager;
