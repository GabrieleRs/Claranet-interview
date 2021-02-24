const Faction = require("./Faction");

class FactionsRepository {
  constructor() {
    this._factions = [];
  }
  createFaction(factionName) {
    const faction = new Faction(factionName);
    this._factions.push(faction);
    return faction;
  }
  removeFaction(faction) {
    const index = this._factions.indexOf(faction);
    if (index > -1) this._factions.splice(index, 1);
  }
  getFactions() {
    return this._factions;
  }
  getFactionsByMember(member) {
    return this.getFactions().filter(
      (faction) => faction.getMembers().indexOf(member) > -1
    );
  }
  getFactionByName(name) {
    return this.getFactions().find((faction) => faction.getName() === name);
  }
}

module.exports = FactionsRepository;
