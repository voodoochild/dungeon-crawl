import { directions } from "../lib/constants";

// Based on https://medium.freecodecamp.org/how-to-make-your-own-procedural-dungeon-map-generator-using-the-random-walk-algorithm-e0085c8aa9a

function create2DArray(v, size) {
    const row = new Array(size).fill(v);

    let array = [];

    for(let i = 0; i < size; i++) {
        array.push([].concat(row));
    }

    return array;
}

export default class Map {
    constructor({ dimensions = 20, maxTunnels = 50, maxLength = 8 } = {}) {
        this.size = dimensions;
        this.spawn = null;

        this._generate({ dimensions, maxTunnels, maxLength });
    }

    /* eslint max-statements: ["warn", 20] */
    _generate({ dimensions, maxTunnels, maxLength }) {
        const dir = Object.values(directions);

        let currentRow    = Math.floor(Math.random() * dimensions),
            currentColumn = Math.floor(Math.random() * dimensions),
            lastDirection = [],
            tunnelLength  = 0,
            randomDirection,
            randomLength;

        this.map = create2DArray(1, dimensions);

        while(maxTunnels) {
            do {
                randomDirection = dir[Math.floor(Math.random() * dir.length)];
            } while(
                (
                    randomDirection[0] === -lastDirection[0] &&
                    randomDirection[1] === -lastDirection[1]
                ) ||
                (
                    randomDirection[0] === lastDirection[0] &&
                    randomDirection[1] === lastDirection[1]
                )
            );

            randomLength = Math.ceil(Math.random() * maxLength);
            tunnelLength = 0;

            while(tunnelLength < randomLength) {
                if(
                    ((currentRow === 0) && (randomDirection[0] === -1)) ||
                    ((currentColumn === 0) && (randomDirection[1] === -1)) ||
                    ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
                    ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))
                ) {
                    break;
                } else {
                    if(!this.spawn) {
                        this.spawn = [ currentRow, currentColumn ];
                    }

                    this.map[currentRow][currentColumn] = 0;
                    currentRow += randomDirection[0];
                    currentColumn += randomDirection[1];
                    tunnelLength++;
                }
            }

            if(tunnelLength) {
                lastDirection = randomDirection;
                maxTunnels--;
            }
        }
    }

    randomLocation() {
        // choose a random row until one is found with open cols
        // choose a random col until one is found which is open

        let x, y;

        do {
            x = Math.floor(Math.random() * this.size);
        } while(
            !this.map[x].some((row) => !row)
        );

        do {
            y = Math.floor(Math.random() * this.size);
        } while(
            this.map[x][y]
        );

        return [ x, y ];
    }
}
