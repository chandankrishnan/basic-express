var mongoose = require('mongoose');

var state = {
        db: null,
    },
    url = 'mongodb://localhost:27071/sp';

module.exports = {
    connect: function(cb) {
        if (state.db) {
            cb();
        } else {
            state.db = mongoose.connect(url);
            cb();
        }
    },
    lib: function() {
        return mongoose;
    },

    get: function() {
        return state.db;
    },

    close: function(done) {
        if (state.db) {
            state.db.close(function(err, result) {
                state.db = null
                state.mode = null
                done(err)
            })
        }
    }
}
