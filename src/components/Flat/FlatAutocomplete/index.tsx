import React, { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import * as qs from 'qs';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../../Unknown/UIContext';

type FlatAutocompleteProps = {
  setCityName: React.Dispatch<React.SetStateAction<string>>;
};
const FlatAutocomplete: FC<FlatAutocompleteProps> = ({ setCityName }) => {
  const classes = useStyles();
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
    const [currentCity] = city.trim().split(' ');
    setValue(city, false);
    setCityName(currentCity);
    history.push(`?city=${currentCity}`);
    clearSuggestions();
  };
  useEffect(() => {
    init();
  });
  useEffect(() => {
    if (window.location.search) {
      const searchParams = qs.parse(window.location.search.substring(1));
      setValue(searchParams?.city);
      clearSuggestions();
    }
  }, [setValue, clearSuggestions]);
  return (
    <Box ref={ref} className={classes.flatBox} position="relative">
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
      <Box className={classes.flatBox} mt={7} position="absolute">
        {status === 'OK' &&
          value &&
          data.map((item) => (
            <ListItem
              className={classes.fullWidth}
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
