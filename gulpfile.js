const gulp = require('gulp');
const os = require('os');

const webpack = require('webpack');
const gutil = require('gulp-util');
const config = require('./webpack.config.test.js');

const concat = require('gulp-concat');

const md5 = require('gulp-md5-plus');
const fileinclude = require('gulp-file-include');

const spriter = require('gulp-css-spriter');
const base64 = require('gulp-css-base64');

const cssmin = require('gulp-cssmin');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');
const gulpOpen = require('gulp-open');


var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

//mac chrome: "Google chrome", 
var browser = os.platform() === 'linux' ? 'Google chrome' : (
    os.platform() === 'darwin' ? 'Google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));

//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
    gulp.src(['src/assets/**/*']).pipe(gulp.dest('dist/assets')).on('end', done);
});

//压缩合并css
gulp.task('cssmin1', function (done) {
    gulp.src(['src/css/common/base.css', 'src/css/index/index.css'])
        .pipe(concat('index.css'))
        .pipe(gulp.dest('dist/css/'))
        .on('end', done);
});
gulp.task('cssmin2', function (done) {
    gulp.src(['src/css/common/base.css', 'src/css/home/home.css'])
        .pipe(concat('index.css'))
        .pipe(gulp.dest('dist/css/'))
        .on('end', done);
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖 webpack:build-js
gulp.task('md5:js', ['webpack:build-js'], function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/html/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
});
//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
    gulp.src('dist/css/*.css')
        .pipe(md5(10, 'dist/html/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/html'))
        .on('end', done);
    // .pipe(connect.reload())
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:images', 'cssmin1','cssmin2'], function (done) {
    var timestamp = +new Date();
    gulp.src('dist/css/*.css')
        .pipe(spriter({
            spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

gulp.task('clean', function (done) {
    gulp.src(['dist'])
        .pipe(clean())
        .on('end', done);
});

gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['cssmin1','cssmin2', 'webpack:build-js', 'fileinclude'])
        .on('end', done);
});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/api',  {
                    target: 'http://localhost:8080',
                    changeOrigin:true
                }),
                proxy('/v1', {
                    target: 'https://api.digitalriver.com',
                    changeOrigin:true
                    
                }) 
            ]
        }
    });
});
gulp.task("closeServe",function(){
    connect.serverClose();
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/html'
        }))
        .on('end', done);
});

//调用并执行webpack
gulp.task('webpack:build-js', function (callback) {
    webpack(config).run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:build-js', err);
        }
        gutil.log('[webpack:build-js]', stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('default', ['connect', 'fileinclude', 'md5:css', 'md5:js', 'open']);

//开发
gulp.task('dev', ['connect', 'copy:images', 'fileinclude', 'cssmin1','cssmin2', 'webpack:build-js', 'watch', 'open']);



