'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const PullRequestList = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [filter, setFilter] = useState('open'); // 'open' or 'closed'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPullRequests();
  }, [filter]);

  const fetchPullRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/'); // Replace with your Next.js API route
      const data = await response.json();

      if (response.ok) {
        // Filter pull requests based on the selected filter ('open' or 'closed')
        const filteredPRs = data.filter((pr) => pr.state === filter);
        setPullRequests(filteredPRs);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching pull requests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d1117] text-white min-h-screen p-4">
      {/* Header */}
      <div>
       
      </div>
      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Filters"
          className="bg-[#161b22] text-white border-none w-1/3"
        />
        <Button className="bg-[#238636] text-white px-4 py-2">New pull request</Button>
      </div>

      {/* Card */}
      <Card className="bg-[#161b22] border-none">
        <CardContent>
          {/* Header Section */}
          <div className="flex justify-between items-center border-b border-[#30363d] pb-4 mb-4">
            <div className="flex items-center gap-4">
              <Checkbox className="text-[#c9d1d9]" />
              <Button
                onClick={() => setFilter('open')}
                className={`px-4 py-2 ${
                  filter === 'open' ? 'bg-[#238636] text-white' : 'bg-[#30363d] text-[#c9d1d9]'
                }`}
              >
                Open
              </Button>
              <Button
                onClick={() => setFilter('closed')}
                className={`px-4 py-2 ${
                  filter === 'closed' ? 'bg-[#238636] text-white' : 'bg-[#30363d] text-[#c9d1d9]'
                }`}
              >
                Closed
              </Button>
            </div>
            <span className="font-medium text-sm text-[#c9d1d9]">
              {pullRequests.length} {filter === 'open' ? 'Open' : 'Closed'}
            </span>
          </div>

          {/* Pull Request List */}
          {loading ? (
            <div className="text-center text-[#8b949e]">Loading...</div>
          ) : (
            <ul className="space-y-4">
              {pullRequests.map((pr) => (
                <li
                  key={pr.id}
                  className="flex justify-between items-center border-b border-[#30363d] pb-2"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox className="text-[#c9d1d9]" />
                    <span className="text-[#58a6ff] font-medium">{pr.title}</span>
                  </div>
                  <div className="text-sm text-[#8b949e]">
                    #{pr.number} opened {new Date(pr.created_at).toLocaleDateString()} by {pr.user.login}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PullRequestList;
