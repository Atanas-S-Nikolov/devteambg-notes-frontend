import { styled } from "@mui/material";

import Fab from "@mui/material/Fab";

export default function StyledFab(props) {
  const CustomFab = styled(Fab)(({ theme }) => ({
    position: "fixed",
    float: "right",
    bottom: "3%",
    right: "1%",
    color: theme.palette.secondary.contrastText
  }));
  return <CustomFab {...props} />;
}
