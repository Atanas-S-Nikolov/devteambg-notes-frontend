import { styled } from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { NOTE_URL } from "@/constants/UrlConstants";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledCardHeader = styled(CardHeader)({
  "& .MuiCardHeader-content": {
    width: "100%",
  },
});

const DEFAULT_ELEVATION = 3;

export default function NotePreview({ note }) {
  const { id, title, content } = note;
  const [elevation, setElevation] = useState(DEFAULT_ELEVATION);

  function handleMouseEnter() {
    setElevation(10);
  }

  function handleMouseLeave() {
    setElevation(DEFAULT_ELEVATION);
  }

  return (
    <Link to={`${NOTE_URL}/${id}`}>
      <Card
        elevation={elevation}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <StyledCardHeader
          title={title}
          titleTypographyProps={{ noWrap: true }}
        />
        <CardContent>
          <Typography noWrap>{content}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
