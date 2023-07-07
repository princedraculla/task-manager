const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const addedUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req,res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json(deletedUser)
  } catch (error) {
      res.status(400).json({ msg: error.message })
  }
}

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        email: email,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const addAdmin = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const addedAdmin = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: role,
      },
    });
    res.status(200).json(addedAdmin);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


const changeRole = async (req,res) => {
  const { role } = req.body;
  try {
    const changedRole = await prisma.user.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        role: role
      }
    });
    res.status(200).json(changedRole)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}


const findAllUser = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const uniqueUser = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(uniqueUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  findAllUser,
  findUserById,
  addAdmin,
  changeRole
};
