// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string;       // GitHub username
    name: string | null; // Full name (can be null)
    avatar_url: string;  // Profile picture URL
    email: string | null; // Email (can be null)
    company: string | null; // Company name (can be null)
    location: string | null; // Location (can be null)
    html_url: string;    // GitHub profile URL
  }
  
  import { useState, useEffect } from "react";
// import { Candidate } from "../types"; // Import the interface

const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Simulate fetching candidates from an API
    const fetchCandidates = async () => {
      const response = await fetch("https://api.github.com/users");
      const data: Candidate[] = await response.json();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <h1>GitHub Candidates</h1>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.login}>
            <img src={candidate.avatar_url} alt={candidate.name || "Candidate"} width="50" />
            <strong>{candidate.name || "No Name"}</strong>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
