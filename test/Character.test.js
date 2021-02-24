Character = require('../lib/Character');
Point = require('../lib/Point');
describe("Character", () => {
    //1st iteration
    test('A simple test for character defaults', () => {
        const character = new Character("melee");
        expect(character).toEqual(
            expect.objectContaining({
                hp: 1000,
                level: 1,
                alive: true,
                damage: 100,
                healing: 100
            }));
    });

    test("A character can damage another character", () => {
        const attacker = new Character("melee");
        const defender = new Character("melee");
        attacker.attack(defender);
        expect(defender.hp).toBe(900);
    });
    test("A character can damage another character multiple times", () => {
        const attacker = new Character("melee");
        const defender = new Character("melee");
        attacker.attack(defender);
        attacker.attack(defender);
        expect(defender.hp).toBe(800);
    });
    test("If a character receives damage above 1000hp it must die and hp must be 0", () => {
        const attacker = new Character("melee");
        const defender = new Character("melee");
        attacker.damage = 1000;
        attacker.attack(defender);
        expect(defender).toEqual(expect.objectContaining({
            hp: 0,
            alive: false
        }));
    });
    test("A character can heal a character", () => {
        const healer = new Character("melee");
        healer.hp = 900;
        healer.heal(healer);
        expect(healer.hp).toBe(1000);
    });
    test("A character can heal a character multiple times", () => {
        const healer = new Character("melee");
        healer.hp = 800;
        healer.heal(healer);
        healer.heal(healer);
        expect(healer.hp).toBe(1000);
    });
    test("A character cannot be healed above 1000hp ", () => {
        const healer = new Character("melee");
        const injured = new Character("melee");
        healer.heal(injured);
        expect(injured.hp).toBe(1000);
    });
    test("A dead character cannot be healed", () => {
        const healer = new Character("melee");
        const injured = new Character("melee");
        injured.hp = 0;
        healer.heal(injured);
        expect(injured.hp).toBe(0);
    });
    //2nd iteration
    test("A character cannot deal damage to itself", () => {
        const attacker = new Character("melee");
        attacker.attack(attacker);
        expect(attacker.hp).toBe(1000);
    });
    test("A character can only heal itself", () => {
        const healer = new Character("melee");
        const injured = new Character("melee");
        injured.hp = 60;
        healer.heal(injured);
        expect(injured.hp).toBe(60);
    });
    test("If the target is 5 or more levels above the attacker damage reduced by 50%", () => {
        const attacker = new Character("melee");
        const defender = new Character("melee");
        defender.level = 6;
        attacker.attack(defender);
        expect(defender.hp).toBe(950);
    });
    test("If the target is 5 or more levels below the attacker damage increased by 50%", () => {
        const attacker = new Character("melee");
        const defender = new Character("melee");
        attacker.level = 6;
        attacker.attack(defender);
        expect(defender.hp).toBe(850);
    });
    test("If the target is 5 or more levels below the attacker damage increased by 50%", () => {
        const attacker = new Character("melee");
        const defender = new Character("melee");
        attacker.level = 6;
        attacker.attack(defender);
        expect(defender.hp).toBe(850);
    });
    //3rd iteration
    test("character must be in range to deal damage", () => {
        const attacker = new Character("melee");
        const defender = new Character("ranged");
        defender.position = new Point(0,5);
        attacker.attack(defender);
        expect(defender.hp).toBe(1000);
    });
    //4th iteration
})

