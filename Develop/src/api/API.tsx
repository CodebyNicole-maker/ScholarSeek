// const searchGithub = async () => {
//   try {
//     const start = Math.floor(Math.random() * 100000000) + 1;
//     // console.log(import.meta.env);
//     const response = await fetch(
//       `https://api.github.com/users?since=${start}`,
//       {
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
//         },
//       }
//     );
//     // console.log('Response:', response);
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error('invalid API response, check the network tab');
//     }
//     // console.log('Data:', data);
//     return data;
//   } catch (err) {
//     // console.log('an error occurred', err);
//     return [];
//   }
// };

// const searchGithubUser = async (username: string) => {
//   try {
//     const response = await fetch(`https://api.github.com/users/${username}`, {
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
//       },
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error('invalid API response, check the network tab');
//     }
//     return data;
//   } catch (err) {
//     // console.log('an error occurred', err);
//     return {};
//   }
// };

// export { searchGithub, searchGithubUser };

const GITHUB_API_URL = "https://api.github.com/users";

/**
 * Fetch a list of GitHub users starting from a random user ID.
 * @returns {Promise<any[]>} An array of GitHub user objects or an empty array on failure.
 */
const searchGithub = async (): Promise<any[]> => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
      throw new Error("❌ GitHub API Token is missing! Check your .env file.");
    }

    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log(`🔍 Fetching GitHub users since ID: ${start}...`);

    const response = await fetch(`${GITHUB_API_URL}?since=${start}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      console.error(`⚠️ GitHub API Error ${response.status}: ${response.statusText}`);

      if (response.status === 403) {
        console.warn("🚨 API Rate Limit Exceeded. Try again later.");
      }
      if (response.status === 401) {
        console.warn("⚠️ 401 Unauthorized: Check if your GitHub token is valid.");
      }

      throw new Error(`Invalid API response: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Successfully fetched GitHub users:", data);

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("❌ Error fetching GitHub users:", err);
    return [];
  }
};

/**
 * Fetch detailed information about a specific GitHub user.
 * @param {string} username - The GitHub username.
 * @returns {Promise<Candidate | null>} A Candidate object or null if an error occurs.
 */
const searchGithubUser = async (username: string): Promise<Candidate | null> => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
      throw new Error("❌ GitHub API Token is missing! Check your .env file.");
    }

    console.log(`🔍 Fetching details for user: ${username}...`);

    const response = await fetch(`${GITHUB_API_URL}/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      console.error(`⚠️ GitHub API Error ${response.status}: ${response.statusText}`);

      if (response.status === 403) {
        console.warn("🚨 API Rate Limit Exceeded. Try again later.");
      }
      if (response.status === 401) {
        console.warn("⚠️ 401 Unauthorized: Check if your GitHub token is valid.");
      }

      throw new Error(`Invalid API response for ${username}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Successfully fetched user details:", data);

    return {
      login: data.login,
      name: data.name || "No Name Available",
      avatar_url: data.avatar_url || "",
      email: data.email || "Email not provided",
      company: data.company || "Company not listed",
      location: data.location || "Location unknown",
      html_url: data.html_url,
    };
  } catch (err) {
    console.error(`❌ Error fetching details for user ${username}:`, err);
    return null;
  }
};

export { searchGithub, searchGithubUser };