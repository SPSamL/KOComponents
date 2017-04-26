/// <binding BeforeBuild='js:bundle, less:compile' ProjectOpened='watch:app' />
var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var ts = require('gulp-typescript');
var merge = require('merge2');
var path = require('path');
var clean = require('gulp-clean');

//var tsProject = ts.createProject('tsconfig.json', { out: 'OSD.DoDCTS.Hearings.bundle.js', declaration: true });
var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', ['ts:declarations']);
gulp.task('ts:declarations', function () {
    var tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done.
        tsResult.dts.pipe(gulp.dest('custom_typings')),
        tsResult.js.pipe(gulp.dest('test/js'))
    ]);
});

gulp.task('watch:app', function () {
    // If any js or html files change, rebundle the js files
    gulp.watch(['App/**/*.html', 'App/**/*.ts'], ['js:bundle']);

    // If the less files change, rebundle the css
    gulp.watch(['Styles/**/*.less'], ['less:compile']);
});

gulp.task('build', ['js:bundle', 'less:compile']);

gulp.task('js:bundle', ['build:ts', 'build:html'], function () {
    return gulp.src('./build/Config.js')
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('./Layouts/Larko.SharePoint.KOComponents'));
});

gulp.task('build:ts', ['build:clean'], function () {
    var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('build:html', ['build:clean'], function () {
    return gulp.src("App/**/*.html")
      .pipe(gulp.dest('build'));
});

gulp.task('build:clean', function () {
    return gulp.src('build', { read: false })
        .pipe(clean());
});

gulp.task('less:bootstrap', function () {
    return gulp.src('./Styles/bootstrap.less')
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('less:compile', ['less:bootstrap'], function () {
    return gulp.src('./Styles/bundle.less')
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('build'))
        //.pipe(cleanCss())
        .pipe(concat('OSD.DoDCTS.Hearings.min.css'))
        .pipe(gulp.dest('./Modules/Larko_SharePoint_KOComponent_Content/css/'));
});

gulp.task('less', ['less:compile']);

gulp.task('default', ['build']);
