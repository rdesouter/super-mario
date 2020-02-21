import Entity from './Entity.js';
import Jump from './actions/Jump.js';
import Velocity from './actions/Velocity.js';
import { loadMarioSprite } from './sprite.js';

export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity();

        mario.addAction(new Velocity());
        mario.addAction(new Jump());

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.position.x, this.position.y);
        }
        return mario;
    });
}

