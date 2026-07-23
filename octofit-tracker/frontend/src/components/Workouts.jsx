import { useCollectionData } from './dataClient'

function Workouts({ apiBaseUrl }) {
  const { items, pagination, loading, error } = useCollectionData(apiBaseUrl, 'workouts')

  if (loading) {
    return <p>Loading workouts...</p>
  }

  if (error) {
    return <div className="alert alert-danger">Workouts request failed: {error}</div>
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title">Workouts</h2>
        <p className="text-muted">Endpoint: {`${apiBaseUrl}/workouts/`}</p>
        {pagination && (
          <p className="small text-muted">
            Pagination info: {JSON.stringify(pagination)}
          </p>
        )}
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Focus Area</th>
                <th>Difficulty</th>
                <th className="text-end">Duration (min)</th>
                <th>Recommended Goal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((workout) => (
                <tr key={workout._id ?? workout.title}>
                  <td>{workout.title ?? 'N/A'}</td>
                  <td>{workout.focusArea ?? 'N/A'}</td>
                  <td>{workout.difficulty ?? 'N/A'}</td>
                  <td className="text-end">{workout.durationMinutes ?? '-'}</td>
                  <td>{workout.recommendedForGoal ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Workouts
