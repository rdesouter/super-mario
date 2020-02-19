import Compositor from './Compositor.js';
import { loadLevel } from './loader.js';
import {loadBackgroundSprite, loadMarioSprite} from './sprite.js';
import { createBackgroundLayer } from './layer.js';



const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, position){
    return function drawSpriteLayer(context){
        for (let i = 0; i < 120; i++) {
            sprite.draw('idle', context, position.x + i * 3 , position.y);
        }
    };
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

        const position = {
            x: 0,
            y: 0,
        };

        const spriteLayer = createSpriteLayer(marioSprite, position);
        comp.layers.push(spriteLayer);
        function update(){
            comp.draw(context);
            marioSprite.draw('idle', context, position.x, position.y);
            position.x += 2;
            position.y += 2;
            requestAnimationFrame(update);
        }
        update();
        
    });

