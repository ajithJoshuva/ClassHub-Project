const Room = require('../../models/Room');
const crypto = require("crypto");


const createroom = async (req, res) => {
    try {

        const invitecodes = crypto.randomInt(1000, 9000);

        if (req.user.usertype === 'faculty') {

            const room1 = await Room.findOne({ roomname: req.body.roomname });
            if (!room1) {

                const room = await new Room({

                    roomname: req.body.roomname,
                    invitecode: invitecodes,
                    roomhead: req.user.rollnum

                })

                const savedroom = await room.save();

                return res.status(201).json({
                    success: true,
                    result: savedroom,
                    message: "Successfully Registered"
                })
            } else {

                return res.status(400).json({
                    success: false,
                    result: "null",
                    message: "Room already exists"
                })
            }

        } else {

            return res.status(404).json({
                success: false,
                result: "null",
                message: "Student not allowed to create room"
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


module.exports = { createroom }