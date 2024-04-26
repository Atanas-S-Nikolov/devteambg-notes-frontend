import { styled } from "@mui/material";

import DialogActions from "@mui/material/DialogActions";

const StyledActions = styled(DialogActions)({
  display: "flex",
  justifyContent: "space-between",
});

export default function StyledDialogActions(props) {
  return <StyledActions {...props} />;
}
