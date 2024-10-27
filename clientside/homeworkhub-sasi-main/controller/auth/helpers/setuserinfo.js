

const setuserinfo = (req = {}) => {
    return new Promise((resolve, reject) => {

        let user = {
            _id: req._id,
            rollnum: req.rollnum,
            name: req.name,
            usertype: req.usertype

        }

        resolve(user);
    });

}

module.exports = { setuserinfo }