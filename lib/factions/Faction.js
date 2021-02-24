class Faction {
  //istance using the repository
  constructor(name) {
    this._name = name;
    this._members = [];
  }
  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }
  addMember(member) {
    this._members.push(member);
  }
  removeMember(member) {
    const index = this._members.indexOf(member);
    if (index > -1) {
      this._members.splice(index, 1);
    }
  }
  getMembers() {
    return this._members;
  }
}

module.exports = Faction;
