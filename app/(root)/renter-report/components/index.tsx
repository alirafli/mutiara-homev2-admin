"use client";

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import Leaflet from "leaflet";

function TestRender() {
  const markerIcon = Leaflet.divIcon({
    html: `<svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 384 512" height="52" width="52" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>`,
    iconSize: [52, 52],
    iconAnchor: [52 / 2, 52],
    className: "remove-bg",
  });

  const position: LatLngExpression = [-6.249519114981275, 106.69076057091831];

  return (
    <div className="pl-6">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom
        className="h-[800px] w-[800px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default TestRender;
