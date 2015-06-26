
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
