import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from 'google-map-react';

export default function App () {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDZxLM9qBogixwiW2wuYWGqT2bUVWj5KEQ"
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return <div>map</div>

}