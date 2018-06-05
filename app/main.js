import m from "mithril";

import Map from "./models/map";
import Unit from "./models/unit";
import { directions } from "./lib/constants";

import "./lib/game";

function resetGame() {
    const map = new Map();

    window.game.map = map;
    window.game.player = new Unit({ location : map.spawn });
    window.game.enemies = [];
}

m.mount(document.body, {
    oninit : () => {
        resetGame();

        document.body.addEventListener("keydown", (e) => {
            let direction;

            switch(e.key) {
                case "ArrowUp":
                    direction = directions.north;
                    break;
                case "ArrowDown":
                    direction = directions.south;
                    break;
                case "ArrowLeft":
                    direction = directions.west;
                    break;
                case "ArrowRight":
                    direction = directions.east;
                    break;
                default:
                    // Do nothing
            }

            if(direction) {
                window.game.player.move(direction);
            }
        });
    },

    view : () => {
        const map = window.game.map;
        const player = window.game.player;
        const enemies = window.game.enemies;

        function hasPlayer(x, y) {
            return player && x === player.x && y === player.y;
        }

        function hasEnemy(x, y) {
            if(!enemies.length) {
                return false;
            }

            return enemies.some((e) => e.x === x && e.y === y);
        }

        return m(".game",
            m(".map", map.map.map((row, x) =>
                m(".row", row.map((v, y) =>
                    m(".cell", {
                        class : [
                            "cell",
                            v ? null : "room",
                            hasPlayer(x, y) ? "player" : null,
                            hasEnemy(x, y) ? "enemy" : null,
                            hasPlayer(x, y) && hasEnemy(x, y) ? "ruhroh" : null
                        ].join(" ")
                    }, v)
                ))
            )),

            m("button", { onclick : resetGame }, "Reset"),
            m("button", {
                onclick : () => {
                    window.game.enemies.push(
                        new Unit({ location : map.randomLocation() })
                    );
                }
            }, "Spawn enemy")
        );
    }
});
