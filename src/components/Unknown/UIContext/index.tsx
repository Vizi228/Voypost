import React, { createContext, useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/lab/Alert';
import { Snackbar, SnackbarOrigin } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 25,
  },
  signContainer: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  imageWidth: {
    width: '102%',
  },
  space: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  fullHeight: {
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  linkStyle: {
    textDecoration: 'none',
    color: '#f50057',
    textAlign: 'center',
  },
  halfOpacity: {
    opacity: 0.5,
  },
  descriptionLine: {
    overflow: 'hidden',
    maxHeight: 70,
  },
  responsiveFlatImg: {
    width: '50%',
    height: 'auto',
    borderRadius: 10,
  },
  containedSecondary: {
    backgroundColor: '#f50057',
    color: '#fff',
    padding: 5,
    borderRadius: 4,
  },
  flatCardPaper: {
    marginTop: 100,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: 10,
  },
  flatBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: 0,
    maxHeight: 400,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  flatCardBox: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 20,
  },
  flatItemsBox: {
    maxHeight: '79vh',
    overflow: 'auto',
    scrollbarWidth: 'none',
  },
  mapFlatBox: {
    height: '93.4vh',
    backgroundColor: '#BDBDBD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
});

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
