const Homework = require('../../models/homework')
const mongoose = require('mongoose');


const Totalhomework = async (req, res) => {
    try {
        const homework = await Homework.find({ roomname: req.body.roomname }).sort({ createdAt: -1 })

        return res.status(201).json({
            sucess: true,
            result: homework,
            message: "All Homework find successfully"
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            result: null,
            message: Array.isArray(err.message) ? err.message[0].msg : err.message
        })


    }


}

const studentupload = async (req, res) => {

    try {
        console.log(req.body, "res");
        console.log(req.file, "file");
        let file = req.file.filename

        if (req.user.usertype === 'student') {

            const upload = await Homework.findByIdAndUpdate(req.body.homework_id, { $push: { hworks: [{ work: file, user: req.user._id }] } })

            const pop = await Homework.findById(req.body.homework_id).populate('hworks.user')

            if (upload) {
                return res.status(201).json({
                    success: true,
                    result: pop,
                    message: 'Successfully uploaded the file'

                })
            }
        } else {
            return res.status(404).json({
                success: false,
                result: null,
                message: "unauthorized"
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


module.exports = { studentupload, Totalhomework }