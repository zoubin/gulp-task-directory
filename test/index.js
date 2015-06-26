var task = require('..');
var test = require('tape');
var gulp = require('gulp');
var path = require('path');

test('default', function(t) {
    task(fixtures('default'), gulp);
    t.same(Object.keys(gulp.tasks).sort(), [
        '1', '2/3', 'default'
    ]);
    gulp.reset();
    t.end();
})

test('deps', function(t) {
    task(fixtures('deps'), gulp);
    t.same(Object.keys(gulp.tasks).sort(), [
        '1',
        '2',
        '3',
        '4',
        '5/6',
        '5/6/1',
        '5/6/2',
        'default'
    ]);
    t.same(gulp.tasks[1].dep, ['2', '3']);
    t.same(gulp.tasks['default'].dep, ['1']);
    t.same(gulp.tasks['2'].dep, ['3']);
    t.same(gulp.tasks['3'].dep, []);
    t.same(gulp.tasks['4'].dep, []);
    t.same(gulp.tasks['5/6'].dep, ['5/6/1']);
    t.same(gulp.tasks['5/6/1'].dep, ['5/6/2']);
    t.same(gulp.tasks['5/6/2'].dep, []);
    gulp.reset();
    t.end();
})

function fixtures() {
    return path.resolve
        .bind(path, __dirname, 'fixtures')
        .apply(null, arguments);
}
