function loadImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', ()=>{
            resolve(img);
        });
        img.src = url;
    })
}

class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define( name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        buffer
            .getContext('2d')
            .drawImage(
                this.image, 
                x * this.width, 
                y * this.height, 
                this.width, this.height, 
                0 , 
                0, 
                this.width, 
                this.height);
        this.tiles  .set(name, buffer);      

    }

    draw(name, context, x, y){
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

//context.fillRect(0,0,100,100);

loadImage('/img/sprite.png')
.then(image => {
    const sprites = new SpriteSheet(image, 40, 40);
    sprites.define('ground', 0, 0);
    sprites.draw('ground', context, 100, 100);

    context.drawImage(image,
        0, 0,
        40, 40,

        10 , 60,
        40, 40);
})