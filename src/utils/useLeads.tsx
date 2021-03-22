import { useEffect, useState } from 'react'

import { Lead } from 'types/Lead'
import { useConnector } from './useConnector'
import { usePrevious } from './usePrevious'
import useSWR from 'swr'

export const useLeads = () => {
  const [cursor, setCursor] = useState(null)
  const { connection } = useConnector()
  const serviceId = connection?.service_id
  const prevServiceId = usePrevious(serviceId)

  const fetcher = async (url: string) => {
    const response = await fetch(url)
    return await response.json()
  }

  const cursorParams =
    cursor && (!prevServiceId || prevServiceId === serviceId) ? `&cursor=${cursor}` : ''
  const getLeadsUrl = `/api/crm/leads/get?serviceId=${serviceId || ''}${cursorParams}`
  const { data, error, revalidate } = useSWR(getLeadsUrl, fetcher)

  useEffect(() => {
    if (prevServiceId && prevServiceId !== serviceId) {
      setCursor(null)
    }
  }, [serviceId, prevServiceId])

  const createLead = async (values: Lead) => {
    const response = await fetch(`/api/crm/leads/post?serviceId=${serviceId || ''}`, {
      method: 'POST',
      body: JSON.stringify(values)
    })
    return response.json()
  }

  const updateLead = async (id: string, values: Lead) => {
    const response = await fetch(`/api/crm/leads/patch?serviceId=${serviceId || ''}`, {
      method: 'PATCH',
      body: JSON.stringify({ id, ...values })
    })
    return response.json()
  }

  const deleteLead = async (id: string) => {
    const response = await fetch(`/api/crm/leads/delete?serviceId=${serviceId || ''}`, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
    return response.json()
  }

  const nextPage = () => {
    const nextCursor = data?.meta?.cursors?.next

    if (nextCursor) {
      setCursor(nextCursor)
    }
  }

  const prevPage = () => {
    const prevCursor = data?.meta?.cursors?.previous

    if (prevCursor) {
      setCursor(prevCursor)
    } else {
      setCursor(null)
    }
  }

  useEffect(() => {
    revalidate()
  }, [cursor, revalidate])

  return {
    leads: data,
    isLoading: !error && !data,
    isError: error,
    nextPage,
    prevPage,
    hasNextPage: data?.meta?.cursors?.next,
    currentPage: data?.meta?.cursors?.current,
    hasPrevPage: data?.meta?.cursors?.previous,
    createLead,
    updateLead,
    deleteLead,
    getLeadsUrl
  }
}
