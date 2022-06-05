import React, { createContext, useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/lab/Alert';
import { Snackbar, SnackbarOrigin } from '@mui/material';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  userName: string | null;
}
interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
  anchorOrigin?: SnackbarOrigin;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  });
  const [userName, setUserName] = useState<string | null>(null);
  const handleClose = () =>
    setAlert({
      show: false,
    });
  return (
    <UIContext.Provider value={{ userName, setAlert, setUserName }}>
      {children}
      <Snackbar
        open={alert.show}
        anchorOrigin={alert.anchorOrigin}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </UIContext.Provider>
  );
};
