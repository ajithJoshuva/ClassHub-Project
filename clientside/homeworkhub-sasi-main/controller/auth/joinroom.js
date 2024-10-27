const mongoose = require('mongoose');
const User = require('../../models/users')
const Room = require('../../models/Room')




const joinroom = async (req, res) => {

    try {

        const room = await Room.findOne({ invitecode: req.body.invitecode });
        console.log(room, "room");

        if (room) {

            const already = await Room.findOne({
                users: {
                    "$elemMatch": {
                        "$in": mongoose.Types.ObjectId(req.user._id)
                    }
                }
            })
            if (already) {
                return res.status(404).json({
                    success: false,
                    result: "null",
                    message: "User already joined this room"
                })


            } else {
                const user = await User.findOne({ rollnum: req.user.rollnum })

                if (user) {

                    await Room.update({ invitecode: req.body.invitecode }, { $push: { users: user._id } })

                    return res.status(200).json({
                        success: true,
                        result: "null",
                        message: 'Successfully Joined to the room ${room.name}'
                    })
                }
            }
        } else {

            return res.status(404).json({
                success: false,
                result: "null",
                message: "Room not found"
            })

        }

    } catch (err) {

        return res.status(500).json({
            success: false,
            result: "null",
            message: Array.isArray(err.message) ? err.message[0].msg : err.message
        })

    }



}


module.exports = { joinroom }