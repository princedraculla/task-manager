const prisma = require("../prisma/client");

const showAllPosts = async (req, res) => {
  const { role } = req.body;
  if (role === "Admin") {
    try {
      const allPosts = await prisma.post.findMany();
      res.status(200).json(allPosts);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else res.json({ msg: "Users not Allowed" });
};

const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        User: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteOnePostUser = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: Number(postId),
        authorId: Number(req.params.id),
      },
    });

    if (!post) {
      res.status(404).send("post not found or not owned by user");
      return;
    }

    const result = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updateAllPost = async (req, res) => {
  const { authorId, title, content } = req.body;
  try {
    const result = await prisma.post.updateMany({
      where: {
        authorId: Number(authorId),
      },
      data: {
        title: title,
        content: content,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const updatePost = async (req, res) => {
  const { newTitle, newContent, postId, authorId } = req.body;
  try {
    const result = await prisma.user.update({
      where: {
        id: Number(authorId),
      },
      data: {
        Post: {
          update: {
            where: {
              id: Number(postId),
            },
            data: {
              title: newTitle,
              content: newContent,
            },
          },
        },
      },
      include: {
        Post: true,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  createPost,
  showAllPosts,
  updateAllPost,
  updatePost,
  deleteOnePostUser,
};
