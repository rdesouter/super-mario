import Compositor from './Compositor.js';
import Timer from './Timer.js';
import Keyboard from './KeyboardState.js';

import { loadLevel } from './loader.js';
import { createMario } from './entities.js';
import { loadBackgroundSprite } from './sprite.js';
import { createBackgroundLayer, createSpriteLayer } from './layer.js';


// window.addEventListener('keyup', event => {
//     event.preventDefault();
//     console.log(event); 
// })


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
        comp.layers.push(backgroundLayer);

        const gravity = 1000;
        mario.position.set(80, 440);
        // mario.vel.set(300, -900);

        //keyboard touch for mario's actions
        const input = new Keyboard();
        input.addMapping('ArrowUp', keyState => {
            if (keyState) {
                mario.jump.start();
            }
            else {
                mario.jump.cancel();
            }
        });
        input.listenTo(window);

        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        // frame length instead of frame rate
        let timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {

            mario.update(deltaTime);
            comp.draw(context);
            //console.log(mario.position);
            mario.vel.y += gravity * deltaTime;
        }
        timer.start();
    });

