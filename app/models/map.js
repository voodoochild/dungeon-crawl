import m from "mithril";

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
    constructor(opts = {}) {
        // TODO: Better way of setting defaults?
        opts.dimensions = opts.dimensions || 20;
        opts.maxTunnels = opts.maxTunnels || 50;
        opts.maxLength  = opts.maxLength  || 8;

        this.map = this.__generate(opts);
    }

    /* eslint max-statements: ["warn", 20] */
    __generate({ dimensions, maxTunnels, maxLength }) {
        const directions = [
            [ -1,  0 ],  // Up
            [  1,  0 ],  // Down
            [  0, -1 ],  // Left
            [  0,  1 ]   // Right
        ];

        let currentRow    = Math.floor(Math.random() * dimensions),
            currentColumn = Math.floor(Math.random() * dimensions),
            map           = create2DArray(1, dimensions),
            lastDirection = [],
            tunnelLength  = 0,
            randomDirection,
            randomLength;

        while(maxTunnels) {
            do {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
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
                    map[currentRow][currentColumn] = 0;
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

        return map;
    }

    render() {
        return m(".map", this.map.map((row) =>
            m(".row", row.map((v) =>
                m(".cell", {
                    class : [
                        "cell",
                        v ? null : "room"
                    ].join(" ")
                }, v)
            ))
        ));
    }
}
