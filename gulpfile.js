//gulpfile.js

var theme = "";

// --- INIT
var gulp = require('gulp'),
    less = require('gulp-less'), // compiles less to CSS
    minify = require('gulp-minify-css'), // minifies CSS
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'); // minifies JS

// Paths variables
var paths = {
    'dev': {
        'less': './wp-content/themes/'+theme+'/less/'
    },
    'assets': {
        'css': './wp-content/themes/'+theme+'/css/',
        'root': './wp-content/themes/'+theme+'/',
        'js': './wp-content/themes/'+theme+'/js/',
        'vendor': './wp-content/themes/'+theme+'/vendor/'
    }

};

// --- TASKS

// Auth CSS
gulp.task('compile', function(){
    return gulp.src([paths.dev.less + 'index.less'])
        .pipe(less())
        .pipe(gulp.dest(paths.assets.css))
        .pipe(minify({keepSpecialComments:0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.assets.css));
});

gulp.task('compile-css', function(){
    return gulp.src([paths.dev.less + 'index.less', paths.dev.less + 'single.less'])
        .pipe(less())
        .pipe(gulp.dest(paths.assets.css))
        .pipe(minify({keepSpecialComments:0}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.assets.css))
});

// --- WATCH

gulp.task('watch', function(){
    gulp.watch(paths.dev.less + '/*.less', ['compile-css']);
});

gulp.task('simple-watch', function(){
    gulp.watch(paths.dev.less + '/*.less', ['compile']);
});

// --- DEFAULT
if(theme == 'DMO'){
    gulp.task('default', ['compile-css', 'watch']);

}else{
    gulp.task('default', ['compile', 'simple-watch']);
}
