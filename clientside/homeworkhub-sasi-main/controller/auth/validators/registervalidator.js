const { check } = require('express-validator')
const { validationResult } = require('express-validator')


const validateregister = [

    check('rollnum')
        .exists()
        .withMessage('ROLL NUMBER MISSING')
        .not()
        .isEmpty()
        .withMessage('please enter rollnumber')
        .isLength({ min: 7, max: 7 })
        .withMessage('must be at least 7 chars long'),


    check('name')
        .exists()
        .withMessage('name is required')
        .not().isEmpty()
        .withMessage("please enter a name")
        .matches(/^[A-Za-z ]+$/)
        .withMessage('name invalid format'),

    check('phone')
        .exists()
        .withMessage('Phone number MISSING')
        .not()
        .isEmpty()
        .withMessage('please enter phone number')
        .isLength({ min: 10, max: 10 })
        .withMessage('number must be in 10 digits'),

    check('usertype')
        .exists()
        .withMessage('usertype is missing')
        .not()
        .isEmpty()
        .withMessage('please enter usertype'),

    check('password')
        .exists()
        .withMessage('PASSWORD MISSING')
        .not()
        .isEmpty()
        .withMessage('please enter password')
        .matches(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$)+/)
        .withMessage('Password must be a minimum 8 characters & Maximum 16 characters.At least one lowercase,At least one uppercase,At least one digit and At least it should have 8 characters long.Eg: Abcd1234')
        .isLength({
            min: 8
        })
        .withMessage('password must be atleast 8 characters'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                result: null,
                message: errors.array().map(error => error.msg)
            });
        }
        next();
    }


]

module.exports = { validateregister }