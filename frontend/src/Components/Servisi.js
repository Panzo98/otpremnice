import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Select from "@material-ui/core/Select";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import axios from "axios";
import ServisPDF from "./ServisPDF";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./deleteButton.css";

export default function Servisi() {
  const [data, setData] = useState([]);
  const [datacopy, setDatacopy] = useState([]);
  useEffect(() => {
    axios
      .get("/api/servisi")
      .then((res) => {
        setData(res.data);
        setDatacopy(res.data);
      })
      .catch((err) => console.log(err));
    return () => {
      setData([]);
    };
  }, []);

  const handleChangeSort = (e) => {
    if (e == 10) {
      setData(datacopy);
    } else if (e == 20) {
      let data1 = datacopy.filter((jed) => {
        return jed.zavrseno !== true;
      });
      setData(data1);
    } else if (e == 30) {
      setData(datacopy);
      let data2 = datacopy.filter((jed) => {
        return jed.zavrseno !== false;
      });
      setData(data2);
    }
  };

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

      <FormControl
        fullWidth
        style={{
          marginTop: "90px",
          marginLeft: "10%",
          maxWidth: "200px",
          minWidth: "200px",
        }}
      >
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Filter
        </InputLabel>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: "Sortiraj",
            id: "uncontrolled-native",
          }}
          onChange={(e) => handleChangeSort(e.target.value)}
        >
          <option value={10}>Sve</option>
          <option value={20}>U obradi</option>
          <option value={30}>Zavrseno</option>
        </NativeSelect>
      </FormControl>
      <TableContainer
        component={Paper}
        style={{ marginTop: "0px", width: "80%", marginLeft: "10%" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  native
                >
                  <option align="right">Musterija</option>
                  <option align="right">Musterija A-Z </option>
                  <option align="right">Musterija Z-A</option>
                </Select>
              </TableCell>
              <TableCell align="right">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  native
                >
                  <option align="right">Serviser</option>
                  <option align="right">Serviser A-Z </option>
                  <option align="right">Serviser Z-A</option>
                </Select>
              </TableCell>

              <TableCell align="right">Status</TableCell>
              <TableCell align="right">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  native
                >
                  <option align="right">Datum prijema</option>
                  <option align="right">Datum prijema (najstariji)</option>
                  <option align="right">Datum prijema (najnoviji)</option>
                </Select>
              </TableCell>
              <TableCell align="right">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  native
                >
                  <option align="right">Datum zavrsetka</option>
                  <option align="right">Datum zavrsetka (najstariji)</option>
                  <option align="right">Datum zavrsetka (najnoviji)</option>
                </Select>
              </TableCell>
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
                <TableCell align="right">
                  {row.serviser ? row.serviser.name : "Greska"}
                </TableCell>
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
                <TableCell align="right">
                  <>
                    <PDFDownloadLink
                      document={<ServisPDF data={row}></ServisPDF>}
                      fileName="servis.pdf"
                    >
                      <PictureAsPdf
                        className="deleteButton"
                        style={{ fill: "blue" }}
                      ></PictureAsPdf>
                    </PDFDownloadLink>
                  </>
                </TableCell>
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
