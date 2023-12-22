"use client";

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import Leaflet from "leaflet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { House } from "@/types/house";
import { Button } from "./button";

interface MapsPopUpProps {
  houseData: House;
  position: string;
}
function MapsPopUp({ houseData, position }: MapsPopUpProps) {
  const fixPosition = position.split(",").map(Number) as LatLngExpression;

  const markerIcon = Leaflet.divIcon({
    html: `<svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 384 512" height="42" width="42" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>`,
    iconSize: [42, 42],
    iconAnchor: [42 / 2, 42],
    className: "remove-bg",
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Buka</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{houseData.name}</DialogTitle>
        </DialogHeader>
        <div className="">
          <MapContainer
            center={fixPosition}
            zoom={17}
            scrollWheelZoom
            className="h-[250px] w-[100%]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={fixPosition} icon={markerIcon}>
              <Popup>{houseData.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MapsPopUp;
