import React, { useState, useEffect } from 'react';

const apiBase = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const rankBadge = (idx) => {
  if (idx === 0) return 'rank-badge gold';
  if (idx === 1) return 'rank-badge silver';
  if (idx === 2) return 'rank-badge bronze';
  return 'rank-badge';
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${apiBase}/api/leaderboard/`;
    console.log('Leaderboard: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const sorted = [...entries].sort((a, b) => b.points - a.points);

  return (
    <div className="container mt-4">
      <div className="card octofit-card">
        <div className="card-header d-flex align-items-center gap-2">
          <span>📊</span>
          <h5 className="mb-0">Leaderboard</h5>
          <span className="badge bg-secondary ms-auto">{entries.length} teams</span>
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
                    <th scope="col" style={{ width: '70px' }}>Rank</th>
                    <th scope="col">Team</th>
                    <th scope="col">Points</th>
                    <th scope="col">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.length === 0 ? (
                    <tr><td colSpan="4" className="text-center text-muted py-3">No entries found.</td></tr>
                  ) : (
                    sorted.map((entry, idx) => {
                      const maxPts = sorted[0]?.points || 1;
                      const pct = Math.round((entry.points / maxPts) * 100);
                      return (
                        <tr key={entry.id || idx}>
                          <td><span className={rankBadge(idx)}>{idx + 1}</span></td>
                          <td className="fw-semibold">{entry.team}</td>
                          <td><strong>{entry.points}</strong> pts</td>
                          <td style={{ minWidth: '120px' }}>
                            <div className="progress" style={{ height: '10px' }}>
                              <div
                                className="progress-bar"
                                style={{ width: `${pct}%`, backgroundColor: '#0f3460' }}
                                role="progressbar"
                                aria-valuenow={pct}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
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

export default Leaderboard;
