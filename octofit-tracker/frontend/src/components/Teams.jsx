import ResourcePage from './ResourcePage.jsx'

export default function Teams() {
  const endpointPath = '/api/teams/'
  const preferredEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : ''

  return (
    <ResourcePage
      title="Teams"
      endpointPath={endpointPath}
      preferredEndpoint={preferredEndpoint}
      description="Browse team records and membership data exposed by the backend."
    />
  )
}