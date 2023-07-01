const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

 const addUser = async (req,res) => {
    const { name, email } = req.body;
    try {
        const addedUser = await prisma.user.create({
            data: {
                name: name,
                email: email
            }
        })
        res.status(201).json(addedUser)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports = {
    addUser
}
