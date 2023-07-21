const express = require("express");
const router = express.Router();
const { addUser, updateUser, deleteUser, findAllUser,
     findUserById, addAdmin, changeRole } = require("../controller/userController");

const { createPost, showAllPosts } = require('../controller/postController')


router.post('/add-admin', addAdmin);
router.post('/add', addUser);
router.patch('/update/:id', updateUser);
router.get('/user-list', findAllUser);
router.get('/user/:id', findUserById);
router.delete('/user/:id', deleteUser);
router.patch('/user/role/:id', changeRole)


router.post('/user/post/add', createPost)
router.get('/user/post/all', showAllPosts)


module.exports = router;