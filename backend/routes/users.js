const express = require("express");
const { User } = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Blacklist } = require("../models/blacklist.model");
const verify = require("../middleware/verifyToken");

router.get("/", verify, (req, res) => {
  User.find()
    .then((result) => {
      let data = result.filter((e) => {
        let id = JSON.stringify(e._id);
        // Brise navodnike nakon JSON.stringify
        id = id.replace(/\"/g, "");
        return id !== req.user.id;
      });
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", verify, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((result) => res.json("Deleted"))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", verify, (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    lokacija: req.body.lokacija,
  })
    .then((result) => res.json("Updated"))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:id", verify, (req, res) => {
  User.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.post("/register", verify, (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    lokacija: req.body.lokacija,
  });
  user
    .save()
    .then((result) => {
      delete result.passwordHash;
      res.json(result);
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Pogresan email");
  }
  if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
    return res.status(400).send("Pogresna sifra");
  }
  const token = jwt.sign(
    { username: user.name, id: user._id },
    process.env.SECRET_TOKEN
  );
  res.cookie("JWT-auth", token, {
    maxAge: 86400000,
  });
  res.json("Logged in");
});

router.get("/logout", (req, res) => {
  const JWTcookie = req.cookies["JWT-auth"];
  console.log(JWTcookie);
  newBlacklist = new Blacklist({ JWTcookie });
  newBlacklist
    .save()
    .then(() => res.status(200).send("Logged out"))
    .catch((err) => res.status(400).send(err));
});

router.get("/check", (req, res) => {
  res.json("Hello");
});

module.exports = router;
