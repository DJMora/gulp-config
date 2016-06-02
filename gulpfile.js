var config = {},
    project = 'kinkmarket', //Current project name
    stack = 'py', //Current stack
    stacks = ['wp','py','js'];
    
var gulp = require('gulp'),
    gp_less = require('gulp-less'), // compiles less to CSS
    gp_minify = require('gulp-minify-css'), // minifies CSS
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    gp_notify = require('node-notifier') // minifies JS
    
var paths = {
    'wp':{
        'dev': {
            'less': './wp-content/themes/'+project+'/less/'
        },
        'assets': {
            'css': './wp-content/themes/'+project+'/css/',
            'root': './wp-content/themes/'+project+'/',
            'js': './wp-content/themes/'+project+'/js/',
            'vendor': './wp-content/themes/'+project+'/vendor/'
        },
        'misc':{
            'title':'Wordpress site detected'
        }
    },
    
    'py':{
        'dev': {
            'less': './'+ project + '/static'+'/less/'
        },
        'assets': {
            'css': './'+ project +'/static'+'/css/',
            'root': './'+ project +'/static/',
            'js': './'+ project +'/static' + '/js/',
            'vendor': './'+ project + '/static'+'/vendor/',
            'foundation': './'+ project + '/static'+'/vendor/' + 'foundation-sites/dist/foundation.min.css' 
        },
        'misc':{
            'title':'Python app detected'
        }
    },
    
    'js':{
        'dev': {
            'less': './static'+'/less/'
        },
        'assets': {
            'css': './static'+'/css/',
            'root': './static/',
            'js': './static' + '/js/',
            'vendor': './vendor/',
            'foundation': './vendor/' + 'foundation-sites/dist/foundation.min.css' 
        },
        'misc':{
            'title':'Angular JS app detected'
        }
    }
};

config = (stack) => {
    switch(stack){
        case stacks[0]:
            return paths.wp;
        case stacks[1]:
            return paths.py;
        case stacks[2]:
            return paths.js;
        default: break;
    }
}

gulp.task('compileLess', function(){
    "use strict";
    let conf = config(stack);
    return gulp.src([conf.less + 'app.less'])
            .pipe(gp_less()) 
            .pipe(gulp.dest(conf.assets.css))
            .pipe(minify({keepSpecialComments:0}))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(conf.assets.css));
});

gulp.task('mashUpCss', function(){
    "use strict";
    let conf = config(stack); 
    console.log(conf);
    return gulp.src([conf.assets.css + 'app.css',conf.assets.foundation])
            .pipe(gp_concat('app.css'))
            .pipe(gulp.dest(conf.assets.css))
            .pipe(gp_minify({keepSpecialComments:0}))
            .pipe(gp_rename({suffix: '.min'}))
            .pipe(gulp.dest(conf.assets.css));           
});

gulp.task('watch', function(){
    "use strict";
    let conf = config(stack);
    gulp.watch(conf.dev.less + '/*.less', ['compileLess']);
    gp_notify.notify({ title: 'LESS changes detected', message: 'Compilation done' })
});


gulp.task('default', ['mashUpCss'],function(){
    "use strict";
    let conf = config(stack); 
    gp_notify.notify({ title: conf.misc.title, message: 'Done building' })
});