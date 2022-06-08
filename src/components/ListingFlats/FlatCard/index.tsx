import React, { FC, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';

type FlatCardProps = {
  photoUrl: string;
  description?: string;
  address: string;
  dailyPriceUsd: number;
  id: string;
};

const FlatCard: FC<FlatCardProps> = ({
  photoUrl,
  description,
  address,
  dailyPriceUsd,
}) => {
  const getDescription = useCallback(() => {
    const splittedDescription = description?.trim().split('\n');
    return splittedDescription?.slice(0, 2);
  }, [description]);

  return (
    <Paper
      sx={{
        marginTop: '100px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '10px',
      }}
      elevation={3}
    >
      <ImageListItem sx={{ width: '50%', height: 'auto' }}>
        <img src={photoUrl} alt="flat" />
      </ImageListItem>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          p: 2,
        }}
      >
        <Box>
          <Typography sx={{ mb: '15px' }} variant="h5">
            {dailyPriceUsd}$ / night
          </Typography>
          <Typography variant="halfOpacity">{address}</Typography>
          <Typography variant="halfOpacity">{getDescription()}</Typography>
        </Box>
        <Button variant="text" color="secondary">
          Details
        </Button>
      </Box>
    </Paper>
  );
};

export default FlatCard;
