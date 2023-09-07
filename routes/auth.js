const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const prisma = require('../prisma/client')


//user registration

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


// User login

router.post('/login', async (req, res) => {
    trt
})