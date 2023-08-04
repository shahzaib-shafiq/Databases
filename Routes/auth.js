const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET='Harryisagoodb$oy'

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

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt); // Declare secPass using 'const' or 'let'

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data={
      id:user.id
    }

    
    const authtoken=jwt.sign(data,JWT_SECRET);
    // console.log(jwtData)
   
    // res.json(user);
    res.json({authtoken});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating the user" });
  }
});

module.exports = router;
