import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";

export default function ServisPDF(props) {
  return (
    <Document>
      <Page size="A4">
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10%",
            }}
          >
            <View
              style={{
                marginLeft: "5%",
                border: "1px",
                borderColor: "black",
                padding: "15px",
                width: "42%",
                fontSize: "12",
              }}
            >
              <Text>Racun-Servis ID:</Text>
              <Text>{props.data._id}</Text>
              <Text>
                Datum izdavanja racuna:{" "}
                {new Date(Date.now()).toLocaleDateString("de-DE")}
              </Text>
              <Text>Serviser: {props.data.serviser.name}</Text>
            </View>
            <View
              style={{
                marginRight: "5%",
                border: "1px",
                borderColor: "black",
                padding: "15px",
                width: "42%",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  fontSize: "12",
                }}
              >
                Musterija:
              </Text>
              <Text>{props.data.imeMusterije}</Text>
              <Text style={{ paddingTop: "10px", fontSize: "12" }}>
                Kontakt:
              </Text>
              <Text>{props.data.brojTelefona}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              fontSize: "10",
              marginLeft: "5.5%",
              marginTop: "25px",
            }}
          >
            <Text
              style={{
                fontSize: "12",
              }}
            >
              Datum prijema:{" "}
            </Text>
            <Text style={{ fontWeight: "heavy", fontSize: "12" }}>
              {new Date(props.data.datumPrijema).toLocaleDateString("de-DE")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              fontSize: "10",
              marginLeft: "5.5%",
              marginTop: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "12",
              }}
            >
              Opis problema:{"  "}
            </Text>
            <Text>{""}</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "heavy",
                fontSize: "12",
                marginTop: "3px",
                marginLeft: "5.5%",
                border: "1px",
                borderColor: "black",
                padding: "15px",
                width: "50%",
                fontSize: "10",
              }}
            >
              {props.data.opisProblema}
            </Text>
          </View>
          <View style={{ paddingTop: "20px" }}></View>

          <View
            style={{
              flexDirection: "row",
              fontSize: "10",
              marginLeft: "5.5%",
              marginTop: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "12",
              }}
            >
              Datum zavrsetka:{" "}
            </Text>
            <Text style={{ fontWeight: "heavy", fontSize: "12" }}>
              {props.data.zavrseno
                ? new Date(props.data.datumZavrsetka).toLocaleDateString(
                    "de-DE"
                  )
                : "Uredjaj na servisu!"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              fontSize: "10",
              marginLeft: "5.5%",
              marginTop: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "12",
              }}
            >
              Opis resenja:{"  "}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "heavy",
                fontSize: "12",
                marginTop: "3px",
                marginLeft: "5.5%",
                border: "1px",
                borderColor: "black",
                padding: "15px",
                width: "50%",
                fontSize: "10",
              }}
            >
              {props.data.zavrseno
                ? props.data.opisResenja
                : "Uredjaj na servisu!"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
