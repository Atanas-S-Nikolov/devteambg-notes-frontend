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
import { useNoteStore } from "../../lib/stores/NoteStore";

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

export default function NoteCreationDialog(props) {
  const mobile = useMediaQuery("(max-width: 500px)");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState(DEFAULT_ERROR_OBJECT);
  const [contentError, setContentError] = useState(DEFAULT_ERROR_OBJECT);
  const addNote = useNoteStore((state) => state.addNote);

  function buildTitleError() {
    setTitleError(buildError("Title must not be blank"));
  }

  function resetTitleError() {
    setTitleError(DEFAULT_ERROR_OBJECT);
  }

  function buildContentError() {
    setContentError(buildError("Content must not be blank"))
  }

  function resetContentError() {
    setContentError(DEFAULT_ERROR_OBJECT);
  }

  function handleTitleChange(event) {
    const { value } = event.target;
    if (!value || isBlank(value)) {
      buildTitleError();
      return;
    }
    setTitle(value);
    resetTitleError();
  }

  function handleContentChange(event) {
    const { value } = event.target;
    if (!value || isBlank(value)) {
      buildContentError();
      return;
    }
    setContent(value);
    resetContentError();
  }

  
  function handleClose() {
    resetTitleError();
    resetContentError();
    props.onClose();
  }

  function handleSave(event) {
    event.preventDefault();
    const hasTitleError = !title || titleError.error;
    const hasContentError = !content || contentError.error;

    if (hasTitleError || hasContentError) {
      if (hasTitleError) {
        buildTitleError();
      }
      if (hasContentError) {
        buildContentError();
      }
      return;
    }
    
    resetTitleError();
    resetContentError();

    const id = crypto.randomUUID();
    addNote({ id, title, content });
    handleClose();
  }

  return (
    <Dialog fullScreen={mobile} fullWidth {...props}>
      <DialogTitle>Create a note</DialogTitle>
      <StyledDialogContent>
        <TextField
          variant="standard"
          label="Title"
          error={titleError.error}
          helperText={titleError.message}
          onChange={handleTitleChange}
        />
        <TextField
          variant="standard"
          label="Content"
          placeholder="Start typing"
          error={contentError.error}
          helperText={contentError.message}
          onChange={handleContentChange}
          multiline
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={handleClose}>Back</Button>
        <Button onClick={handleSave}>Save</Button>
      </StyledDialogActions>
    </Dialog>
  );
}
