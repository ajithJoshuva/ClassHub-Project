const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const homeworkschema = new mongoose.Schema({
    roomname: {
        type: String,
        required: true
    },
    subname: {
        type: String,
        required: true
    },
    subdis: {
        type: String,
        required: true
    },
    upload: {
        type: Boolean,
    },
    hworks: [{ work: String, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],

    faculty_id: {
        type: String, ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

homeworkschema.plugin(mongoosePaginate);

module.exports = mongoose.model('Homework', homeworkschema);