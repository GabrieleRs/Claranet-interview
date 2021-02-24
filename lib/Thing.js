const Point = require("./Point");
const HealthManager = require("./HealthManager");
class Thing {
  constructor(hp) {
    this._position = new Point(0, 0);
    this._healthManager = new HealthManager(hp);
  }

  isDestroyed() {
    return this._healthManager.getHp() <= 0;
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

  getFactions() {
    return [];
  }
}

module.exports = Thing;
