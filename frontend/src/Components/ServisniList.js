import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function ServisniList(props) {
  const [imeMusterije, setImeMusterije] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");
  const [opisProblema, setOpisProblema] = useState("");
  const [datumPrijema, setDatumPrijema] = useState("");
  const [datumZavrsetka, setDatumZavrsetka] = useState("");
  const [serviser, setServiser] = useState("");
  const [opisResenja, setOpisResenja] = useState("");
  const [zavrseno, setZavrseno] = useState("");
  const [finished, setFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`/api/servisi/servis/${id}`).then((res) => {
      setImeMusterije(res.data.imeMusterije);
      setBrojTelefona(res.data.brojTelefona);
      setOpisProblema(res.data.opisProblema);
      setDatumPrijema(res.data.datumPrijema);
      setOpisResenja(res.data.opisResenja);
      res.data.serviser
        ? setServiser(res.data.serviser.name)
        : setServiser("Greska");
      setZavrseno(res.data.zavrseno);
      setDatumZavrsetka(res.data.datumZavrsetka);
      setIsLoading(false);
    });
    return () => {
      setImeMusterije("");
      setBrojTelefona("");
      setOpisProblema("");
      setDatumPrijema("");
      setOpisResenja("");
      setServiser("");
      setZavrseno("");
      setDatumZavrsetka("");
      setIsLoading(true);
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let datumZavrsetka = new Date(Date.now());
    let zavrseno = new Boolean(true);
    axios
      .put(`/api/servisi/servis/${id}`, {
        brojTelefona,
        datumZavrsetka,
        opisResenja,
        zavrseno,
      })
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
        SERVISNI LIST
      </div>
      <div style={{ marginLeft: "45%", marginTop: "100px" }}>
        {finished ? <Redirect to="/servis"></Redirect> : null}
        <TextField id="standard-basic" label="Musterija" value={imeMusterije} />
        <br></br>
        <TextField
          id="standard-basic"
          label="Broj telefona"
          onChange={(e) => setBrojTelefona(e.target.value)}
          value={brojTelefona}
        />
        <br></br>
        <TextField id="standard-basic" label="Serviser" value={serviser} />
        <br></br>
        <TextField
          id="standard-multiline-static"
          multiline
          rows={4}
          variant="standard"
          label="Opis problema"
          value={opisProblema}
        />
        <br></br>
        <TextField
          id="standard-basic"
          label="Datum prijema"
          value={new Date(datumPrijema).toLocaleDateString("de-DE")}
        />
        <br></br>
        <TextField
          id="standard-multiline-static"
          label="Opis resenja"
          multiline
          rows={4}
          value={opisResenja}
          variant="standard"
          onChange={(e) => setOpisResenja(e.target.value)}
        />

        <br></br>
        {zavrseno ? (
          <TextField
            id="standard-basic"
            label="Datum zavrsetka"
            value={new Date(datumZavrsetka).toLocaleDateString("de-DE")}
          />
        ) : (
          ""
        )}
        <br></br>
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: "20px", marginLeft: "75px" }}
          onClick={handleSubmit}
        >
          Zavrsi
        </Button>
      </div>
    </div>
  );
}
