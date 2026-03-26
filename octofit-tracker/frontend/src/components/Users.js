import React, { useState, useEffect } from 'react';

const apiBase = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}`
  : 'http://localhost';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = process.env.REACT_APP_CODESPACE_NAME
      ? `${apiBase}-8000.app.github.dev/api/users/`
      : `${apiBase}:8000/api/users/`;
    console.log('Users: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="card octofit-card">
        <div className="card-header d-flex align-items-center gap-2">
          <span>👤</span>
          <h5 className="mb-0">Users</h5>
          <span className="badge bg-secondary ms-auto">{users.length}</span>
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
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan="4" className="text-center text-muted py-3">No users found.</td></tr>
                  ) : (
                    users.map((user, idx) => (
                      <tr key={user.id || idx}>
                        <td><span className="badge bg-secondary">{idx + 1}</span></td>
                        <td className="fw-semibold">{user.name}</td>
                        <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                        <td><span className="badge" style={{ backgroundColor: '#0f3460' }}>{user.team}</span></td>
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

export default Users;
