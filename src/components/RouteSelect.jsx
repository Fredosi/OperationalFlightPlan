import { React, useEffect } from "react";

export default function RouteSelect() {

  useEffect(() => {
    var map = new window.L.Map("map").setView([40.416729, -3.703339], 13);

    var osm = window.L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    var sat = window.L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    var options = {
      position: "topleft",
      circleMarker: {
        color: "red",
        radius: 2,
        draggable: true,
      },
      lengthUnit: {
        factor: 0.539956803,
        display: "NM",
        decimal: 1,
        label: "Distancia:",
        visibility: "visible",
      },
      angleUnit: {
        display: "&deg;",
        decimal: 0,
        factor: null,
        label: "Rumbo:",
      },
    };

    var ruler = window.L.control.ruler(options).addTo(map);

    var mb = window.L.tileLayer.mbTiles("./le4.mbtiles").addTo(map);

    mb.on("databaseloaded", function (ev) {
      console.info("MBTiles DB loaded", ev);
    });
    mb.on("databaseerror", function (ev) {
      console.info("MBTiles DB error", ev);
    });

    var baseMaps = {
      OpenStreetMap: osm,
      Carta: mb,
      Satellite: sat,
    };

    var layerControl = window.L.control.layers(baseMaps).addTo(map);

    let count = 0;
    let distancias = [];
    let rumbos = [];

    map.addEventListener("click", function (e) {
    //   count = count + 1;

    //   if (count > 1) {
    //     distancias.push(map._events.click["2"].ctx._result.Distance);
    //     rumbos.push(map._events.click["2"].ctx._result.Bearing);
    //     console.log(`Distancias: [${distancias}]`);
    //     console.log(`Rumbos: [${rumbos}]`);
    //   }
    console.log(map._events.click["2"].ctx);
    });

    // map.addEventListener("click", function (e) {
    //     console.log(e);
    //   });
  }, []);

  return <div id="map"></div>;
}
