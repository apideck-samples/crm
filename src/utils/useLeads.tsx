import { useEffect, useState } from 'react'

import { useConnector } from './useConnector'
import { usePrevious } from './usePrevious'
import useSWR from 'swr'

export const useLeads = () => {
  const { connection } = useConnector()
  const [cursor, setCursor] = useState(null)

  const prefServiceId = usePrevious(connection?.service_id)

  const fetcher = async (url: string) => {
    const response = await fetch(url)
    return await response.json()
  }

  const cursorParams =
    cursor && (!prefServiceId || prefServiceId === connection?.service_id)
      ? `&cursor=${cursor}`
      : ''
  const { data, error, revalidate } = useSWR(
    `/api/crm/leads/get?serviceId=${connection?.service_id || ''}${cursorParams}`,
    fetcher
  )

  useEffect(() => {
    if (prefServiceId !== connection?.service_id) {
      setCursor(null)
    }
  }, [connection?.service_id, prefServiceId])

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
