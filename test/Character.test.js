const Character = require("../lib/Character");
const Thing = require("../lib/Thing");
const Point = require("../lib/Point");
const FactionsRepository = require("../lib/factions/FactionRepository");
describe("Character", () => {
  test("A character can damage another character", () => {
    const attacker = new Character("melee", new FactionsRepository());
    const defender = new Character("melee", new FactionsRepository());
    attacker.attack(defender);
    attacker.attack(defender);
    expect(defender.getHp()).toBe(800);
  });
  test("If a character receives damage above 1000hp it must die and hp must be 0", () => {
    const attacker = new Character("melee", new FactionsRepository());
    const defender = new Character("melee", new FactionsRepository());
    attacker.setDamage(1000);
    attacker.attack(defender);
    expect(defender.getHp()).toBe(0);
    expect(defender.isAlive()).toBe(false);
  });
  test("A character can heal itself", () => {
    const healer = new Character("melee", new FactionsRepository());
    healer.setHp(100);
    healer.heal(healer);
    healer.heal(healer);
    expect(healer.getHp()).toBe(300);
  });
  test("A character cannot be healed above 1000hp ", () => {
    const healer = new Character("melee", new FactionsRepository());
    healer.heal(healer);
    expect(healer.getHp()).toBe(1000);
  });
  test("A dead character cannot be healed", () => {
    const healer = new Character("melee", new FactionsRepository());
    const injured = new Character("melee", new FactionsRepository());
    injured.setHp(0);
    healer.heal(injured);
    expect(injured.getHp()).toBe(0);
  });
  //2nd iteration
  test("A character cannot deal damage to itself", () => {
    const attacker = new Character("melee", new FactionsRepository());
    attacker.attack(attacker);
    expect(attacker.getHp()).toBe(1000);
  });
  test("If the target is 5 or more levels above the attacker damage reduced by 50%", () => {
    const attacker = new Character("melee", new FactionsRepository());
    const defender = new Character("melee", new FactionsRepository());
    defender.setLevel(6);
    attacker.attack(defender);
    expect(defender.getHp()).toBe(950);
  });
  test("If the target is 5 or more levels below the attacker damage increased by 50%", () => {
    const attacker = new Character("melee", new FactionsRepository());
    const defender = new Character("melee", new FactionsRepository());
    attacker.setLevel(6);
    attacker.attack(defender);
    expect(defender.getHp()).toBe(850);
  });
  //3rd iteration
  test("character must be in range to deal damage", () => {
    const attacker = new Character("melee", new FactionsRepository());
    const defender = new Character("ranged", new FactionsRepository());
    defender.setPosition(new Point(0, 5));
    attacker.attack(defender);
    expect(defender.getHp()).toBe(1000);
  });
  //4th iteration
  test("two characters of the same faction cannot attack each other", () => {
    const repo = new FactionsRepository();
    repo.createFaction("evil faction");
    const attacker = new Character("melee", repo);
    const defender = new Character("ranged", repo);
    attacker.joinFaction("evil faction");
    defender.joinFaction("evil faction");
    attacker.attack(defender);
    expect(defender.getHp()).toBe(1000);
  });
  test("two characters of the same faction can heal each other", () => {
    const repo = new FactionsRepository();
    repo.createFaction("evil faction");
    const attacker = new Character("melee", repo);
    const defender = new Character("ranged", repo);
    attacker.joinFaction("evil faction");
    defender.joinFaction("evil faction");
    defender.setHp(200);
    attacker.heal(defender);
    expect(defender.getHp()).toBe(300);
  });

  //5th iteration
  test("a character can attack a thing", () => {
    const attacker = new Character("melee", new FactionsRepository());
    const tree = new Thing(2000);
    attacker.attack(tree);
    expect(tree.getHp()).toBe(1900);
  });
});
