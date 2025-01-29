// app/api/github-pulls/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const repoOwner = 'john-zanecoder';
    const repoName = 'github-clone';
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Add your GitHub token here
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch pull requests from GitHub' },
        { status: response.status }
      );
    }

    const pullRequests = await response.json();
    return NextResponse.json(pullRequests);
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    return NextResponse.json(
      { error: 'Error fetching pull requests' },
      { status: 500 }
    );
  }
}
