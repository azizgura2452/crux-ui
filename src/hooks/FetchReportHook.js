import { useState } from 'react';
import axios from 'axios';

const useFetchReportData = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_URL = 'https://crux-api.onrender.com/crux'
  //const API_URL = 'https://localhost:4000/crux'

  const fetchReportData = (urls) => {
    setLoading(true);
    setReportData([]);
    setError('');

    Promise.all(
      urls.map((url) =>
        axios
          .post(`${API_URL}/report`, { url: url.trim() })
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
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return { reportData, loading, error, fetchReportData };
};

export default useFetchReportData;
