import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

export default function KorisnikNovi() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [lokacija, setLokacija] = useState();
  const [ppassword, setPpassword] = useState();
  const [finished, setFinished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== ppassword) {
      alert("Lozinke se ne podudaraju!");
    } else {
      axios
        .post("/api/users/register", { name, email, password, lokacija })
        .then((res) => setFinished(true))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          width: "100%",
          paddingTop: "40px",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        NOVI KORISNIK
      </div>
      <div style={{ marginLeft: "45%", marginTop: "100px" }}>
        {finished ? <Redirect to="/"></Redirect> : null}
        <TextField
          id="standard-basic"
          label="Ime"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br></br>

        <TextField
          id="standard-basic"
          label="E-Mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br></br>
        <TextField
          id="standard-basic"
          type="password"
          label="Unesite lozinku"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br></br>
        <TextField
          id="standard-basic"
          type="password"
          label="Ponovite lozinku"
          onChange={(e) => setPpassword(e.target.value)}
          value={ppassword}
        />
        <br></br>
        <TextField
          id="standard-basic"
          label="Lokacija"
          onChange={(e) => setLokacija(e.target.value)}
          value={lokacija}
        />
        <br></br>
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: "20px", marginLeft: "75px" }}
          onClick={handleSubmit}
        >
          Dodaj korisnika
        </Button>
      </div>
    </div>
  );
}
