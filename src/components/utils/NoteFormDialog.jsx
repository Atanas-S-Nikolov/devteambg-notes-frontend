import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";  
import { styled, useMediaQuery } from "@mui/material";
import {
  DEFAULT_ERROR_OBJECT,
  buildFieldError,
  resetFieldError,
} from "../../utils/ValidationUtils";
import { useState } from "react";
import { isBlank } from "underscore.string";
import { useNoteStore } from "@/lib/stores/NoteStore";
import StyledDialogActions from "../styled/StyledDialogActions";
import { CREATE_ACTION, EDIT_ACTION } from "@/constants/ActionConstants";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  "&.MuiDialogContent-root": {
    paddingTop: "1em",
  },
});

const DEFAULT_NOTE = { id: "", title: "", content: "" };

export default function NoteFormDialog(props) {
  const { action = CREATE_ACTION, note = DEFAULT_NOTE, ...dialogProps } = props;
  const mobile = useMediaQuery("(max-width: 500px)");
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [titleError, setTitleError] = useState(DEFAULT_ERROR_OBJECT);
  const [contentError, setContentError] = useState(DEFAULT_ERROR_OBJECT);
  const addNote = useNoteStore((state) => state.addNote);
  const updateNote = useNoteStore((state) => state.updateNote);
  const navigate = useNavigate();

  function buildTitleError() {
    buildFieldError(setTitleError, "Title must not be blank");
  }

  function resetTitleError() {
    resetFieldError(setTitleError);
  }

  function buildContentError() {
    buildFieldError(setContentError, "Content must not be blank");
  }

  function resetContentError() {
    resetFieldError(setContentError);
  }

  function resetState() {
    resetTitleError();
    resetContentError();
    setTitle("");
    setContent("");
  }

  function handleTitleChange(event) {
    const { value } = event.target;
    setTitle(value);
    if (isBlank(value)) {
      buildTitleError();
      return;
    }
    resetTitleError();
  }

  function handleContentChange(event) {
    const { value } = event.target;
    setContent(value);
    if (isBlank(value)) {
      buildContentError();
      return;
    }
    resetContentError();
  }

  function handleClose() {
    resetState();
    dialogProps.onClose();
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

    const timestamp = dayjs();

    if (action === CREATE_ACTION) {
      const id = crypto.randomUUID();
      addNote({ id, title, timestamp, content });
    } else if (action === EDIT_ACTION) {
      updateNote({ id: note.id, title, timestamp, content });
      navigate(0);
    }

    handleClose();
  }

  return (
    <Dialog fullScreen={mobile} fullWidth {...dialogProps}>
      <DialogTitle>Create a note</DialogTitle>
      <StyledDialogContent>
        <TextField
          variant="standard"
          label="Title"
          error={titleError.error}
          helperText={titleError.message}
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          variant="standard"
          label="Content"
          placeholder="Start typing"
          error={contentError.error}
          helperText={contentError.message}
          value={content}
          onChange={handleContentChange}
          multiline
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </StyledDialogActions>
    </Dialog>
  );
}
