/*运行webpack ./node_modules/.bin/webpack --config webpack.config.test.js */

var webpack = require("webpack");
var path = require('path');
var srcDir = path.resolve(process.cwd(), 'src');
module.exports = {
    devtool: "#source-map",
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
            /* 创建 import 或 require 的别名，来确保模块引入变得更简单 */
            jquery: srcDir + "/vendor/jquery/jquery-1.7.2.min.js",
            common: srcDir + "/js/common/common.js"
        }
    },
    plugins: [
        /* 有些JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖。 */
        new webpack.optimize.DedupePlugin(),
        /* 解析/压缩/美化所有的js chunk */
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};


