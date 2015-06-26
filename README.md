# gulp-task-directory
Create gulp task according to directory or object structure

## Usage

```javascript
var taskDir = require('gulp-task-directory');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var root = __dirname;

taskDir(__dirname + '/default', gulp, plugins, root);

console.log(gulp.tasks);
```

### Structure of `default` directory

```
⌘ tree example/default
example/default
├── 1
│   └── default.js
├── 2
│   └── 3
│       └── default.js
├── 4
│   └── default.js
└── default.js
```

### Contents of all `default.js` files

```javascript
module.exports = function (gulp, plugins, root) {
    return function (done) {
        done()
    }
}
```

### output

```javascript
⌘ node example/default.js
{ '1': { fn: [Function], dep: [], name: '1' },
  '4': { fn: [Function], dep: [], name: '4' },
  '2/3': { fn: [Function], dep: [], name: '2/3' },
  default: { fn: [Function], dep: [], name: 'default' } }
```

## Specify deps

In `default.js`, you can specify more than one tasks, with dependencies.

However, all dependencies must be tasks specified in the current `default.js`.

```javascript
var taskDir = require('gulp-task-directory');
var gulp = require('gulp');

taskDir(__dirname + '/deps', gulp);

console.log(gulp.tasks);
```

### Structure of `deps` directory

```
⌘ tree example/deps
example/deps
├── 4
│   └── default.js
└── default.js
```

### Contents of `4/default.js`

```javascript
module.exports = function (gulp) {
    return function (done) {
        done()
    }
}
```

### Contents of `default.js`

* It returns an object rather than a task callback.
* Each key-value specifies a task.
* Task `2` says it depedends on task `3` and `4`, but `4` is not specifed in this `default.js`, so it will be ignored, and the `dep` of task `2` will be `['3']`
* Dependencies are specified using keys of the returned object.


```javascript
module.exports = function (gulp) {
    return {
        default: [[1]],
        1: [[2,3], dummy],
        2: [[3,4], dummy],
        3: dummy,
    }
}

function dummy(done) {
    done()
}
```

### Output

```
⌘ node example/deps.js
{ '1': { fn: [Function: dummy], dep: [ '2', '3' ], name: '1' },
  '2': { fn: [Function: dummy], dep: [ '3' ], name: '2' },
  '3': { fn: [Function: dummy], dep: [], name: '3' },
  '4': { fn: [Function], dep: [], name: '4' },
  default: { fn: [Function], dep: [ '1' ], name: 'default' } }
```

## taskDir(dir, gulp, xarg1, xarg2,...)

* `dir`. Each `default.js` in `dir` will be treated as a task creator, which should return either a callback, or an object specifying gulp tasks through key-value.
* `gulp`. The `gulp` instance
* `xarg1,xarg2,...`. All creator functions will be called using `gulp, xarg1, xarg2, ...`.
