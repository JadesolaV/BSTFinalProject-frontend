import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from "../services/mapStyles";
import restaurants from "../services/restaurants.json";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 46.595806,
  lng: -112.027031,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDZxLM9qBogixwiW2wuYWGqT2bUVWj5KEQ",
  });

  //if this doesnt work try removing the React.
  const [selectedRes, setSelectedRes] = React.useState(null);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <h1> The Local Fork </h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
      >
        {restaurants.map((res) => (
          <Marker
            key={res.id}
            position={{
              lat: res.coordinates[0],
              lng: res.coordinates[1],
            }}
            onClick={() => {
              setSelectedRes(res);
            }}
          />
        ))}

        {selectedRes && (
            <InfoWindow
            position={{
                lat: selectedRes.coordinates[0],
                lng: selectedRes.coordinates[1],
              }}>
                <div>Restaurant details</div>
            </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
