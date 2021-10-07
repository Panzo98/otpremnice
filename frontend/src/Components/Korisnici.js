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
import "./deleteButton.css";
import axios from "axios";

export default function Skladiste() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    return () => {
      setData([]);
    };
  }, []);

  const handleDeleteItem = (id) => {
    axios
      .delete(`/api/users/${id}`)
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
        KORISNICKI PANEL
      </div>
      <TableContainer
        component={Paper}
        style={{
          marginTop: "100px",
          width: "80%",
          marginLeft: "10%",
          marginBottom: "80px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Lokacija</TableCell>
              <TableCell align="right">Obrisi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  <Link to={`/korisnici/${row._id}`}>{row._id}</Link>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.lokacija}</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    className="deleteButton"
                    style={{ fill: "red" }}
                    onClick={() => handleDeleteItem(row._id)}
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/korisnici/register">
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
