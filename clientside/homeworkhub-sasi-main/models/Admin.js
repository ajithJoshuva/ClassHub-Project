
const mongoose = require('mongoose')

const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const AdminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            validate: {
                validator: validator.isEmail,
                message: 'EMAIL_IS_NOT_VALID'
            },
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },

        twofa: {
            type: String,
            enum: ['google', 'email', 'mobile', null],
            default: null
        },
        role: {
            type: String,
            enum: ['superadmin', 'admin'],
            default: 'Admin'
        },
        verification: {
            type: String,
            select: false
        },
        verified: {
            type: Boolean,
            default: false
        },
        phone: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        loginAttempts: {
            type: Number,
            default: 0,
            select: false
        },
        blockExpires: {
            type: Date,
            default: Date.now,
            select: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

AdminSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Admin', AdminSchema)