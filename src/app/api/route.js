// Import necessary modules (this may vary depending on your environment)
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // GitHub repository details
    const repoOwner = 'john-zanecoder';
    const repoName = 'github-clone';
    
    // Construct the GitHub API URL for pull requests
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`;
    
    // Fetch data from GitHub API
    const response = await fetch(url);
    
    // Check if the response is successful
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch pull requests from GitHub' }, { status: response.status });
    }

    // Parse the response JSON
    const pullRequests = await response.json();

    // Return the pull requests data
    return NextResponse.json(pullRequests);
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    return NextResponse.json({ error: 'Error fetching pull requests' }, { status: 500 });
  }
}
