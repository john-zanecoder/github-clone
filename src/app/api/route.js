export async function GET(req) {
  try {
    const repoOwner = process.env.REPO_OWNER;
    const repoName = process.env.REPO_NAME;

    // Get the 'state' parameter from the query
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state') || 'open'; // Default to 'open'

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=${state}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Make sure your token is set in the .env file
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
