import Compositor from './Compositor.js';
import {Matrix} from './math.js'

export default class Level {
    constructor(){
        this.comp = new Compositor();
        // set prevent to add twice mario sprite for example
        this.entities = new Set();
        this.tiles = new Matrix();
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        });
    }
}