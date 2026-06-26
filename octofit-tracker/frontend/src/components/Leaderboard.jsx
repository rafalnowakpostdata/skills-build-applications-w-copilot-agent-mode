import ResourcePage from './ResourcePage.jsx'

export default function Leaderboard() {
  const endpointPath = '/api/leaderboard/'

  return (
    <ResourcePage
      title="Leaderboard"
      endpointPath={endpointPath}
      description="Inspect ranking data and compare current competitive standings."
    />
  )
}