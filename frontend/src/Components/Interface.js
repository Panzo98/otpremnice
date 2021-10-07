import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
export default function Interface() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "100px",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea component={Link} to="/skladiste">
            <CardMedia
              component="img"
              height="200"
              image="https://thumbs.dreamstime.com/z/fast-delivery-concept-warehouse-loader-man-workers-product-goods-shipping-transport-isometric-illustration-fast-delivery-concept-102141428.jpg"
              alt="skladiste"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                SKLADISTE
              </Typography>
              <Typography variant="body2" color="text.secondary">
                U skladistu se nalazi svi artikli. Kliknite na skladiste kako bi
                ste provjerili odredjeni artikal, dodali ili uklonili artikal.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea component={Link} to="/korisnici">
            <CardMedia
              component="img"
              height="200"
              image="https://itaxplanner.com/raw/img/register.png"
              alt="registracija"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                KORISNICI
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Menadzment forma administratorskog panela. Sluzeci se njom
                mozemo dodati nove ili izbrisati vec postojece korisnike.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea component={Link} to="/otpremnice">
            <CardMedia
              component="img"
              height="200"
              image="https://image.freepik.com/vector-gratis/lista-orden-plano-vector-icono_9206-97.jpg"
              alt="otpremnice"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                OTPREMNICE
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ovde generisemo novu otpremnicu. Takodje ovde mozemo pronaci
                istoriju kreiranih otpremnica, sa svim njenim podacima.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea component={Link} to="/servis">
            <CardMedia
              component="img"
              height="200"
              image="https://eclipse-online.com/wp-content/uploads/broken-tech.jpg"
              alt="servis"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                SERVIS
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Servis racunara, gdje imamo evidenciju na prethodnim servisima,
                tek zaprimljenim i servisima koji su u procesu servisiranja.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{ display: "flex", justifyContent: "space-around" }}
          ></CardActions>
        </Card>
      </div>
    </>
  );
}
