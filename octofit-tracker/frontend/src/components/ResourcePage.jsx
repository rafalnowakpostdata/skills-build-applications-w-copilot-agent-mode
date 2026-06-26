import { useEffect, useState } from 'react'

function inferCodespaceName() {
  if (typeof window === 'undefined') {
    return ''
  }

  const suffix = '-5173.app.github.dev'
  const { hostname } = window.location

  if (hostname.endsWith(suffix)) {
    return hostname.slice(0, -suffix.length)
  }

  return ''
}

function buildApiUrl(preferredEndpoint, endpointPath) {
  if (preferredEndpoint) {
    return {
      configured: true,
      endpoint: preferredEndpoint,
      source: 'env',
    }
  }

  const inferredCodespace = inferCodespaceName()

  if (!inferredCodespace) {
    return {
      configured: false,
      endpoint: '',
      source: 'missing',
    }
  }

  return {
    configured: true,
    endpoint: `https://${inferredCodespace}-8000.app.github.dev${endpointPath}`,
    source: 'inferred',
  }
}

function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [payload.results, payload.items, payload.data]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate
    }
  }

  return []
}

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

function ResourceTable({ items }) {
  if (items.length === 0) {
    return <p className="text-muted mb-0">No records returned.</p>
  }

  const columnSet = new Set()

  items.forEach((item) => {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      Object.keys(item).forEach((key) => columnSet.add(key))
    }
  })

  const columns = Array.from(columnSet)

  if (columns.length === 0) {
    return <pre className="mb-0 small">{JSON.stringify(items, null, 2)}</pre>
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id ?? item._id ?? `${index}-${columns[0] ?? 'record'}`}>
              {columns.map((column) => (
                <td key={`${index}-${column}`}>{formatValue(item?.[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ResourcePage({ title, endpointPath, preferredEndpoint, description }) {
  const [{ configured, endpoint, source }] = useState(() => buildApiUrl(preferredEndpoint, endpointPath))
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(configured)
  const [error, setError] = useState('')
  const [responseShape, setResponseShape] = useState('')

  useEffect(() => {
    if (!configured) {
      return undefined
    }

    const controller = new AbortController()

    async function loadResource() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(normalizeRecords(payload))
        setResponseShape(Array.isArray(payload) ? 'array' : 'paginated object')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setItems([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadResource()

    return () => controller.abort()
  }, [configured, endpoint])

  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3 mb-4">
        <div>
          <h2 className="h3 mb-2">{title}</h2>
          <p className="text-muted mb-0">{description}</p>
        </div>
        <div className="text-md-end">
          <span className="badge text-bg-light border text-body-secondary">Endpoint: {endpointPath}</span>
          {source === 'inferred' ? (
            <p className="small text-muted mt-2 mb-0">Using a codespace name inferred from the current host.</p>
          ) : null}
        </div>
      </div>

      {!configured ? (
        <div className="alert alert-warning mb-0" role="alert">
          Define <strong>VITE_CODESPACE_NAME</strong> in `.env.local` so this view can call the backend on port 8000.
        </div>
      ) : null}

      {configured ? (
        <div className="card border-0 bg-body-secondary bg-opacity-25">
          <div className="card-body">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-2 mb-3">
              <p className="small text-muted mb-0">
                Request URL:{' '}
                <a href={endpoint} target="_blank" rel="noreferrer">
                  {endpoint}
                </a>
              </p>
              {responseShape ? <span className="badge text-bg-primary">Response: {responseShape}</span> : null}
            </div>

            {loading ? <p className="mb-0">Loading data...</p> : null}
            {!loading && error ? (
              <div className="alert alert-danger mb-0" role="alert">
                {error}
              </div>
            ) : null}
            {!loading && !error ? <ResourceTable items={items} /> : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}