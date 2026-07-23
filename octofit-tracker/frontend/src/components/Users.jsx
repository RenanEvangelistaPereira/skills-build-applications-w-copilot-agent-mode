import { useCollectionData } from './dataClient'

function Users({ apiBaseUrl }) {
  const { items, pagination, loading, error } = useCollectionData(apiBaseUrl, 'users')

  if (loading) {
    return <p>Loading users...</p>
  }

  if (error) {
    return <div className="alert alert-danger">Users request failed: {error}</div>
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title">Users</h2>
        <p className="text-muted">Endpoint: {`${apiBaseUrl}/users/`}</p>
        {pagination && (
          <p className="small text-muted">
            Pagination info: {JSON.stringify(pagination)}
          </p>
        )}
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Goal</th>
                <th className="text-end">Weekly Minutes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.username}>
                  <td>{user.displayName ?? 'N/A'}</td>
                  <td>{user.username ?? 'N/A'}</td>
                  <td>{user.email ?? 'N/A'}</td>
                  <td>{user.fitnessGoal ?? 'N/A'}</td>
                  <td className="text-end">{user.weeklyActivityMinutes ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Users
