import { Typography, styled } from "@mui/material";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import NotePreview from "./NotePreview";
import NoteCreationDialog from "../utils/NoteCreationDialog";
import { useDeferredValue, useEffect, useState } from "react";
import StyledFab from "../styled/StyledFab";
import { useNoteStore } from "@/lib/stores/NoteStore";

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
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const _notes = useNoteStore((state) => state.notes);
  const [notes, setNotes] = useState(_notes);
  const areNotesEmpty = notes.length === 0;

  useEffect(() => {
    const filteredNotes = _notes.filter(note => note.title.toLowerCase().includes(deferredQuery));
    setNotes(filteredNotes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery]);

  function handleDialogOpen(event) {
    event.preventDefault();
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function renderNotes() {
    if (areNotesEmpty) {
      return (
        <Typography
          align="center"
          color="text.secondary"
          variant="h5"
          lineHeight={2}
        >
          There are no notes.
          <br />
          Create your first note
        </Typography>
      );
    }

    return (
      <StyledBox>
        {notes.map((note) => (
          <NotePreview key={note.id} note={note} />
        ))}
      </StyledBox>
    );
  }

  return (
    <>
      <StyledSearch
        placeholder="Search"
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      {renderNotes()}
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
