const Room = require('../../models/Room')
const User = require('../../models/users')
const mongoose = require('mongoose')

const myroom = async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.user._id })
        console.log(user, "users");

        if (!user) {
            return res.status(401).json({
                sucess: false,
                result: "null",
                message: "User not found"
            })

        } else {

            const rooms = await Room.find({ $or: [{ users: {
                "$elemMatch": {
                    "$in": mongoose.Types.ObjectId(req.user._id)
                }
            }},{roomhead: req.user.rollnum }]}).populate("users")
            
            console.log(rooms, "rooms");

            return res.status(201).json({
                sucess: true,
                result: rooms,
                message: "User room fetched successfully"
            })


        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            result: null,
            message: Array.isArray(err.message) ? err.message[0].msg : err.message
        })

    }
}

module.exports = { myroom };