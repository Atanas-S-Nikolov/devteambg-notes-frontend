import { grey, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const LIGHT_MODE = "Light";
export const DARK_MODE = "Dark";

export function initializeTheme(mode) {
  const backgroundColor = mode === DARK_MODE ? "#121212" : "#f5f5f5";
  return createTheme({
    palette: {
      mode: mode.toLowerCase(),
      primary: {
        main: orange[500],
      },
      secondary: {
        main: grey[300],
        contrastText: "#fff",
      },
      background: {
        default: backgroundColor,
      },
    },
  });
}
