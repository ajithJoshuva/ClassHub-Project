const User = require('../../models/users');
const bcrypt = require('bcrypt');
const { jwttokenreturn } = require('../auth/helpers/jwttokenreturn');

const login = async (req, res) => {
    try {
        const { rollnum, password } = req.body;

        const user = await User.findOne({ rollnum: rollnum });
        console.log(user, "user");
        if (user) {
            const compare = await bcrypt.compare(password, user.password)
            if (compare) {
                const result = await jwttokenreturn(user)

                return res.status(200).json(
                    {
                        success: "true",
                        result: result,
                        message: "Successfully Login"
                    })
            } else {
                res.status(400).json({
                    success: "false",
                    result: "null",
                    message: "password incorrect"
                })
            }
        } else {
            res.status(400).json({
                success: "false",
                result: "null",
                message: "user doesn't exist"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: "false",
            result: "null",
            message: Array.isArray(err.message) ? err.message[0].msg : err.message
        });
    }
};





module.exports = { login };