const express = require("express");
const router = express.Router();
const { addUser, updateUser, findAllUser, findUserById, addAdmin } = require("./controller/userController")

router.post('/add-admin', addAdmin);
router.post('/add', addUser);
router.patch('/update/:id', updateUser);
router.get('/user-list', findAllUser);
router.get('/user/:id', findUserById);

module.exports = router;