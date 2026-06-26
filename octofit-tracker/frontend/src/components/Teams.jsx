import ResourcePage from './ResourcePage.jsx'

export default function Teams() {
  const endpointPath = '/api/teams/'

  return (
    <ResourcePage
      title="Teams"
      endpointPath={endpointPath}
      description="Browse team records and membership data exposed by the backend."
    />
  )
}