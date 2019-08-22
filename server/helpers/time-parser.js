module.exports = {
    encoded: (time) => {
        return new Date(time).toISOString().slice(11, -1)
    },
    decoded: (time) => {

    }
}