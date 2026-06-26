import ResourcePage from './ResourcePage.jsx'

export default function Users() {
  const endpointPath = '/api/users/'
  const preferredEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : ''

  return (
    <ResourcePage
      title="Users"
      endpointPath={endpointPath}
      preferredEndpoint={preferredEndpoint}
      description="View user profiles and account-related details from the API."
    />
  )
}