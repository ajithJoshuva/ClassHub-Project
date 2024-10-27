const { setuserinfo } = require('./setuserinfo');
const jwt = require('jsonwebtoken');




const jwttokenreturn = async (user = {}) => {
    const setuser = await setuserinfo(user)

    return new Promise((resolve, reject) => {

        try {

            console.log("jwt");
            const expiration = Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES

            console.log("done");

            resolve({
                token: jwt.sign(
                    {
                        data: {
                            _id: user._id
                        },
                        exp: expiration
                    },
                    process.env.JWT_SECRET),

                user: setuser
            })

        } catch (error) {
            reject(error)
        }

    })

}

module.exports = { jwttokenreturn }