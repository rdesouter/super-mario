import SpriteSheet from './SpriteSheet.js';
import { loadImage} from './loader.js';

export function loadMarioSprite() {
    return loadImage('/img/sprite.png')
        .then(image => {
            const sprites = new SpriteSheet(image, 40, 40);
            sprites.define('idle', 200, 160, 40, 40);
            return sprites;
        });
}

export function loadBackgroundSprites() {
    return loadImage('/img/sprite.png')
        .then(image => {
            console.log("Image load", image);
            const sprites = new SpriteSheet(image, 40, 40);
            sprites.defineTile('ground', 2, 0);
            sprites.defineTile('sky', 2, 3);
            return sprites;
        });
}