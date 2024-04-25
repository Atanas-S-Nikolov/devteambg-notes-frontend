import { styled } from "@mui/material";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import NotePreview from "./NotePreview";
import { notes } from "@/constants/Notes";
import NoteCreationDialog from "../utils/NoteCreationDialog";
import { useState } from "react";
import StyledFab from "../styled/StyledFab";

const StyledSearch = styled(TextField)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  marginBottom: "2em",
}));

const StyledBox = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1em",
}));

export default function NotesList() {
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleDialogOpen(event) {
    event.preventDefault();
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  return (
    <>
      <StyledSearch
        placeholder="Search"
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <StyledBox>
        {notes.map((note) => (
          <NotePreview key={note.id} note={note} />
        ))}
      </StyledBox>
      <StyledFab
        aria-label="Add note"
        color="primary"
        onClick={handleDialogOpen}
      >
        <AddIcon />
      </StyledFab>
      <NoteCreationDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
}
