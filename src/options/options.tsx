import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { getStoredOptions, LocalStorageOptions, setStoredOptions } from '../utils/storage';

type FormState = 'ready' | 'saving';

const App = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('ready');

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleSave = () => {
    setFormState('saving');
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('ready');
      }, 1000);
    });
  };

  if (!options) {
    return null;
  }

  const isFieldDisabld = formState === 'saving';

  return (
    <Box mx={'10%'} my={'2%'}>
      <Card>
        <CardContent>
          <Grid spacing={4} container direction={'column'}>
            <Grid>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">Home city name:</Typography>
              <TextField
                onChange={(e) => handleHomeCityChange(e.target.value)}
                value={options.homeCity}
                fullWidth
                placeholder="Enter a home city name"
                disabled={isFieldDisabld}
              />
            </Grid>
            <Grid>
              <Button
                disabled={isFieldDisabld}
                onClick={handleSave}
                variant="contained"
                color="primary"
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
