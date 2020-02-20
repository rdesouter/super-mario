import Entity from './Entity.js';
import { loadMarioSprite } from './sprite.js';

export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity();
        mario.position.set(0, 440);
        mario.velocity.set(4, -20);

        mario.update = function updateMario() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.position.x, this.position.y);
        }
        return mario;
    });
}

