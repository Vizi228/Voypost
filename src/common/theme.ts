import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
    text: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    text?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    text: true;
    title: true;
    halfOpacity: true;
  }
}

export const themeOptions = {
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
    text: {
      fontWeight: 600,
    },
    halfOpacity: {
      opacity: 0.5,
      display: 'block',
      paddingBottom: '5px',
    },
  },
};

const defaultTheme = createTheme(themeOptions);

export default defaultTheme;
