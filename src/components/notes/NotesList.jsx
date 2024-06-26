import { Typography, styled } from "@mui/material";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import NotePreview from "./NotePreview";
import NoteFormDialog from "../utils/NoteFormDialog";
import { useDeferredValue, useEffect, useState } from "react";
import StyledFab from "../styled/StyledFab";
import { useNoteStore } from "@/lib/stores/NoteStore";
import { isBlank } from "underscore.string";

const StyledSearch = styled(TextField)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  marginBottom: "2em",
}));

const StyledBox = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
    if (isBlank(deferredQuery)) {
      setNotes(_notes);
      return;
    }
    const filteredNotes = _notes.filter((note) =>
      note.title.toLowerCase().includes(deferredQuery)
    );
    setNotes(filteredNotes);
  }, [_notes, deferredQuery]);

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
        <Typography align="center" color="text.secondary" variant="h5">
          Could not find notes
        </Typography>
      );
    }

    return (
      <StyledBox>
        {notes
          .sort((n1, n2) => new Date(n2.timestamp) - new Date(n1.timestamp))
          .map((note) => (
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
      {dialogOpen ? (
        <NoteFormDialog open={dialogOpen} onClose={handleDialogClose} />
      ) : null}
    </>
  );
}
