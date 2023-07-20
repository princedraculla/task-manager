const prisma = require("../prisma/client");

const createPost = async (req, res) => {
  const { title, content, email } = req.body;
  try {
    const createdPost = await prisma.post.create({
      data: {
        connect: { email: email },

        title: title,
        content: content,
      },
    });
    res.status(200).json(createdPost);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  createPost,
};
