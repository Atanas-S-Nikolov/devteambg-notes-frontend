import { grey, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: grey[300],
      contrastText: "#fff"
    }
  }
})
