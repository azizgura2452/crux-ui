import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  CircularProgress,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import DataTable from '../../components/DataTable';
import { REGEX_WEBSITE } from '../../utils';
import '../../assets';
import useFetchReportData from '../../hooks/FetchReportHook';

const Home = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const { reportData, loading, error, fetchReportData } = useFetchReportData(); // Use the custom hook

  const handleInputChange = (e) => {
    const newInputUrl = e.target.value;
    setInputUrl(newInputUrl);
    if (invalidUrl) {
      setInvalidUrl(false); // Reset the invalidUrl state when input changes from invalid to valid
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const urls = inputUrl.split(',');
    const isValid = urls.every(url => REGEX_WEBSITE.test(url.trim()));
    if (!isValid)
      setInvalidUrl(!invalidUrl);
    else if (inputUrl && inputUrl !== '')
      fetchReportData(urls);
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
