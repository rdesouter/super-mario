class TileResolver {
    constructor(matrix, tileSize = 40) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }
}

window.TileResolver = TileResolver;

export default class TileCollider {
    constructor(tiles) {
        this.tiles = tiles;
    }    

    test(entity) {
        //console.log('Testing collider', entity);
        
    }
}