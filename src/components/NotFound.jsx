import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const StyledDiv = styled("div")({
  display: "grid",
  placeItems: "center",
});

export default function NotFound() {
  return (
    <StyledDiv>
      <SentimentVeryDissatisfiedIcon />
      <Typography>404 Not Found</Typography>
    </StyledDiv>
  )
}
