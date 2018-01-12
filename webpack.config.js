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
    /*cache：webpack构建的过程中会生成很多临时的文件，打开cache可以让这些临时的文件缓存起来，从而更快的构建*/
    cache: true,
    /*devtools：SourceMap选项，便于开发模式下调试*/
    devtool: "#source-map",
    entry: /* getEntry(), */
        {
            index: ["./src/vendor/jquery/jquery-1.7.2.min.js", "./src/js/index/index.js", "./src/js/common/common.js"],
            home: ["./src/vendor/jquery/jquery-1.7.2.min.js", "./src/js/home/home.js", "./src/js/common/common.js"]
        },
    output: {
        path: path.join(__dirname, "dist/js/"),
        publicPath: "dist/js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        alias: {
            /* 模块别名,创建 import 或 require 的别名，来确保模块引入变得更简单 */
            jquery: srcDir + "/vendor/jquery/jquery-1.7.2.min.js"
            /* core: srcDir + "/js/core",
            ui: srcDir + "/js/ui" */
        }
    },
    /* plugins：webpack的一些内置功能均是以插件的形式提供。 */
    plugins: [
        /* 有些JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖。 */
        new webpack.optimize.DedupePlugin(),
        new CommonsChunkPlugin('common.js'),
        /* 解析/压缩/美化所有的js chunk */
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};