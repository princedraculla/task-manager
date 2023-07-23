const express = require("express");
const router = express.Router();
const { addUser, updateUser, deleteUser, findAllUser,
     findUserById, addAdmin, changeRole } = require("../controller/userController");

const { createPost, showAllPosts, updateAllPost, updatePost, deleteOnePostUser } = require('../controller/postController')


router.post('/add-admin', addAdmin);
router.post('/add', addUser);
router.patch('/update/:id', updateUser);
router.get('/user-list', findAllUser);
router.get('/user/:id', findUserById);
router.delete('/user/:id', deleteUser);
router.patch('/user/role/:id', changeRole)


router.post('/user/post/add', createPost)
router.get('/user/post/all', showAllPosts)
router.put('/user/post/update/all/:id', updateAllPost)
router.patch('/user/post/update/:id', updatePost)
router.delete('/user/post/delete/:id', deleteOnePostUser)


module.exports = router;