import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
// import Editor from '@monaco-editor/react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const CreateGist: React.FC = () => {
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('');
  const [content, setContent] = useState('{}');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      const text = await file.text();
      setContent(text);
    }
  };

  return (
    <Box p={4} maxWidth="1000px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Create Gist
      </Typography>

      <TextField
        fullWidth
        label="Gist Description"
        variant="outlined"
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        fullWidth
        label="Filename including extension..."
        variant="outlined"
        margin="normal"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
      />

      <Box mt={2} height="400px">
        <SyntaxHighlighter
					language="json"
					customStyle={{ margin:10, padding: 16, height: '90%' }}
					showInlineLineNumbers={true}
          showLineNumbers={true}
        >
          {content}
        </SyntaxHighlighter>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" component="label" sx={{
          backgroundColor: '#f2f2f2',
          color: '#1f2d30',
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#e6e6e6',
            boxShadow: 'none',
          },
        }}>
          Add file
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>

        <Button variant="contained" sx={{ backgroundColor: '#153f3f', color: '#fff' }}>
          Create Gist
        </Button>
      </Box>
    </Box>
  );
};

export default CreateGist;
