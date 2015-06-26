
module.exports = function (gulp) {
    return {
        default: [[1]],
        1: [[2], dummy],
        2: dummy,
    }
}

function dummy(done) {
    done()
}
