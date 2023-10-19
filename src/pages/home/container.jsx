import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {
  CircularProgress,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import DataTable from '../../components/DataTable';
import { REGEX_WEBSITE } from '../../utils';
import '../../assets'

const Home = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const urls = inputUrl.split(',');
    const isValid = urls.every(url => {
      return REGEX_WEBSITE.test(url.trim()); // Use .test on the regular expression
    });
    if (!isValid)
      setInvalidUrl(!invalidUrl);
    else if (inputUrl && inputUrl !== '')
      getReportData();
  };


  const getReportData = () => {
    setLoading(true);
    setReportData([]);
    setError(''); // Reset the error

    const urls = inputUrl.split(',');
    Promise.all(
      urls.map((url) =>
        axios
          .post('http://localhost:4000/crux/report', { url: url.trim() })
          .then((res) => res.data)
          .catch((error) => {
            console.error('Axios Error:', error);
            return { error: true };
          })
      )
    )
      .then((results) => {
        setReportData(results);
        setLoading(false);
        setInvalidUrl(false)
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Paper elevation={1}>
      <Box p={3}>
        <Typography variant='h4'>Chrome UX Report Dashboard</Typography>
        <Box mt={2}>
          <form onSubmit={handleSubmit} method='POST' className='form'>
            <TextField
              label="Enter URL(s)"
              variant="outlined"
              value={inputUrl}
              onChange={handleInputChange}
              fullWidth
              required
              error={invalidUrl}
              helperText={invalidUrl ? 'Please enter valid URL' : null}
            />
            <FormHelperText>
              {!invalidUrl ? 'Please use comma (,) separated URL(s)' : ''}
            </FormHelperText>
            <Button variant="contained" color="primary" type='submit'>
              <Typography variant='button'>SUBMIT</Typography>
            </Button>
          </form>
        </Box>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            {loading && <center><CircularProgress /></center>}
            {error !== '' && <center><Typography variant='h4'>{error}</Typography></center>}
            {reportData &&
              reportData.length > 0 &&
              reportData.map((report, index) => (
                report.error ? (
                  <center key={index}><Typography variant='h5' mt={1} mb={1}>Chrome UX report not found for {inputUrl.split(',')[index].trim()}!</Typography></center>
                ) : (
                  <DataTable key={index} data={report} />
                )
              ))}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Home;
