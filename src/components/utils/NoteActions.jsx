import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { Typography } from "@mui/material";
import StyledDialogActions from "../styled/StyledDialogActions";
import { useNoteStore } from "../../lib/stores/NoteStore";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/constants/UrlConstants";
import NoteFormDialog from "./NoteFormDialog";
import { EDIT_ACTION } from "../../constants/ActionConstants";

export default function NoteActions({ note }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const removeNote = useNoteStore((state) => state.removeNote);
  const navigate = useNavigate();

  function handleMenuOpen(event) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleUpdateDialogOpen(event) {
    event.preventDefault();
    setUpdateDialogOpen(true);
    handleMenuClose();
  }

  function handleUpdateDialogClose() {
    setUpdateDialogOpen(false);
  }

  function handleDeleteDialogOpen(event) {
    event.preventDefault();
    setDeleteDialogOpen(true);
    handleMenuClose();
  }

  function handleDeleteDialogClose() {
    setDeleteDialogOpen(false);
  }

  function handleDelete() {
    removeNote(note);
    navigate(HOME_URL);
  }

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleUpdateDialogOpen}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteDialogOpen}>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Delete</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
      {updateDialogOpen ? (
        <NoteFormDialog
          action={EDIT_ACTION}
          note={note}
          open={updateDialogOpen}
          onClose={handleUpdateDialogClose}
        />
      ) : null}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Do you want to delete this note?</DialogTitle>
        <DialogContent>
          This is destructive action. You cannot restore this note later.
        </DialogContent>
        <StyledDialogActions>
          <Button color="primary" onClick={handleDeleteDialogClose}>
            No, keep it
          </Button>
          <Button color="error" onClick={handleDelete}>
            Yes, delete note
          </Button>
        </StyledDialogActions>
      </Dialog>
    </>
  );
}
