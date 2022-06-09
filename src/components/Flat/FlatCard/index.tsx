import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';
import { Link, useParams } from 'react-router-dom';
import { useStyles } from '../../Unknown/UIContext';

type FlatCardProps = {
  photoUrl: string;
  description?: string;
  address: string;
  dailyPriceUsd: number;
  id: string;
  cityName?: string;
};

const FlatCard: FC<FlatCardProps> = ({
  photoUrl,
  description,
  address,
  dailyPriceUsd,
  id,
  cityName,
}) => {
  const classes = useStyles();
  const params = useParams<{ id: string }>();
  return (
    <Paper
      className={classes.flatCardPaper}
      elevation={params?.id === id ? 1 : 3}
    >
      <ImageListItem className={classes.responsiveFlatImg}>
        <img src={photoUrl} alt="flat" />
      </ImageListItem>
      <Box className={classes.flatCardBox}>
        <Box>
          <Typography mb={2} variant="h5">
            {dailyPriceUsd}$ / night
          </Typography>
          <Typography variant="subtitle2">{address}</Typography>
          <Typography className={classes.descriptionLine} variant="subtitle2">
            {description}
          </Typography>
        </Box>
        <Link
          className={classes.linkStyle}
          to={`/flats/${id}${cityName ? `?city=${cityName}` : ''}`}
        >
          Details
        </Link>
      </Box>
    </Paper>
  );
};

export default FlatCard;
