const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");
const Record = require("../../models/Record");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      username,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/users/update-questions
// @desc     Update user's questions
// @access   Private
router.post("/update-questions", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (req.body.length > 0) {
      user.questions = req.body;

      user.save();

      res.status(200).send(user);
    } else {
      res.status(400).send("Not enough items on the list");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/delete-account
// @desc     Delete Account
// @access   Private
router.delete("/delete-account", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    await Record.deleteMany({ author: user._id });
    await user.remove();

    res.status(200).send("Account Deleted");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
