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

        const gravity = 30;
        mario.position.set(0, 440);
        mario.velocity.set(200, -600);

        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        const deltaTime = 1/60;
        let lastTime = 0;

        function update(time) {
            
            // working with second so divide time per 1000
            //deltaTime = (time - lastTime) / 1000;
            console.log(deltaTime);
            
            //console.log(deltaTime, time);
            
            comp.draw(context);
            mario.update(deltaTime);
            
            //console.log(mario.position);
            mario.velocity.y += gravity;
            //requestAnimationFrame(update);

            //only use for debugging and simulate 144fps or 5fps screen
            setTimeout(update, 1000/30, performance.now());
            lastTime = time;
        }
        update(0);

    });

