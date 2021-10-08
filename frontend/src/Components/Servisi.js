import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OtpremnicaPDF from "./OtpremnicaPDF";
import "./deleteButton.css";
import axios from "axios";

export default function Servisi() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/servisi")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    return () => {
      setData([]);
    };
  }, []);

  const handleDeleteItem = (id) => {
    axios
      .delete(`/api/servisi/servis/${id}`)
      .then((res) => {
        let noviData = data.filter((elem) => elem._id !== id);
        setData(noviData);
        alert("Uspjesno obrisano");
      })
      .catch((err) => alert("Greska"));
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
        LISTA SERVISA
      </div>
      <TableContainer
        component={Paper}
        style={{ marginTop: "100px", width: "80%", marginLeft: "10%" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Musterija</TableCell>
              <TableCell align="right">Serviser</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Datum prijema</TableCell>
              <TableCell align="right">Datum Zavrsetka</TableCell>
              <TableCell align="right">Obrisi</TableCell>
              <TableCell align="right">PDF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  <Link to={`/servis/${row._id}`}>{row._id}</Link>
                </TableCell>
                <TableCell align="right">{row.imeMusterije}</TableCell>
                <TableCell align="right">{row.serviser.name}</TableCell>
                <TableCell align="right">
                  {row.zavrseno ? "Zavrseno" : "U obradi"}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.datumPrijema).toLocaleDateString("de-DE")}
                </TableCell>
                <TableCell align="right">
                  {row.datumZavrsetka
                    ? new Date(row.datumZavrsetka).toLocaleDateString("de-DE")
                    : "Nije zavrseno"}
                </TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    className="deleteButton"
                    style={{ fill: "red" }}
                    onClick={() => handleDeleteItem(row._id)}
                  ></DeleteIcon>
                </TableCell>
                {/* <TableCell align="right">
                  <PDFDownloadLink
                    document={<OtpremnicaPDF data={row}></OtpremnicaPDF>}
                    fileName="servis.pdf"
                  >
                    <PictureAsPdf
                      className="deleteButton"
                      style={{ fill: "blue" }}
                    ></PictureAsPdf>
                  </PDFDownloadLink>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/kreirajservis">
        <Fab
          color="primary"
          aria-label="add"
          style={{
            bottom: "30px",
            right: "40px",
            position: "fixed",
            width: "6rem",
            height: "6rem",
          }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
}
