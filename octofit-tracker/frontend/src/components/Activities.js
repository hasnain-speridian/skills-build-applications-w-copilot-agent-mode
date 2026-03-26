import React, { useState, useEffect } from 'react';

const apiBase = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}`
  : 'http://localhost';

const activityColor = (activity) => {
  const map = { Running: 'success', Cycling: 'primary', Swimming: 'info', Hiking: 'warning', Yoga: 'secondary' };
  return map[activity] || 'dark';
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_CODESPACE_NAME
      ? `${apiBase}-8000.app.github.dev/api/activities/`
      : `${apiBase}:8000/api/activities/`;
    console.log('Activities: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="card octofit-card">
        <div className="card-header d-flex align-items-center gap-2">
          <span>🏃</span>
          <h5 className="mb-0">Activities</h5>
          <span className="badge bg-secondary ms-auto">{activities.length}</span>
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
                    <th scope="col">User</th>
                    <th scope="col">Activity</th>
                    <th scope="col">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 ? (
                    <tr><td colSpan="4" className="text-center text-muted py-3">No activities found.</td></tr>
                  ) : (
                    activities.map((a, idx) => (
                      <tr key={a.id || idx}>
                        <td><span className="badge bg-secondary">{idx + 1}</span></td>
                        <td className="fw-semibold">{a.user}</td>
                        <td><span className={`badge bg-${activityColor(a.activity)}`}>{a.activity}</span></td>
                        <td>{a.duration} <small className="text-muted">min</small></td>
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

export default Activities;
