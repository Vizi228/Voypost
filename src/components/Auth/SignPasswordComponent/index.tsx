import React, { ChangeEventHandler, FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormikContext } from 'formik';

type SignPasswordComponentProps = {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  touched: boolean | undefined;
  errors: string | undefined;
  name: string;
  label: string;
};

const SignPasswordComponent: FC<SignPasswordComponentProps> = ({
  value,
  handleChange,
  touched,
  errors,
  name,
  label,
}) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <TextField
      label={label}
      id={name}
      fullWidth
      type={isVisiblePassword ? 'text' : 'password'}
      name={name}
      variant="filled"
      value={value}
      onChange={handleChange}
      error={touched && Boolean(errors)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {isVisiblePassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SignPasswordComponent;
