var glob = require('glob');
var path = require('path');
var arrayify = require('arrayify-slice');

module.exports = function taskDir(dir, gulp) {
    var xargs = arrayify(arguments, 1);
    glob.sync('**/default.js', { cwd: dir })
    .forEach(function (file) {
        var creator = require(path.resolve(dir, file));
        if (typeof creator !== 'function') {
            return;
        }
        createTask(path.dirname(file), creator.apply(null, xargs), gulp);
    });
};

function getName(dir, name) {
    if (dir === '.') {
        dir = 'default';
    }
    if (dir === 'default') {
        return name;
    }
    if (name === 'default') {
        return dir;
    }
    return path.join(dir, name);
}

function createTask(scope, task, gulp) {
    if (typeof task === 'function') {
        return gulp.task(getName(scope, 'default'), task)
    }
    if (!task || typeof task !== 'object') {
        return;
    }
    Object.keys(task).forEach(function (name) {
        var args = task[name];

        if (typeof args === 'function') {
            return gulp.task(getName(scope, name), args);
        }

        if (!Array.isArray(args)) {
            return;
        }

        var deps = args[0];
        if (Array.isArray(deps)) {
            // must only depend upon tasks defined in `task`
            args[0] = deps.filter(function (d) {
                return !!task[d];
            })
            .map(function (d) {
                return getName(scope, d + '');
            })
            ;
        }
        gulp.task.apply(gulp, [getName(scope, name)].concat(args));
    });
}
