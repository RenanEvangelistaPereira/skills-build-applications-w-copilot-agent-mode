import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    const topLevel = [payload.data, payload.items, payload.results]
    for (const candidate of topLevel) {
      if (Array.isArray(candidate)) {
        return candidate
      }
    }

    if (payload.data && typeof payload.data === 'object') {
      const nested = [payload.data.items, payload.data.results]
      for (const candidate of nested) {
        if (Array.isArray(candidate)) {
          return candidate
        }
      }
    }
  }

  return []
}

function normalizePagination(payload) {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  if (payload.pagination && typeof payload.pagination === 'object') {
    return payload.pagination
  }

  if (payload.meta && typeof payload.meta === 'object') {
    return payload.meta
  }

  const hasPage = Object.prototype.hasOwnProperty.call(payload, 'page')
  const hasTotalPages = Object.prototype.hasOwnProperty.call(payload, 'totalPages')
  const hasTotal = Object.prototype.hasOwnProperty.call(payload, 'total')

  if (hasPage || hasTotalPages || hasTotal) {
    return {
      page: payload.page,
      totalPages: payload.totalPages,
      total: payload.total
    }
  }

  return null
}

export function useCollectionData(apiBaseUrl, collectionPath) {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/${collectionPath}/`)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setItems(normalizeItems(payload))
          setPagination(normalizePagination(payload))
        }
      } catch (loadError) {
        if (!ignore) {
          setItems([])
          setPagination(null)
          setError(loadError instanceof Error ? loadError.message : 'Unknown error')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadCollection()

    return () => {
      ignore = true
    }
  }, [apiBaseUrl, collectionPath])

  return {
    items,
    pagination,
    loading,
    error
  }
}
