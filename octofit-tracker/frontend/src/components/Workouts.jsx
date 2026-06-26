import ResourcePage from './ResourcePage.jsx'

export default function Workouts() {
  const endpointPath = '/api/workouts/'

  return (
    <ResourcePage
      title="Workouts"
      endpointPath={endpointPath}
      description="Check the available workout suggestions and tracked workout plans."
    />
  )
}