import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Chart from '../components/Chart';
import { getSummaryChartData } from '../api';

const Summary = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await getSummaryChartData();
        setChartData(data);
      } catch (error) {
        setError('Failed to load chart data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container" role="alert">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Fundraising Summary</h1>
        <div className="chart-container">
          <Chart 
            type="bar" 
            data={chartData?.data} 
            title={chartData?.title} 
          />
          <div className="chart-description">
            <p>{chartData?.description}</p>
            <p><strong>Source:</strong> {chartData?.source}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
