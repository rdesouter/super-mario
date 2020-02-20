import Compositor from './Compositor.js';
import Entity from './Entity.js'
import { loadLevel } from './loader.js';
import {createMario} from './entities.js';
import { loadBackgroundSprite } from './sprite.js';
import { createBackgroundLayer, createSpriteLayer } from './layer.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

//load the images and the level json in parallel
Promise.all([
    createMario(),
    loadBackgroundSprite(),
    loadLevel('1-1'),
])
    .then(([mario, backgroundSprites, level,]) => {
        const comp = new Compositor();
        console.log("level", level);

        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        //comp.layers.push(backgroundLayer);

        const gravity = 0.5;

    


        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        function update() {
            comp.draw(context);
            mario.update();
            mario.velocity.y += gravity;
            //requestAnimationFrame(update);
            // setTimeout do the same than requestAnimationFrame except counting 
            //frame from browser don't use for real just for debug
            setTimeout(update, 1000/60);
        }
        update();

    });

