import {Action} from '../Entity.js';

export default class Jump extends Action {
    constructor() {
        super('jump');

        /**
         * set a duration for holding the jump button
         * if it's pressed a half second jump'll be higher 
         * then if it's pressed shorter duration
         */
        this.duration = 0.5;
        this.velocity = 200;
        this.engageTime = 0;
    }

    start() {
        this.engageTime = this.duration;
    }

    cancel() {
        this.engageTime = 0;

    }

    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}