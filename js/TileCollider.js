class TileResolver {
    constructor(matrix, tileSize = 40) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            return {
                tile,
            };
        }
    }

    matchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY));
    }
}

// window.TileResolver = TileResolver;

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }    

    test(entity) {
        const match = this.tiles.matchByPosition(entity.position.x, entity.position.y);
        if (match) {
            console.log("Matched tile", match, match.tile);
            
        }
        //console.log('Testing collider', entity);
        
    }
}