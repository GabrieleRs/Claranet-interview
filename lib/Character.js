Point = require('./Point');

class Character {
    constructor(job) {

        //maybe create character factory(job)
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
        this._hp = 1000;
        this.level = 1;
        this.alive = true;
        this.damage = 100;
        this.healing = 100;
        this._position = new Point(0, 0);
        this._factions = [];
    }
    
    set position(point){
        this._position = point;
    }

    get position(){
        return this._position;
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
        if (!this.isCharacterInRange(character)) {
            return;
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

    isCharacterInRange(character){
        if (this._position.getDistanceFrom(character.position) <= this.range) {
            return true;
        }
        return false;
    }
}

module.exports = Character;
