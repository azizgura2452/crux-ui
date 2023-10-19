import './App.css';
import Home from './pages/home/container';
import { Box } from '@mui/material';

function App() {
  return (
    <Box p={3} sx={{width: '1020px', margin: '0 auto'}}>
      <Home />
    </Box>
  );
}

export default App;
