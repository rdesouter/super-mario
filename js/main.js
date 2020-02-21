
import Timer from './Timer.js';
import Keyboard from './KeyboardState.js';

import { loadLevel } from './loader.js';
import { createMario } from './entities.js';



// window.addEventListener('keyup', event => {
//     event.preventDefault();
//     console.log(event); 
// })

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

//load the images and the level json in parallel
Promise.all([
    createMario(),
    loadLevel('1-1'),
])
    .then(([mario, level]) => {
        console.log("level", level);

        const gravity = 1000;
        mario.position.set(80, 100);
        level.entities.add(mario)

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

        // frame length instead of frame rate
        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            level.update(deltaTime);
            level.comp.draw(context);
            //console.log(mario.position);
            mario.vel.y += gravity * deltaTime;
        }
        timer.start();
    });

