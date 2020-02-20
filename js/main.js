import Compositor from './Compositor.js';
import { loadLevel } from './loader.js';
import {loadBackgroundSprite, loadMarioSprite} from './sprite.js';
import { createBackgroundLayer } from './layer.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, position){
    return function drawSpriteLayer(context){
        for (let i = 0; i < 3; i++) {
            sprite.draw('idle', context, position.x, position.y);
        }
    };
}

class Vector {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//load the images and the level json in parallel
Promise.all([
    loadMarioSprite(),
    loadBackgroundSprite(),
    loadLevel('1-1'),
])
    .then(([marioSprite, backgroundSprites, level,]) => {
        const comp = new Compositor();
        console.log("level", level);
        
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const gravity = 0.5;
        
        //to much info for mari need to create some class
        const position = new Vector(0, 440);
        const vel = new Vector(4, -20);
        
        const spriteLayer = createSpriteLayer(marioSprite, position);
        comp.layers.push(spriteLayer);
        function update(){
            comp.draw(context);
            marioSprite.draw('idle', context, position.x, position.y);
            position.x += vel.x;
            position.y += vel.y;
            vel.y += gravity;
            
            requestAnimationFrame(update);
        }
        update();
        
    });

