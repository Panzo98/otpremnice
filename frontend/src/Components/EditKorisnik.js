import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function EditKorisnik(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lokacija, setLokacija] = useState("");
  const [finished, setFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`/api/users/user/${id}`).then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setLokacija(res.data.lokacija);
      setIsLoading(false);
    });
    return () => {
      setName("");
      setEmail("");
      setLokacija("");
      setIsLoading(true);
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(`/api/users/${id}`, { name, email, lokacija })
      .then((res) => setFinished(true))
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div style={{ marginLeft: "43%", marginTop: "100px" }}>
      {finished ? <Redirect to="/korisnici"></Redirect> : null}
      <TextField
        id="standard-basic"
        label="KORISNICKO IME"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br></br>
      <TextField
        id="standard-basic"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br></br>
      <TextField
        id="standard-basic"
        label="Lokacija"
        value={lokacija}
        onChange={(e) => setLokacija(e.target.value)}
      />

      <br></br>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "75px" }}
        onClick={handleSubmit}
      >
        Izmijeni korisnika
      </Button>
    </div>
  );
}
