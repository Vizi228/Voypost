import React, { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useJsApiLoader } from '@react-google-maps/api';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';

type FlatAutocompleteProps = {
  setCityName: React.Dispatch<React.SetStateAction<string>>;
};
const FlatAutocomplete: FC<FlatAutocompleteProps> = ({ setCityName }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBUZV-O6ZNEQkXsKgB7sNWFBlJf6bZeyqE',
    libraries: ['places', 'geometry'],
  });
  const history = useHistory();
  const {
    ready,
    value,
    suggestions: { status, data },
    init,
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      setCityName('');
      history.push(`/flats`);
    }
  };

  const handleSelect = (elem: any) => () => {
    setValue(elem.description, false);
    setCityName(elem.terms[0].value);
    history.push(`?city=${elem.terms[0].value}`);
    clearSuggestions();
  };
  const handleSearch = (city: string) => {
    const currentCity = city.split(' ')[0];
    setValue(currentCity, false);
    setCityName(currentCity);
    history.push(`?city=${currentCity}`);
    clearSuggestions();
  };
  useEffect(() => {
    init();
  });
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '41.6%',
        width: '32.5%',
        flexGrow: 0,
        maxHeight: 400,
        bgcolor: 'background.paper',
        zIndex: 100,
        marginTop: '25px',
      }}
      position="fixed"
    >
      <TextField
        fullWidth
        label="City"
        id="userName"
        variant="filled"
        value={value}
        disabled={!ready}
        placeholder="Where are you going?"
        onChange={handleInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(value)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box>
        {status === 'OK' &&
          value &&
          data.map((item) => (
            <ListItem
              sx={{ width: '100%' }}
              key={item.place_id}
              component="div"
              disablePadding
            >
              <ListItemButton
                onKeyDown={handleSelect(item)}
                onClick={handleSelect(item)}
              >
                <ListItemText primary={item.description} />
              </ListItemButton>
            </ListItem>
          ))}
      </Box>
    </Box>
  );
};
export default FlatAutocomplete;
