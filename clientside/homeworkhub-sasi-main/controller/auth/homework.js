const homework = require('../../models/homework')


const Homework = async (req, res) => {

    try {

        console.log(req.user.usertype);

        if (req.user.usertype === 'faculty') {

            const hm = await new homework({
                roomname: req.body.roomname,
                subname: req.body.subname,
                subdis: req.body.subdis,
                upload: req.body.upload,
                faculty_id: req.user._id

            })

            const newhomework = await hm.save()

            return res.status(201).json({
                success: true,
                result: newhomework,
                message: "Successfully Homework Posted"
            })


        } else {
            return res.status(404).json({
                success: false,
                result: "null",
                message: "Student not allowed to Post Homework"
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



const facultyhomework = async (req, res) => {
    try {

        if (req.user.usertype === 'faculty') {

            const find = await homework.find({ $and: [{ faculty_id: req.user._id, roomname: req.body.roomname }] }).sort({ createdAt: -1 })
            console.log(find, "find");
            if (find) {
                return res.status(201).json({
                    success: true,
                    result: find,
                    message: "Successfully Fetched Faculty Homeworks"
                })
            } else {
                return res.status(404).json({
                    success: false,
                    result: null,
                    message: "Faculty doesnt posted any homework"
                })

            }


        } else {
            return res.status(404).json({
                success: false,
                result: 'null',
                message: "Student cant access the facultyhomework"
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

module.exports = { Homework, facultyhomework }