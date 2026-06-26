import ResourcePage from './ResourcePage.jsx'

export default function Workouts() {
  const endpointPath = '/api/workouts/'
  const preferredEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : ''

  return (
    <ResourcePage
      title="Workouts"
      endpointPath={endpointPath}
      preferredEndpoint={preferredEndpoint}
      description="Check the available workout suggestions and tracked workout plans."
    />
  )
}