import {Vector} from './math.js';

export class Action {
    constructor(name) {
        this.NAME = name;
    }

    update() {
        console.warn('Unhandled update call in Action');     
    }
}

export default class Entity {
    constructor() {
        this.position = new Vector(0, 0);
        this.vel = new Vector(0, 0);
        this.actions = [];
    }

    addAction(action) {
        this.actions.push(action);
        this[action.NAME] = action;
    }

    update(deltaTime) {
        this.actions.forEach( action => {
            action.update(this, deltaTime);
        });
    }
}