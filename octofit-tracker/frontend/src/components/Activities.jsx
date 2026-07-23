import { useCollectionData } from './dataClient'

function formatDate(dateValue) {
  if (!dateValue) {
    return 'N/A'
  }

  const parsed = new Date(dateValue)
  if (Number.isNaN(parsed.getTime())) {
    return String(dateValue)
  }

  return parsed.toLocaleString()
}

function Activities({ apiBaseUrl }) {
  const { items, pagination, loading, error } = useCollectionData(apiBaseUrl, 'activities')

  if (loading) {
    return <p>Loading activities...</p>
  }

  if (error) {
    return <div className="alert alert-danger">Activities request failed: {error}</div>
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title">Activities</h2>
        <p className="text-muted">Endpoint: {`${apiBaseUrl}/activities/`}</p>
        {pagination && (
          <p className="small text-muted">
            Pagination info: {JSON.stringify(pagination)}
          </p>
        )}
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th className="text-end">Duration (min)</th>
                <th className="text-end">Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id ?? `${activity.userName}-${activity.activityDate}`}>
                  <td>{activity.userName ?? 'N/A'}</td>
                  <td>{activity.activityType ?? 'N/A'}</td>
                  <td className="text-end">{activity.durationMinutes ?? '-'}</td>
                  <td className="text-end">{activity.caloriesBurned ?? '-'}</td>
                  <td>{formatDate(activity.activityDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Activities
