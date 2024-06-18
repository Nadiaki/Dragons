interface Dragon {
    id: number;
    name: string;
    size: string;
    type: string;
    strength: number;
}

const dragons: Dragon[] = require('../../dragons.json');

class DragonService {
    getDragons() {
        return dragons;
    }
    getDragonById(id: number) {
        return dragons.find((dragon: any) => dragon.id === id);
    }
    fight(dragons:number[]) {
        const dragon1 = this.getDragonById(dragons[0]);
        const dragon2 = this.getDragonById(dragons[1]);

        if (!dragon1 || !dragon2) {
            throw new Error('One or both dragons are missing!');
        }

        //TODO: adjust strength modifier, move to util
        const damageToDragon1 = Math.ceil(Math.random()*20) + dragon2.strength;
        const damageToDragon2 = Math.ceil(Math.random()*20) + dragon1.strength;

        return [
            {
                id: dragon1.id,
                damageTaken: damageToDragon2
            },
            {
                id: dragon2.id,
                damageTaken: damageToDragon1
            }
        ];
    }
}

export default new DragonService();