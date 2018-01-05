/* ./node_modules/.bin/webpack --config webpack.config.js */

var webpack = require("webpack");
module.exports = {
    entry: {
        index: ["./src/vendor/jquery/jquery-1.7.2.min.js", "./src/js/index/index.js", "./src/js/common/common.js"],
        home: ["./src/vendor/jquery/jquery-1.7.2.min.js", "./src/js/home/home.js", "./src/js/common/common.js"]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};