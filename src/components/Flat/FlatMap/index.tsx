import React, { FC, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire';
import { Flat } from '../../../../types';
import { useStyles } from '../../Unknown/UIContext';

const containerStyle = {
  width: '100%',
  height: '93vh',
};
const mapOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
};
interface FlatMapProps {
  isLoaded: boolean;
  loadError?: Error;
  id: string;
}
interface Center {
  lat: number;
  lng: number;
}

const FlatMap: FC<FlatMapProps> = ({ isLoaded, id, loadError }) => {
  const firestore = useFirestore();
  const mapRef = useRef();
  const classes = useStyles();
  const [center, setCenter] = useState<Center>({ lat: 0, lng: 0 });
  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, []);
  const { data } = useFirestoreDocDataOnce<Flat>(
    firestore.collection('flats').doc(id),
  );
  useEffect(() => {
    setCenter({ lat: data?.latitude, lng: data?.longitude });
  }, [data]);
  if (loadError) {
    return <Box className={classes.mapFlatBox}>Failed to load flat</Box>;
  }
  if (!isLoaded) {
    return <Box className={classes.mapFlatBox}>Loading flat details...</Box>;
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={20}
      onLoad={onLoad}
      onUnmount={onUnmount}
      center={center}
      options={mapOptions}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
export default FlatMap;
