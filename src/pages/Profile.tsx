import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useAuth } from '../contexts/AuthContext';
import type Gist from '../interfaces/gist';
import { useEffect, useState } from 'react';
import CodeViewer from '../components/CodeViewer';
import api from '../services/api';
import { formatDistanceToNow } from 'date-fns';
// import CustomPagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { userData } = useAuth();
  const [gists, setGists] = useState<Gist[]>([]);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState<boolean>(true);
	// const [error, setError] = useState<string | null>(null);

  //bring gists from api
  useEffect(() => {
		const fetchGists = async () => {
			try {
				const response = await api.get<Gist[]>('/gists');
				console.log(response.data);
				setGists(response.data);
			} catch (error) {
				console.error('Error fetching gists:', error);
				// setError('Failed to load gists.');
			} finally {
				// setLoading(false);
			}
		};
		fetchGists();
	}, []);
  
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid size={{ xs: 12, md: 3 }} sx={{ textAlign: 'center' }}>
          <Avatar
            src={userData?.avatar_url}
            sx={{ width: 300, height: 300, margin: 'auto' }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {userData?.login}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#153f3f' }}
          >
            View GitHub Profile
          </Button>
        </Grid>

        {/* Gist Section */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              All Gists
            </Typography>
            <Box
              sx={{
                backgroundColor: '#1B2C32', // dark teal-like
                color: 'white',
                width: 24,
                height: 24,
                borderRadius: '50%',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              <Typography>
                {gists.length}
              </Typography>
            </Box>
          </Box>
          

          {[...gists].map((gist, index) => (
            <Paper key={index} variant="outlined" sx={{ mb: 4, p: 2 }}>
              {/* Code Preview */}
              <CodeViewer
                language={gist?.files && Object.keys(gist.files).length > 0 ? gist.files[Object.keys(gist.files)[0]]?.language : ''}
                rawUrl={gist?.files && Object.keys(gist.files).length > 0 ? gist.files[Object.keys(gist.files)[0]]?.raw_url  : ''}
                filename={gist?.files && Object.keys(gist.files).length > 0 ? gist.files[Object.keys(gist.files)[0]]?.filename : ''}
                height="400px"
              >
              </CodeViewer>

              {/* File Tag */}
              <Box
                sx={{
                  textAlign: 'right',
                  mt: 1
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: '#153f3f', borderRadius: '4px' }}
                  onClick={()=>{navigate(`/gist/${gist.id}`)}}
                >
                  View <b style={{ marginLeft: 4 }}>{gist.files && Object.keys(gist.files).length > 0 ? gist.files[Object.keys(gist.files)[0]]?.filename || '' : ''}</b>
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Metadata */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={userData?.avatar_url}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ maxWidth: 300, fontWeight: 'bold' }}
                    >
                      {gist.owner.login} / {gist.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Created {formatDistanceToNow(new Date(gist.created_at), { addSuffix: true })}
                    </Typography>
                    <br />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                    >
                      {gist.description}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                  <IconButton>
                    <StarBorderIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}

          {/* Pagination */}
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2
            }}
          >
            <CustomPagination
              totalPages={14}
              page={1}
              onPageChange={(page) => {
                console.log(page);
              }}
            />
          </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
}
