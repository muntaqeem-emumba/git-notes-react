import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  Link,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import type Gist from "../interfaces/gist";
import { useNavigate } from "react-router-dom";
import CodeViewer from "./CodeViewer";

// const dummyGists = Array(6).fill({
//   code: `{
//   "name": "vercel-monorepo",
//   "version": "0.0.0",
//   "private": true,
//   "license": "Apache-2.0",
//   "packageManager": "pnpm@8.3.1",
//   "dependencies": {
//     "lerna": "5.6.2"
//   },
//   "devDependencies": {}
// }`,
//   avatarUrl: "https://i.pravatar.cc/40",
//   name: "John Doe",
//   gistName: "a very long gist name that will overflow gracefully",
//   createdAt: "7 hours ago",
//   description: "A very long gist description that will overflow",
// });

const GistCard: React.FC<Gist> = (gist: Gist) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 2,
        transition: "0.2s ease",
        boxShadow: hovered ? 3 : 1,
        border: hovered ? "1px solid #1e3a3a" : "1px solid transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floating top-right link */}
      {hovered && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: "#0f172a",
            color: "white",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: "12px",
          }}
        >
          <Link
            onClick={() => navigate(`/gist/${gist.id}`)}
            target="_blank"
            rel="noopener"
            underline="none"
            color="inherit"
          >
            <Typography>{"vercel_package.json"}</Typography>
          </Link>
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Code Block */}
        {gist.files && Object.keys(gist.files).length > 0 && (
          <CodeViewer
            rawUrl={gist.files[Object.keys(gist.files)[0]].raw_url}
            language={gist.files[Object.keys(gist.files)[0]].language}
            filename={gist.files[Object.keys(gist.files)[0]].filename}
            height="200px"
          />
        )}

        {/* User Info */}
        <Stack direction="row" spacing={1} alignItems="center" mt={2}>
          <Avatar src={gist.owner.avatar_url} sx={{ width: 32, height: 32 }} />
          <Typography variant="body2" fontWeight="bold">
            {gist.owner.login}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 130,
            }}
          >
            {gist.owner.login}
          </Typography>
        </Stack>

        {/* Meta */}
        <Typography variant="caption" color="text.secondary">
          Created {gist.created_at}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {gist.description || "No Description"}
        </Typography>
      </CardContent>

      {/* Action Icons */}
      <Stack direction="row" justifyContent="flex-end" spacing={1} p={1}>
        <Tooltip title="Share">
          <IconButton>
            <ShareIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Star">
          <IconButton>
            <StarOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  );
};

export default GistCard;
