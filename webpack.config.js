/* ./node_modules/.bin/webpack --config webpack.config.js */

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
/*
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}
*/
module.exports = {
    cache: true,
    devtool: "#source-map",
    entry: /* getEntry(), */
    {
        index:["./src/vendor/jquery/jquery-1.7.2.min.js","./src/js/index/index.js","./src/js/common/common.js"],
        home:["./src/vendor/jquery/jquery-1.7.2.min.js","./src/js/home/home.js","./src/js/common/common.js"]
    },
    output: {
        path: path.join(__dirname, "dist/js/"),
        publicPath: "dist/js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        alias: {
            jquery: srcDir + "/vendor/jquery/jquery-1.7.2.min.js"
            /* core: srcDir + "/js/core",
            ui: srcDir + "/js/ui" */
        }
    },
    plugins: [
        new CommonsChunkPlugin('common.js'),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};