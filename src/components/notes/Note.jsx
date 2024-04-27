import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import { useParams } from "react-router-dom";
import { useNoteStore } from "@/lib/stores/NoteStore";
import NoteActions from "../utils/NoteActions";
import dayjs from "dayjs";
import { DEFAULT_DATE_TIME_FORMAT } from "@/constants/DateTimeConstants";
import RootLayout from "../Layout";
import { useMediaQuery } from "@mui/material";

export default function Note() {
  const { noteId } = useParams();
  const getNote = useNoteStore((state) => state.getNote);
  const note = getNote(noteId);
  const { title, content, timestamp } = note;
  const mobile = useMediaQuery("(max-width: 550px)", { defaultMatches: false });
  const titleVariant = mobile ? "h5" : "h4";

  return (
    <RootLayout>
      <Card>
        <CardHeader
          title={
            <Typography variant={titleVariant} marginBottom={2}>
              {title}
            </Typography>
          }
          subheader={dayjs(timestamp).format(DEFAULT_DATE_TIME_FORMAT)}
          action={<NoteActions note={note} />}
        />
        <CardContent>
          <Typography whiteSpace="pre-wrap" paragraph>
            {content}
          </Typography>
        </CardContent>
      </Card>
    </RootLayout>
  );
}
