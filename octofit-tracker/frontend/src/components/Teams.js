import React, { useState, useEffect } from 'react';

const apiBase = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${apiBase}/api/teams/`;
    console.log('Teams: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="card octofit-card">
        <div className="card-header d-flex align-items-center gap-2">
          <span>🏆</span>
          <h5 className="mb-0">Teams</h5>
          <span className="badge bg-secondary ms-auto">{teams.length}</span>
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3">{error}</div>}
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '50px' }}>#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr><td colSpan="3" className="text-center text-muted py-3">No teams found.</td></tr>
                  ) : (
                    teams.map((team, idx) => (
                      <tr key={team.id || idx}>
                        <td><span className="badge bg-secondary">{idx + 1}</span></td>
                        <td className="fw-semibold">{team.name}</td>
                        <td>
                          {(Array.isArray(team.members) ? team.members : [team.members]).map((m, i) => (
                            <span key={i} className="badge me-1" style={{ backgroundColor: '#16213e' }}>{m}</span>
                          ))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
