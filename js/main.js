import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loader.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('/img/sprite.png')
.then(image => {
    const sprites = new SpriteSheet(image, 40, 40);
    sprites.define('ground', 2, 0);
    sprites.define('sky', 2, 3);

    
    for (let x = 0; x < 35; x++){
        for (let y =0; y < 14; y++){
            sprites.drawTile('sky', context, x, y);
        }
    }

    for (let x = 0; x < 30; x++){
        for (let y = 12; y < 14; y++){
            sprites.drawTile('ground', context, x, y);
        }
    }

}); 