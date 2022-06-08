import React, { FC, useState } from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Flat } from '../../../../types';
import Header from '../../Unknown/Header/Header';
import FlatAutocomplete from '../FlatAutocomplete';
import FlatCard from '../FlatCard';

const FlatsScreen: FC = () => {
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
  const { data } = useFirestoreCollectionData<Flat>(filteredFlats());
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={5} position="relative">
            <FlatAutocomplete setCityName={setCityName} />
            {data &&
              data.map(
                ({
                  photoUrl,
                  description,
                  address,
                  dailyPriceUsd,
                  NO_ID_FIELD,
                }) => (
                  <FlatCard
                    key={NO_ID_FIELD}
                    id={NO_ID_FIELD}
                    photoUrl={photoUrl}
                    description={description}
                    address={address}
                    dailyPriceUsd={dailyPriceUsd}
                  />
                ),
              )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FlatsScreen;
