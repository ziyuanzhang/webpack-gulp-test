/* ./node_modules/.bin/webpack --config webpack.config.test.js */

var webpack = require("webpack");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var srcDir = path.resolve(process.cwd(), 'src');
module.exports = {
    entry: {
        index: ["./src/vendor/jquery/jquery-1.7.2.min.js", "./src/js/index/index.js", "./src/js/common/common.js"],
        home: ["./src/vendor/jquery/jquery-1.7.2.min.js", "./src/js/home/home.js", "./src/js/common/common.js"]
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            jquery: srcDir + "/vendor/jquery/jquery-1.7.2.min.js",
            common: srcDir + "/js/common//common.js"
        }
    },
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};