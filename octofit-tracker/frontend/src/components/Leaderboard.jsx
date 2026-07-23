import { useCollectionData } from './dataClient'

function Leaderboard({ apiBaseUrl }) {
  const { items, pagination, loading, error } = useCollectionData(apiBaseUrl, 'leaderboard')

  if (loading) {
    return <p>Loading leaderboard...</p>
  }

  if (error) {
    return <div className="alert alert-danger">Leaderboard request failed: {error}</div>
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title">Leaderboard</h2>
        <p className="text-muted">Endpoint: {`${apiBaseUrl}/leaderboard/`}</p>
        {pagination && (
          <p className="small text-muted">
            Pagination info: {JSON.stringify(pagination)}
          </p>
        )}
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th className="text-end">Rank</th>
                <th>User</th>
                <th>Team</th>
                <th className="text-end">Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.userName}`}>
                  <td className="text-end">{entry.rank ?? '-'}</td>
                  <td>{entry.userName ?? 'N/A'}</td>
                  <td>{entry.teamName ?? 'N/A'}</td>
                  <td className="text-end">{entry.points ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
