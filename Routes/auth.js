const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post("/createuser", [
  body('email').isEmail().withMessage('Enter Email'),
  body('name').isLength({ min: 3 }).withMessage('Enter Name'),
  body('password').isLength({ min: 5 }).withMessage('Enter Password (5 Characters Min)'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check whether user with this email already exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "A user with this email already exists" });
    }

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating the user" });
  }
});

module.exports = router;
