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

router.delete("/servis/:id", verify, (req, res) => {
  Servis.findByIdAndRemove(req.params.id)
    .then((result) => res.json("Deleted"))
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
router.put("/servis/:id", verify, (req, res) => {
  Servis.findByIdAndUpdate(req.params.id, {
    brojTelefona: req.body.brojTelefona,
    datumZavrsetka: new Date(Date.now()),
    opisResenja: req.body.opisResenja,
    zavrseno: req.body.zavrseno,
  })
    .then((result) => res.json("Updated"))
    .catch((err) => res.status(400).json(err));
});
router.get("/servis/:id", verify, (req, res) => {
  Servis.findById(req.params.id)
    .populate("serviser")
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
});
