import Level from './Level.js';
import { createBackgroundLayer, createSpriteLayer } from './layer.js';
import { loadBackgroundSprites } from './sprite.js';

export function loadImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', () => {
            // setTimeout(resolve, 150, img);
            resolve(img);
        });
        img.src = url;
    });

}

export function loadLevel(name) {
    return Promise.all([
        fetch(`/levels/${name}.json`)
        .then(resolve => resolve.json()),

        loadBackgroundSprites(),
    ])
        .then(([LevelSpec, backgroundSprites]) => {
            const level = new Level();

            const backgroundLayer = createBackgroundLayer(LevelSpec.backgrounds, backgroundSprites);
            level.comp.layers.push(backgroundLayer);

            // mario doens't exist here but we can use level.entities
            const spriteLayer = createSpriteLayer(level.entities);
            level.comp.layers.push(spriteLayer);

            return level;
        });
}