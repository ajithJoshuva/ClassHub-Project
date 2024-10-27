const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const userschema = new mongoose.Schema({

    rollnum: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        enum: ['student', 'faculty'],
        default: 'student'
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userschema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userschema);


