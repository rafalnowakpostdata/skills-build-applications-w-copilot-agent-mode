import './App.css'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigationItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="bg-body-tertiary min-vh-100">
      <main className="container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-4 mb-4">
                  <div>
                    <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
                    <h1 className="display-6 fw-bold mb-3">Presentation tier for the fitness data API</h1>
                    <p className="lead text-muted mb-0">
                      Browse activities, leaderboard standings, teams, users, and workouts through routed resource views.
                    </p>
                  </div>
                  <a
                    className="btn btn-outline-primary align-self-start"
                    href="https://vite.dev/guide/env-and-mode.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vite env docs
                  </a>
                </div>

                <nav aria-label="Primary" className="mb-4">
                  <ul className="nav nav-pills gap-2 flex-wrap">
                    {navigationItems.map((item) => (
                      <li className="nav-item" key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `nav-link${isActive ? ' active' : ' text-body-secondary bg-light border'}`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                <Routes>
                  <Route path="/" element={<Navigate to="/activities" replace />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/workouts" element={<Workouts />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
