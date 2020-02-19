import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadLevel } from './loader.js';

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}

function loadBackgroundSprite() {
    return loadImage('/img/sprite.png')
        .then(image => {
            console.log("Image load", image);
            const sprites = new SpriteSheet(image, 40, 40);
            sprites.define('ground', 2, 0);
            sprites.define('sky', 2, 3);
            return sprites;
        });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

//load the images and the level json in parallel
Promise.all([
    loadBackgroundSprite(),
    loadLevel('1-1'),
])
    .then(([sprites, level,]) => {
        console.log("Level load", level);
        level.backgrounds.forEach(background => {
            console.log("background", background);
            drawBackground(background, context, sprites);
        });
    });

