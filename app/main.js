import m from "mithril";

import Map from "./models/map";
import "./lib/game";

m.mount(document.body, {
    oninit : (vnode) => {
        vnode.state.map = new Map();
    },

    view : (vnode) => {
        return vnode.state.map.render();
    }
});
