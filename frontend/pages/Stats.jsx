import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';

const Stats = () => {
  const [statsList, setStatsList] = useState([]);

  // Replace with actual stored shortcodes
  const storedShortcodes = JSON.parse(localStorage.getItem('shortcodes')) || [];

  useEffect(() => {
    const fetchStats = async () => {
      const allStats = [];

      for (let code of storedShortcodes) {
        try {
          const res = await axios.get(`http://localhost:8000/shorturls/${code}`);
          allStats.push({ code, ...res.data });
        } catch (err) {
          console.error(`Error fetching stats for ${code}`);
        }
      }

      setStatsList(allStats);
    };

    fetchStats();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>📊 URL Statistics</Typography>

      {statsList.length === 0 ? (
        <Typography>No stats found. Try shortening some URLs first.</Typography>
      ) : (
        statsList.map((item) => (
          <Card key={item.code} sx={{ my: 2, p: 2 }}>
            <CardContent>
              <Typography variant="h6">🔗 Short URL:</Typography>
              <Typography color="primary">
                <a href={`http://localhost:8000/${item.code}`} target="_blank" rel="noreferrer">
                  http://localhost:8000/{item.code}
                </a>
              </Typography>
              <Typography>Original URL: {item.longUrl}</Typography>
              <Typography>Created At: {new Date(item.createdAt).toLocaleString()}</Typography>
              <Typography>Expires At: {new Date(item.expiry).toLocaleString()}</Typography>
              <Typography>Total Clicks: {item.totalClicks}</Typography>

              <Divider sx={{ my: 1 }} />

              {item.clicks.length > 0 ? (
                <Grid container spacing={1}>
                  {item.clicks.map((click, i) => (
                    <Grid item xs={12} key={i}>
                      <Typography variant="body2">
                        #{i + 1} - {new Date(click.timestamp).toLocaleString()} | Referrer: {click.referrer} | Location: {click.location}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2">No clicks recorded yet.</Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Stats;
