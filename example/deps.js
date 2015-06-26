var taskDir = require('..');
var gulp = require('gulp');

taskDir(__dirname + '/deps', gulp);

console.log(gulp.tasks);
