import ResourcePage from './ResourcePage.jsx'

export default function Users() {
  const endpointPath = '/api/users/'

  return (
    <ResourcePage
      title="Users"
      endpointPath={endpointPath}
      description="View user profiles and account-related details from the API."
    />
  )
}