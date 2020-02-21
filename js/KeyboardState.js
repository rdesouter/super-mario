
const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a key code
        this.keyMap = new Map();
    }

    addMapping(key, callback) {
        this.keyMap.set(key, callback);
    }

    handleEvent(event) {
        const {key} = event;

        if (!this.keyMap.has(key)) {
            // did not have key mapped
            return ;
        }
        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
        if (this.keyStates.get(key) === keyState) {
            return;
        }

        this.keyStates.set(key, keyState);
        console.log(this.keyStates);

        this.keyMap.get(key)(keyState);
    }


    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}