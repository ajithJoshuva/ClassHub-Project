const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const roomschema = new mongoose.Schema({

    roomname: {
        type: String,
        required: true
    },
    invitecode: {
        type: String,
        required: true
    },
    roomhead: {
        type: Number,
    },
    users: {
        type: Array, ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

roomschema.plugin(mongoosePaginate);

module.exports = mongoose.model('Room', roomschema);


