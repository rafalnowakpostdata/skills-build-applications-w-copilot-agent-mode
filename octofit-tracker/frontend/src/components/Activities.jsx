import ResourcePage from './ResourcePage.jsx'

export default function Activities() {
  const endpointPath = '/api/activities/'
  const preferredEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : ''

  return (
    <ResourcePage
      title="Activities"
      endpointPath={endpointPath}
      preferredEndpoint={preferredEndpoint}
      description="Review logged activity entries returned by the backend API."
    />
  )
}