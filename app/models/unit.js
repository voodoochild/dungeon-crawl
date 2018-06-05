import m from "mithril";

export default class Unit {
    constructor(opts) {
        [ this.x, this.y ] = opts.location;
    }

    move(direction) {
        const [ x, y ] = direction;

        let [ oldX, oldY ] = [ this.x, this.y ],
            newX = oldX += x,
            newY = oldY += y;

        if(
            newX >= 0 && newX < window.game.map.size &&
            newY >= 0 && newY < window.game.map.size &&
            !window.game.map.map[newX][newY]
        ) {
            this.x = newX;
            this.y = newY;
            m.redraw();
        }
    }
}
