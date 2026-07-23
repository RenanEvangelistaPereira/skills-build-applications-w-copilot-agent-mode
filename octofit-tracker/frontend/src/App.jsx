import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const browserHost = typeof window !== 'undefined' ? window.location.hostname : ''
  const inferredCodespaceName = browserHost.endsWith('-5173.app.github.dev')
    ? browserHost.replace(/-5173\.app\.github\.dev$/i, '')
    : ''
  const codespaceName = configuredCodespaceName || inferredCodespaceName
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
  const usingFallback = !codespaceName

  return (
    <main className="container py-4">
      <section className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <h1 className="h2 mb-1">OctoFit Tracker</h1>
          <p className="text-muted mb-0">
            React 19 presentation tier connected to the OctoFit API.
          </p>
        </div>
        <div className="small text-muted text-lg-end">
          <div>
            <strong>API base:</strong> {apiBaseUrl}
          </div>
          {usingFallback && (
            <div className="text-warning-emphasis">
              Using localhost fallback because VITE_CODESPACE_NAME is not set.
            </div>
          )}
        </div>
      </section>

      <section className="alert alert-info" role="status">
        Codespaces API routing is auto-detected from the current URL. Optionally define{' '}
        <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> to override.
      </section>

      <nav className="nav nav-pills nav-fill gap-2 mb-4">
        <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Users
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Teams
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Activities
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Leaderboard
        </NavLink>
        <NavLink to="/workouts" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Workouts
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
        <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
        <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
        <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
      </Routes>
    </main>
  )
}

export default App
