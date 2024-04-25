import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled, useMediaQuery } from "@mui/material";
import { DEFAULT_ERROR_OBJECT, buildError } from "../../utils/ValidationUtils";
import { useState } from "react";
import { isBlank } from "underscore.string";

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  "&.MuiDialogContent-root": {
    paddingTop: "1em",
  },
});

const StyledDialogActions = styled(DialogActions)({
  display: "flex",
  justifyContent: "space-between",
});

const DEFAULT_ERRORS = {
  title: DEFAULT_ERROR_OBJECT,
  content: DEFAULT_ERROR_OBJECT,
};

export default function NoteCreationDialog(props) {
  const { onClose } = props;
  const mobile = useMediaQuery("(max-width: 500px)");
  const [errors, setErrors] = useState(DEFAULT_ERRORS);

  function handleTitleChange(event) {
    const { value } = event.target;
    if (!value || isBlank(value)) {
      setErrors({
        ...errors,
        title: buildError("Title must not be blank")
      })
      return;
    }
    setErrors({
      ...errors,
      title: DEFAULT_ERROR_OBJECT
    });
  }

  function handleContentChange(event) {
    const { value } = event.target;
    if (!value || isBlank(value)) {
      setErrors({
        ...errors,
        content: buildError("Content must not be blank")
      })
      return;
    }
    setErrors({
      ...errors,
      content: DEFAULT_ERROR_OBJECT
    });
  }

  return (
    <Dialog fullScreen={mobile} fullWidth {...props}>
      <DialogTitle>Create a note</DialogTitle>
      <StyledDialogContent>
        <TextField
          variant="standard"
          label="Title"
          error={errors.title.error}
          helperText={errors.title.message}
          onChange={handleTitleChange}
        />
        <TextField
          variant="standard"
          label="Content"
          placeholder="Start typing"
          error={errors.content.error}
          helperText={errors.content.message}
          onChange={handleContentChange}
          multiline
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={onClose}>Back</Button>
        <Button>Save</Button>
      </StyledDialogActions>
    </Dialog>
  );
}
