import Entity, { Action } from './Entity.js';
import { loadMarioSprite } from './sprite.js';

class Velocity extends Action {
    constructor() {
        super('velocity');
    }

    update(entity, deltaTime) {
        entity.position.x += entity.vel.x * deltaTime;
        entity.position.y += entity.vel.y * deltaTime;
    }

}

export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity();

        mario.addAction(new Velocity());

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.position.x, this.position.y);
        }
        // mario.update = function updateMario(deltaTime) {
        //     this.position.x += this.velocity.x * deltaTime;
        //     this.position.y += this.velocity.y * deltaTime;
        // }
        return mario;
    });
}

