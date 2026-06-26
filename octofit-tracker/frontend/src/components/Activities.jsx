import ResourcePage from './ResourcePage.jsx'

export default function Activities() {
  const endpointPath = '/api/activities/'

  return (
    <ResourcePage
      title="Activities"
      endpointPath={endpointPath}
      description="Review logged activity entries returned by the backend API."
    />
  )
}