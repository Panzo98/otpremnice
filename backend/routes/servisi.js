const express = require("express");
const { Servis } = require("../models/servis.model");
const router = express.Router();
const verify = require("../middleware/verifyToken");
module.exports = router;

router.get("/", verify, (req, res) => {
  Servis.find()
    .populate("serviser", "name")
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});

router.post("/noviServis", verify, (req, res) => {
  const servis = new Servis({
    imeMusterije: req.body.imeMusterije,
    brojTelefona: req.body.brojTelefona,
    serviser: req.user.id,
    datumPrijema: new Date(Date.now()),
    opisProblema: req.body.opisProblema,
    datumZavrsetka: req.body.datumZavrsetka,
    opisResenja: req.body.opisResenja,
    zavrseno: req.body.zavrseno,
  });
  servis
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});
