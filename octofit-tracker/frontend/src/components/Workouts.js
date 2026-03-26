import React, { useState, useEffect } from 'react';

const apiBase = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}`
  : 'http://localhost';

const levelVariant = (level) => {
  const map = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger', Expert: 'dark' };
  return map[level] || 'secondary';
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_CODESPACE_NAME
      ? `${apiBase}-8000.app.github.dev/api/workouts/`
      : `${apiBase}:8000/api/workouts/`;
    console.log('Workouts: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="card octofit-card">
        <div className="card-header d-flex align-items-center gap-2">
          <span>💪</span>
          <h5 className="mb-0">Workouts</h5>
          <span className="badge bg-secondary ms-auto">{workouts.length}</span>
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
                    <th scope="col">Workout Name</th>
                    <th scope="col">Difficulty Level</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.length === 0 ? (
                    <tr><td colSpan="3" className="text-center text-muted py-3">No workouts found.</td></tr>
                  ) : (
                    workouts.map((workout, idx) => (
                      <tr key={workout.id || idx}>
                        <td><span className="badge bg-secondary">{idx + 1}</span></td>
                        <td className="fw-semibold">{workout.name}</td>
                        <td><span className={`badge bg-${levelVariant(workout.level)}`}>{workout.level}</span></td>
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

export default Workouts;
