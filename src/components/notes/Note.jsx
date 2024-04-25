import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";
import { notes } from "../../constants/Notes";

export default function Note() {
  const { noteId } = useParams();
  const { title, content } = notes.find((note) => note.id == noteId);

  const StyledCard = styled(Card)(({
    display: "inherit",
    padding: "5%",
  }));

  return (
    <StyledCard>
      <CardHeader
        title={
          <Typography variant="h4" marginBottom={2}>
            {title}
          </Typography>
        }
      />
      <CardContent>
        <Typography paragraph>{content}</Typography>
      </CardContent>
    </StyledCard>
  );
}
