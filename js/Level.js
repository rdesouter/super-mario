import Compositor from './Compositor.js';

export default class Level {
    constructor(){
        this.comp = new Compositor();
        // set prevent to add twice mario sprite for example
        this.entities = new Set();
    }
}