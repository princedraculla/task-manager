const jwt = require("jsonwebtoken");
require("dotenv").config();

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_AUTH);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
