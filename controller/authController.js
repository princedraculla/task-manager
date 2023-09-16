const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()


// error handler for validation


const handelErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {name: '', email: ''}

  //duplicate error
  if(err.code === 11000){
    errors.email = 'that email already used';
    return errors
  };
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors
}

//creating function for token

const creatingToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn:  60 * 60 * 24 * 5
  })
}


module.exports.register = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: req.body.name,
      },
    });
    if (user) {
      return res.status(400).send({
        status: "error",
        message: "you are already registerd pleas login",
        data: null,
      });
    }
    const { name, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedEmail = await bcrypt.hash(email, salt);
    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: hashedEmail
      },
    });

    const token = creatingToken(createUser.id)
    res.cookie('jwt',token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 5})
    res.status(200).send({
      status: "success",
      message: "user registered",
      data: name
    })
  } catch (error) {
      const errors  = handelErrors(error);
      res.status(400).json({ errors })
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};
