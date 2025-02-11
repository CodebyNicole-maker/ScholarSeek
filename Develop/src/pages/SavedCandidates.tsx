// const SavedCandidates = () => {
//   return (
//     <>
//       <h1>Potential Candidates</h1>
//     </>
//   );
// };

// export default SavedCandidates;

// import { useState, useEffect } from "react";


// interface Candidate {
//   login: string;
//   name: string | null;
//   avatar_url: string;
//   email: string | null;
//   company: string | null;
//   location: string | null;
//   html_url: string;
// }


// const SavedCandidates = () => {
//   const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

//   useEffect(() => {
//     loadSavedCandidates();
//   }, []);

//   const loadSavedCandidates = () => {
//     const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
//     setSavedCandidates(storedCandidates);
//   };

//   const removeCandidate = (login: string) => {
//     const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== login);
//     setSavedCandidates(updatedCandidates);
//     localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
//   };

//   return (
//     <main>
//       <h1>Potential Candidates</h1>

//       {savedCandidates.length === 0 ? (
//         <p>No saved candidates yet.</p>
//       ) : (
//         <ul>
//           {savedCandidates.map((candidate) => (
//             <li key={candidate.login} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//               <img
//                 src={candidate.avatar_url}
//                 alt={candidate.name || "Candidate"}
//                 width="50"
//                 height="50"
//                 style={{ borderRadius: "50%", marginRight: "10px" }}
//               />
//               <div style={{ flexGrow: 1 }}>
//                 <strong>{candidate.name || "No Name"}</strong> ({candidate.login})
//                 <br />
//                 <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: "#00aaff" }}>
//                   View Profile
//                 </a>
//               </div>
//               <button onClick={() => removeCandidate(candidate.login)} style={{ marginLeft: "10px" }}>
//                 ❌ Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </main>
//   );
// };

// export default SavedCandidates;

import { useState, useEffect } from "react";

// Define the Candidate interface
interface Candidate {
  login: string;
  name: string | null;
  avatar_url: string;
  email: string | null;
  company: string | null;
  location: string | null;
  html_url: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates when the component mounts
  useEffect(() => {
    loadSavedCandidates();
  }, []);

  // Update localStorage whenever savedCandidates changes
  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  // Load candidates from localStorage safely
  const loadSavedCandidates = () => {
    try {
      const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]") as Candidate[];
      setSavedCandidates(storedCandidates);
    } catch (error) {
      console.error("Error loading saved candidates:", error);
      setSavedCandidates([]); // Reset on error
    }
  };

  // Remove a candidate by login
  const removeCandidate = (login: string) => {
    setSavedCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate.login !== login));
  };

  return (
    <main>
      <h1>Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <img
                src={candidate.avatar_url}
                alt={candidate.name || "Candidate"}
                width="50"
                height="50"
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <div style={{ flexGrow: 1 }}>
                <strong>{candidate.name || "No Name"}</strong> ({candidate.login})
                <br />
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: "#00aaff" }}>
                  View Profile
                </a>
              </div>
              <button
                onClick={() => removeCandidate(candidate.login)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default SavedCandidates;
