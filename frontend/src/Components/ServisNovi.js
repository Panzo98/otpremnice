import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

export default function KorisnikNovi() {
  const [imeMusterije, setImeMusterije] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");
  const [opisProblema, setOpisProblema] = useState("");
  const [finished, setFinished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/servisi/noviServis", {
        imeMusterije,
        brojTelefona,
        opisProblema,
      })
      .then((res) => setFinished(true))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginLeft: "40%", marginTop: "100px" }}>
      {finished ? <Redirect to="/servis"></Redirect> : null}
      <TextField
        id="standard-basic"
        label="Musterija"
        onChange={(e) => setImeMusterije(e.target.value)}
        value={imeMusterije}
      />
      <br></br>

      <TextField
        id="standard-basic"
        type="number"
        label="Broj telefona"
        onChange={(e) => setBrojTelefona(e.target.value)}
        value={brojTelefona}
      />
      <br></br>
      <TextField
        id="standard-basic"
        label="Opis problema"
        onChange={(e) => setOpisProblema(e.target.value)}
        value={opisProblema}
      />
      <br></br>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "75px" }}
        onClick={handleSubmit}
      >
        Dodaj
      </Button>
    </div>
  );
}
