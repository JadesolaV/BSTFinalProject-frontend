import React from "react";
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
  lat: 6.524379,
  lng: 3.379206,
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
              lat: res.coordinates.lat[0],
              lng: res.coordinates.lon,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
