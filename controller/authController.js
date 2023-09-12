const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
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
    res.status(200).send({
      status: "success",
      message: "user registered",
      data: name
    })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};
