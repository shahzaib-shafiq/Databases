const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const {body, validationResult}= require("express-validator");

router.post("/auth",[
    body('email').isEmail().withMessage('Enter Email'),
    body('name').isLength({ min: 3 }).withMessage('Enter Name'),
    body('password').isLength({ min: 5 }).withMessage('Enter Password(5 Chracters Min)'),

],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user));
});

module.exports = router;
