const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const authcontroller = require('../controller/authController')
const validate = require('../middleware/validation')
const {check} = require('express-validator')

//user registration


router.post('/register', validate([
    check('name').not().isEmpty().withMessage('username is required!'),
    check('email').isEmail().not().isEmpty().withMessage('pleas enter the correct email!')
]) ,authcontroller.register);
router.get('/login', authcontroller.login_get);





module.exports = router