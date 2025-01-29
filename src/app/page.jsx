'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GitHubIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('https://api.github.com/repos/OWNER/REPO/issues', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });
        setIssues(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching issues:', error);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f8fa', minHeight: '100vh', padding: '20px' }}>
      <header style={{ backgroundColor: '#24292e', color: '#ffffff', padding: '16px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>GitHub Issues</h1>
      </header>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <h2 style={{ color: '#24292e', marginBottom: '16px' }}>{issues.length} Open</h2>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e1e4e8', borderRadius: '6px' }}>
          {issues.map(issue => (
            <div key={issue.id} style={{ padding: '16px', borderBottom: '1px solid #e1e4e8' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#24292e', fontWeight: '600', fontSize: '16px' }}>{issue.title}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#586069' }}>
                #{issue.number} opened on {new Date(issue.created_at).toLocaleDateString()} by {issue.user.login}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubIssuesPage;