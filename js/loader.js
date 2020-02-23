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

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; x++) {
                for (let y = y1; y < y2; y++) {
                   level.tiles.set(x, y, {
                       //load from json each tile of background
                       name: background.tile
                   });
                }
            }
        });
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

            createTiles(level, LevelSpec.backgrounds);

            const backgroundLayer = createBackgroundLayer(LevelSpec.backgrounds, backgroundSprites);
            level.comp.layers.push(backgroundLayer);

            // mario doens't exist here but we can use level.entities
            const spriteLayer = createSpriteLayer(level.entities);
            level.comp.layers.push(spriteLayer);
            
            console.log("level in loader", level);
            //console.table(level.tiles.grid);
            return level;
        });
}