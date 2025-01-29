'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from '@/components/ui/select';

const GitHubRepoPage = () => {
  const [pullRequests, setPullRequests] = useState([]);
  const [filter, setFilter] = useState('open');

  useEffect(() => {
    // Fetch pull requests using GitHub API
    fetch('https://api.github.com/repos/owner/repo/pulls?state=all')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch pull requests');
        return res.json();
      })
      .then((data) => setPullRequests(data))
      .catch((error) => console.error('Error fetching pull requests:', error));
  }, []);

  const filteredPRs = pullRequests.filter(
    (pr) => filter === 'all' || pr.state === filter
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">zaneCoder / mortdash</div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Code
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Issues
            </a>
            <a href="#" className="text-white font-semibold">
              Pull Requests
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Actions
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Projects
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Type / to search"
            className="bg-gray-700 placeholder-gray-400 text-white"
          />
          <Button className="bg-green-600 hover:bg-green-700">
            New Pull Request
          </Button>
        </div>
      </div>

      {/* Filters and PR List */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Select onValueChange={(value) => setFilter(value)} value={filter}>
            <SelectTrigger className="bg-gray-700 text-white">
              <SelectValue placeholder="Filter Pull Requests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pull Request Cards */}
        <div className="space-y-4">
          {filteredPRs.length > 0 ? (
            filteredPRs.map((pr) => (
              <Card key={pr.id} className="bg-gray-800">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-white">{pr.title}</h2>
                    <p className="text-sm text-gray-400">
                      #{pr.number} opened by {pr.user?.login}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold text-white ${
                      pr.state === 'open' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {pr.state}
                  </span>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-400">No pull requests found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubRepoPage;
