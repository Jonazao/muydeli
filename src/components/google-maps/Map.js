import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
const containerStyle = {
  height: '300px',
};

const defaultCenter = {
  lat: 31.866502,
  lng: -116.598527,
};

const options = {
  disableDefaultUI: true,
};

function Map({ center }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center ?? defaultCenter} options={options} zoom={15}>
      {/* Child components, such as markers, info windows, etc. */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
