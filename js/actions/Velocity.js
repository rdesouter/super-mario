import {Action} from '../Entity.js';

export default class Velocity extends Action {
    constructor() {
        super('velocity');
    }

    update(entity, deltaTime) {
        entity.position.x += entity.vel.x * deltaTime;
        entity.position.y += entity.vel.y * deltaTime;
    }
}