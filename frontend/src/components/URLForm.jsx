import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const URLForm = () => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8000/shorturls', {
        url,
        validity: validity ? parseInt(validity) : undefined,
        shortcode: shortcode || undefined,
      });

      setResponse(res.data);

      // Save shortcode to localStorage for stats page
      const old = JSON.parse(localStorage.getItem('shortcodes')) || [];
      const newCode = res.data.shortLink.split('/').pop();
      if (!old.includes(newCode)) {
        localStorage.setItem('shortcodes', JSON.stringify([...old, newCode]));
      }

      // Clear fields
      setUrl('');
      setValidity('');
      setShortcode('');
    } catch (err) {
      alert(err?.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Long URL"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Validity (minutes)"
        type="number"
        fullWidth
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Preferred Shortcode (optional)"
        fullWidth
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Shorten
      </Button>

      {response && (
        <Typography sx={{ mt: 2 }}>
          Short Link:{' '}
          <a href={response.shortLink} target="_blank" rel="noopener noreferrer">
            {response.shortLink}
          </a>
          <br />
          Expires At: {new Date(response.expiry).toLocaleString()}
        </Typography>
      )}
    </Box>
  );
};

export default URLForm;
