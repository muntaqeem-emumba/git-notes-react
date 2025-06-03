import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import type Gist from "../interfaces/gist";
import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";

export default function GistList({ gists }: { gists: Gist[] }) {
  const navigate = useNavigate();

  const goToDetail = (gist: Gist) => {
    navigate(`/gist/${gist.id}`);
  }

  return (
    <Box sx={{ p: 4, height: '20%'}}>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Notebook Name</b></TableCell>
              <TableCell><b>Keyword</b></TableCell>
              <TableCell><b>Updated</b></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gists.map((gist) => (
              <TableRow key={gist.id} onClick={() => goToDetail(gist)}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={gist.owner.avatar_url} alt={gist.owner.login} />
                    <Typography>{gist.owner.login}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{gist?.files && Object.keys(gist.files)[0]}</TableCell>
                <TableCell>
                  <Chip label="Keyword" sx={{ borderRadius: '999px', backgroundColor: "#1e3a3a", color: "white" }} />
                </TableCell>
                <TableCell>{formatDistanceToNow(new Date(gist.updated_at), { addSuffix: true })}</TableCell>
                <TableCell align="right">
                  <IconButton><ShareIcon /></IconButton>
                  <IconButton><StarBorderIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
