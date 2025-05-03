import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getDashboardContent } from '../api';

const Dashboard = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getDashboardContent();
        setContent(data);
      } catch (error) {
        setError('Failed to load dashboard content');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container" role="alert">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>{content?.title}</h1>
        <article>
          <h2>Latest News</h2>
          <p>{content?.summary}</p>
          <p>
            <strong>Source:</strong> <a href={content?.source} target="_blank" rel="noopener noreferrer">{content?.source}</a>
          </p>
        </article>
        <section>
          <h2>Technical Details</h2>
          <p>{content?.techDetails}</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
