
export function loadImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve(img);
        });
        img.src = url;
    });

}

export function loadLevel(name) {
    return fetch(`/levels/${name}.json`)
        .then(resolve => resolve.json());
}