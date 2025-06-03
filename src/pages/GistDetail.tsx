import {
  Avatar,
  Box,
  Divider,
  Typography,
  Stack,
  Paper
} from '@mui/material';
import ForkButton from '../components/ForkButton';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import CodeViewer from '../components/CodeViewer';
import type Gist from '../interfaces/gist';
import { formatDistanceToNow } from 'date-fns';

export default function GistDetail() {
  const { id } = useParams<{ id: string }>();
  const [gist, setGist] = useState<Gist | null>(null);
  useEffect(() => {
    const fetchGist = async () => {
      const response = await api.get(`/gists/${id}`);
      console.log(response.data);
      setGist(response.data as Gist);
    };
    fetchGist();
  }, [id]);
  return (
    <Box sx={{ p: 4 }}>
      {gist ? (
        <Paper elevation={0} sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={gist?.owner.avatar_url} alt={gist?.owner.login} />
            <Box>
              <Typography variant="subtitle1">
                <b>{gist?.owner.login}</b> / <span style={{ color: '#6c757d' }}>{gist?.description}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created {formatDistanceToNow(new Date(gist?.created_at), { addSuffix: true })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {gist?.description}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Action Buttons */}
            <Stack direction="row" spacing={1}>
              <ForkButton name="fork" count={18} />
              <ForkButton name="star" count={18} />
            </Stack>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* File Name */}
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {gist?.files && Object.keys(gist.files).length > 0 ? gist.files[Object.keys(gist.files)[0]].filename : ''}
          </Typography>

          {/* Code Viewer */}
          <CodeViewer 
            rawUrl={gist?.files && Object.keys(gist.files).length > 0 ? gist.files[Object.keys(gist.files)[0]].raw_url : ''}
            language={gist?.files && Object.keys(gist.files).length > 0 ? gist.files[Object.keys(gist.files)[0]].language : ''}
            filename={gist?.files && Object.keys(gist.files).length > 0 ? gist.files[Object.keys(gist.files)[0]].filename : ''}
          >
          </CodeViewer>
        </Paper>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}