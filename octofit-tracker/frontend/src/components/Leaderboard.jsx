import ResourcePage from './ResourcePage.jsx'

export default function Leaderboard() {
  const endpointPath = '/api/leaderboard/'
  const preferredEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : ''

  return (
    <ResourcePage
      title="Leaderboard"
      endpointPath={endpointPath}
      preferredEndpoint={preferredEndpoint}
      description="Inspect ranking data and compare current competitive standings."
    />
  )
}