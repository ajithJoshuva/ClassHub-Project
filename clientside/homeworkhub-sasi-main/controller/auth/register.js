const { matchedData } = require('express-validator')
const User = require('../../models/users')
const bcrypt = require('bcrypt')

const saltRounds = 10;

const register = async (req, res) => {
    try {

        req = matchedData(req)
        console.log(req, "req");

        const alreadyroll = await User.findOne({ rollnum: req.rollnum })
        console.log(alreadyroll, "al");
        if (!alreadyroll) {
            const hash = await bcrypt.hash(req.password, saltRounds)

            const user = new User({
                rollnum: req.rollnum,
                name: req.name,
                usertype: req.usertype,
                phone: req.phone,
                password: hash
            })

            const saveduser = await user.save();

            return res.status(201).json({
                success: true,
                result: saveduser,
                message: "Successfully Registered"
            })

        } else {
            return res.status(400).json({
                success: false,
                result: null,
                message: 'Roll Number Already Exists'
            })


        }

    } catch (err) {
        res.status(500).json({
            success: false,
            result: null,
            message: Array.isArray(err.message) ? err.message[0].msg : err.message
        })
    }

}





module.exports = { register }; 