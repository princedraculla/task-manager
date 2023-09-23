const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authController");
const validate = require("../middleware/validation");
const { check } = require("express-validator");

//user registration

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post(
  "/register",
  validate([
    check("name").not().isEmpty().withMessage("username is required!"),
    check("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("pleas enter the correct email!"),
  ]),
  authcontroller.register
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", authcontroller.login_post);

module.exports = router;
