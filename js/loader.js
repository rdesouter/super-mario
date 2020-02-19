
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
    return fetch(`/levels/${name}.json`)
        .then(resolve => resolve.json())
        // .then(json => new Promise(resolve => setTimeout(resolve, 1000, json)))
}