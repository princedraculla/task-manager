const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const prisma = require('../prisma/client')
const authcontroller = require('../controller/authController')


//user registration


router.get('/signup', authcontroller.signup_get);
router.get('/login', authcontroller.login_get);

router.post('/register', async(req, res) => {
    try {
        const {name, email} = req.body;
        const hashedEmail = await bcrypt.hash(email,10);

        const result = await prisma.user.create({
            data: {
                name: name,
                email: hashedEmail,
            },
        });
        res.status(201).json({message: `${result.name} registered successfully`});
    } catch (error) {
        res.status(500).json({msg: error.message})
        
    }
} );




module.exports = router