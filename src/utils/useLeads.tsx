import { useEffect, useState } from 'react'

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
  const { data, error, revalidate } = useSWR(
    `/api/crm/leads/get?serviceId=${serviceId || ''}${cursorParams}`,
    fetcher
  )

  useEffect(() => {
    if (prevServiceId !== serviceId) {
      setCursor(null)
    }
  }, [serviceId, prevServiceId])

  const nextPage = () => {
    const nextCursor = data?.meta?.cursors?.next

    if (nextCursor) {
      setCursor(nextCursor)
      revalidate()
    }
  }

  const prevPage = () => {
    const prevCursor = data?.meta?.cursors?.previous
    if (prevCursor) {
      setCursor(prevCursor)
      revalidate()
    }
  }

  return {
    leads: data,
    isLoading: !error && !data,
    isError: error,
    revalidate,
    nextPage,
    prevPage,
    hasNextPage: data?.meta?.cursors?.next,
    hasPrevPage: data?.meta?.cursors?.previous
  }
}
