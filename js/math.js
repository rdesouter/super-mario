// const matrix = new Matrix();
// matrix.set(5, 4, { name: 'ground' });
// const tile = matrix.get(mario.position.x * TILE_SIZE, mario.position.y * TILE_SIZE)
export class Matrix {
    constructor() {
        this.grid = [];
    }
    
    forEach(callback) {
        this.grid.forEach((column, x, ) => {
            column.forEach((value, y) => {
                callback(value, x , y);
            });
        });
    }

    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }
    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }
        this.grid[x][y] = value;
    }
}
window.Matrix = Matrix;

export class Vector {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}