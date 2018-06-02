export default {
    input   : "app/main.js",
    plugins : [
        require("rollup-plugin-includepaths")({
            paths      : [ "app" ],
            extensions : [ ".js", ".css" ]
        }),
        require("rollup-plugin-node-resolve")({ ignoreGlobal : true }),
        require("rollup-plugin-commonjs")(),
        require("rollup-plugin-buble")()
    ],
    output : {
        file   : "app/gen/bundle.js",
        format : "iife"
    }
};
