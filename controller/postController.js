const prisma = require("../prisma/client");



const showAllPosts = async (req, res) => {
  const { role } = req.body
  if(role === "Admin"){
    try {
      const allPosts = await prisma.post.findMany()
      res.status(200).json(allPosts)
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }else res.json({msg: "Users not Allowed"})
}

const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        User: {
          connect: {
            id: authorId
          }
        }
      }
    });
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
};


const updatePost = async (req, res) => {
  const { email, title, content } = req.body

  try {
    
  } catch (error) {
    
  }
}

module.exports = {
  createPost,
  showAllPosts,
};
