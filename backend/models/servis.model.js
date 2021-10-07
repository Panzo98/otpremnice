const mongoose = require("mongoose");

const servisSchema = mongoose.Schema({
  imeMusterije: {
    type: String,
    required: true,
  },
  brojTelefona: {
    type: String,
    required: true,
  },
  serviser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  datumPrijema: {
    type: Date,
    default: new Date(),
  },
  opisProblema: {
    type: String,
    required: true,
  },
  datumZavrsetka: {
    type: Date,
  },
  opisResenja: {
    type: String,
  },
  zavrseno: {
    type: Boolean,
    default: false,
  },
});

exports.Servis = mongoose.model("Servis", servisSchema);
