class Character {
    constructor(job) {
        switch (job) {
            case "ranged":
                this.range = 2;
                break;
            case "melee":
                this.range = 20;
                break;
            default:
                throw new Error("job not valid");
        }
        this._hp = 1000;
        this.range = range;
        this.level = 1;
        this.alive = true;
        this.damage = 100;
        this.healing = 100;
    }

    set hp(hp) {
        if (this.alive === false) {
            return;
        }
        this._hp = hp;
        if (this._hp <= 0) {
            this._hp = 0;
            this.alive = false;
        }
        if (this._hp > 1000) {
            this._hp = 1000;
        }
    }

    get hp() {
        return this._hp;
    }

    attack(character) {
        if (character === this) {
            return; //cannot self damage
        }
        let damage = this.damage;
        if (character.level - this.level >= 5)
            damage = damage / 2;
        if (this.level - character.level >= 5)
            damage = damage + (damage / 2);
        character.hp -= damage;
    }

    heal(character) {
        if (character !== this) {
            return; //cannot heal other characters
        }
        character.hp += this.healing;
    }
}

module.exports = Character;
