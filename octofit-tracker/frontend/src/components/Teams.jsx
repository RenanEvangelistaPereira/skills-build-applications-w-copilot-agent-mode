import { useCollectionData } from './dataClient'

function Teams({ apiBaseUrl }) {
  const { items, pagination, loading, error } = useCollectionData(apiBaseUrl, 'teams')

  if (loading) {
    return <p>Loading teams...</p>
  }

  if (error) {
    return <div className="alert alert-danger">Teams request failed: {error}</div>
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title">Teams</h2>
        <p className="text-muted">Endpoint: {`${apiBaseUrl}/teams/`}</p>
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
                <th>Motto</th>
                <th className="text-end">Members</th>
                <th className="text-end">Weekly Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name ?? 'N/A'}</td>
                  <td>{team.motto ?? 'N/A'}</td>
                  <td className="text-end">{team.memberCount ?? '-'}</td>
                  <td className="text-end">{team.weeklyPoints ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Teams
