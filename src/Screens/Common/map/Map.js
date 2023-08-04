import React from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { LocationOn } from "@material-ui/icons";

const Map = ({ markers, selectedMarker, onSelectMarker }) => {
  const selectedMarkerLat = selectedMarker?.lat ?? 20.146220361679458;
  const selectedMarkerLng = selectedMarker?.lng ?? 40.2568970541965;

  const handleMarkerClick = async ({ lat, lng }) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
      );
      //   console.log("res", response?.data);
      const { results } = response.data;
      if (results.length > 0) {
        const address = results[0].formatted_address;

        onSelectMarker({ lat, lng, address });
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    onSelectMarker({ lat, lng });
  };

  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "15px",
          boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
          overflow: "hidden",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCCbOGygkchkcXDrWQwO2yQhFrPhli4z3s",
          }}
          defaultCenter={{
            lat: 20.146220361679458,
            lng: 40.2568970541965,
          }}
          defaultZoom={15}
          options={mapOptions}
          onClick={({ lat, lng }) => handleMarkerClick({ lat, lng })}
        >
          {selectedMarker && (
            <LocationOn
              lat={selectedMarkerLat}
              lng={selectedMarkerLng}
              style={{
                // color: "#3973a5",
                color: "Background",
                // fontSize: "50px",
                width: "40px",
                height: "40px",
              }}
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;

const mapOptions = {
  styles: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ],
};
