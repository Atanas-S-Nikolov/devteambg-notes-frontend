import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import { useParams } from "react-router-dom";
import { useNoteStore } from "../../lib/stores/NoteStore";
import NoteActions from "../utils/NoteActions";

export default function Note() {
  const { noteId } = useParams();
  const getNote = useNoteStore((state) => state.getNote);
  const note = getNote(noteId);
  const { title, content } = note;

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant="h4" marginBottom={2}>
              {title}
            </Typography>
          }
          action={<NoteActions note={note} />}
        />
        <CardContent>
          <Typography paragraph>{content}</Typography>
        </CardContent>
      </Card>
    </>
  );
}
