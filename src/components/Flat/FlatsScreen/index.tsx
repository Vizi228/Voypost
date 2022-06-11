import React, { FC, useEffect, useState } from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useJsApiLoader } from '@react-google-maps/api';
import { useHistory, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import * as qs from 'qs';
import { Flat } from '../../../../types';
import Header from '../../Unknown/Header/index';
import FlatAutocomplete from '../FlatAutocomplete';
import FlatCard from '../FlatCard';
import FlatMap from '../FlatMap';
import { useStyles } from '../../Unknown/UIContext/index';

const API_KEY = process.env.REACT_APP_API_KEY;

const FlatsScreen: FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: ['places', 'geometry'],
  });
  const classes = useStyles();
  const firestore = useFirestore();
  const [cityName, setCityName] = useState<string>('');
  const filteredFlats = () => {
    if (cityName)
      return firestore
        .collection('flats')
        .where('cityName', '==', cityName)
        .limit(20);
    return firestore.collection('flats').limit(20);
  };
  const { data } = useFirestoreCollectionData<Flat>(filteredFlats(), {
    idField: 'id',
  });
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (window.location.search) {
      const searchParams = qs.parse(window.location.search.substring(1));
      setCityName(searchParams?.city);
    }
  }, []);
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={5} p={5} position="relative">
          <FlatAutocomplete setCityName={setCityName} />
          <Box className={classes.flatItemsBox}>
            {data?.length > 0 ? (
              data.map(
                ({ photoUrl, description, address, dailyPriceUsd, id }) => (
                  <FlatCard
                    key={id}
                    id={id}
                    photoUrl={photoUrl}
                    description={description}
                    address={address}
                    dailyPriceUsd={dailyPriceUsd}
                    cityName={cityName}
                  />
                ),
              )
            ) : (
              <Typography mt={30} variant="h3">
                Квартир не найдено
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={7}>
          {params?.id ? (
            <FlatMap id={params.id} loadError={loadError} isLoaded={isLoaded} />
          ) : (
            <Box className={classes.mapFlatBox}>No flat selected</Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(FlatsScreen);
