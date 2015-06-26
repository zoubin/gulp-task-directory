var taskDir = require('..');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var root = __dirname;

taskDir(__dirname + '/default', gulp, plugins, root);

console.log(gulp.tasks);
