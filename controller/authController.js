const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//creating function for token

const creatingToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: 60 * 60 * 24 * 5,
  });
};

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
        email: hashedEmail,
      },
    });

    const token = creatingToken(createUser.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 5,
    });
    res.status(200).send({
      status: "success",
      message: "user registered",
      data: name,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
//login user post method
module.exports.login_post = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: name,
      },
    });
    if (user) {
      const auth = await bcrypt.compare(email, user.email);
      if (auth) {
        const token = jwt.sign(
          { user: user.name },
          process.env.SECRET_JWT,
          { algorithm: "HS256" },
          { expiresIn: 60 * 60 * 24 * 5 }
        );
        res.status(200).send({
          status: "success",
          message: "user loged in",
          data: { token },
        });
      }
      throw Error("incorrect email");
    }
    throw Error("user not exist");
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
