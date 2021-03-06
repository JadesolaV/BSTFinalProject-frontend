import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Map.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import mapStyles from "../services/mapStyles";
import "../../../src/index.css";
import { Link } from "react-router-dom";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "90vh",
};

const center = {
  lat: 6.44725,
  lng: 3.47026,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDZxLM9qBogixwiW2wuYWGqT2bUVWj5KEQ",
    libraries,
  });

  const Res = "http://localhost:5000/restaurant/";

  const [allRests, setAllRests] = useState([]);

  const [selectedRes, setSelectedRes] = useState(null);

  useEffect(() => {
    axios.get(Res).then((response) => {
      console.log(response.data.restaurants);

      setAllRests(response.data.restaurants);
    });
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {allRests.map((res) => (
          <Marker
            key={res._id}
            position={{
              lat: res.coordinates[0],
              lng: res.coordinates[1],
            }}
            onClick={() => {
              setSelectedRes(res);
            }}
            icon={{
              url: "/map-marker.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}
        {/* THIS RENDERS TO INFORMATION WINDOW WHEN A PIN IS CLICKED */}
        {selectedRes && (
          <InfoWindow
            position={{
              lat: selectedRes.coordinates[0],
              lng: selectedRes.coordinates[1],
            }}
            onCloseClick={() => {
              setSelectedRes(null);
            }}
          >
            <div>
              <Link to={`/Restaurants/${selectedRes._id}`}>
              <h2 className="resNameMap">{selectedRes.name}</h2>
              </Link>
              {/* <p>{selectedRes.rating}</p> */}
              <p>{selectedRes.location}</p>
              {selectedRes.image?.length > 0 && (
                <img className="resImage" src={selectedRes?.image[0]} alt="" />
              )}
            </div>
          </InfoWindow>
        )}
        ;
      </GoogleMap>
    </div>
  );
}

//THIS FUNCTION ZOOMS IN ON THE USERS CURRENT LOCATION
function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img className="compass" src="currentlocation.png" alt="compass" />
    </button>
  );
}

//THIS FUNCTION IS FOR THE GOOGLE PLACES API
function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 6.44725, lng: () => 3.47026 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("error");
          }
        }}
      >
        <ComboboxInput
          className="zoomcity"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Zoom in to your City"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
