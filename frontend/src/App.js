import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import LoginComponent from "./Components/LoginComponent";
import Interface from "./Components/Interface";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import KorisnikNovi from "./Components/KorisnikNovi";
import Otpremnice from "./Components/Otpremnice";
import OtpremnicaNova from "./Components/OtpremnicaNova";
import Skladiste from "./Components/Skladiste";
import Servisi from "./Components/Servisi";
import ServisNovi from "./Components/ServisNovi";
import NoviProdukt from "./Components/NoviProdukt";
import Korisnici from "./Components/Korisnici";
import EditProdukt from "./Components/EditProdukt";
import EditKorisnik from "./Components/EditKorisnik";
import ServisniList from "./Components/ServisniList";
axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  appBarBackground: { background: "#333333" },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/api/users/check")
      .then((res) => {
        setUser(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const handleLogOut = () => {
    axios
      .get("/api/users/logout")
      .then((res) => setUser(false))
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
  if (!user) {
    return <LoginComponent setUser={setUser}></LoginComponent>;
  } else {
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <AppBar position="static" className={classes.appBarBackground}>
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Typography variant="h6">
                <Link to="/" style={{ color: "#FfF", textDecoration: "none" }}>
                  <Button color="inherit" style={{ paddingLeft: "30px" }}>
                    POCETNA
                  </Button>
                </Link>
                <Link
                  to="/skladiste"
                  style={{ color: "#FfF", textDecoration: "none" }}
                >
                  <Button color="inherit" style={{ paddingLeft: "30px" }}>
                    SKLADISTE
                  </Button>
                </Link>
                <Link
                  to="/korisnici"
                  style={{ color: "#FfF", textDecoration: "none" }}
                >
                  <Button color="inherit" style={{ paddingLeft: "30px" }}>
                    KORISNICI
                  </Button>
                </Link>
                <Link
                  to="/otpremnice"
                  style={{ color: "#FfF", textDecoration: "none" }}
                >
                  <Button color="inherit" style={{ paddingLeft: "30px" }}>
                    OTPREMNICE
                  </Button>
                </Link>
                <Link
                  to="/servis"
                  style={{ color: "#FfF", textDecoration: "none" }}
                >
                  <Button color="inherit" style={{ paddingLeft: "30px" }}>
                    SERVIS
                  </Button>
                </Link>
              </Typography>
              <Link to="/" style={{ color: "#FfF", textDecoration: "none" }}>
                <Button
                  color="inherit"
                  onClick={() => handleLogOut()}
                  style={{ float: "right" }}
                >
                  ODJAVITE SE
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/" exact component={() => <Interface />}></Route>
            <Route
              path="/otpremnice"
              exact
              component={() => <Otpremnice />}
            ></Route>
            <Route
              path="/otpremnice/nova"
              exact
              component={() => <OtpremnicaNova />}
            ></Route>
            <Route
              path="/korisnici"
              exact
              component={() => <Korisnici />}
            ></Route>
            <Route
              path="/korisnici/register"
              exact
              component={() => <KorisnikNovi />}
            ></Route>
            <Route
              path="/korisnici/:id"
              exact
              component={() => <EditKorisnik></EditKorisnik>}
            ></Route>
            <Route
              path="/skladiste"
              exact
              component={() => <Skladiste />}
            ></Route>
            <Route
              path="/skladiste/noviProdukt"
              exact
              component={() => <NoviProdukt />}
            ></Route>
            <Route
              path="/skladiste/:id"
              exact
              component={() => <EditProdukt></EditProdukt>}
            ></Route>
            <Route path="/servis" exact component={() => <Servisi />}></Route>
            <Route
              path="/servis/:id"
              exact
              component={() => <ServisniList></ServisniList>}
            ></Route>
            <Route
              path="/kreirajservis"
              exact
              component={() => <ServisNovi />}
            ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
