import { useEffect, useState } from 'react'

import { Company } from '@apideck/node'
import { swrOptions } from 'constants/swr-options'
import { useConnection } from './useConnection'
import { usePrevious } from '@apideck/components'
import useSWR from 'swr'
import { useSession } from './useSession'
import { validateEnv } from './validateEnv'

export const useCompanies = () => {
  const [cursor, setCursor] = useState(null)
  const { connection } = useConnection()
  const { session } = useSession()
  const serviceId = connection?.service_id || ''
  const prevServiceId = usePrevious(serviceId)
  const prevCursor = usePrevious(cursor)

  const fetcher = async (url: string) => {
    validateEnv()
    const response = await fetch(url)
    return await response.json()
  }

  const cursorParams =
    cursor && (!prevServiceId || prevServiceId === serviceId) ? `&cursor=${cursor}` : ''
  const getCompaniesUrl = serviceId
    ? `/api/crm/companies/get?jwt=${session?.jwt}&serviceId=${serviceId}${cursorParams}`
    : null
  const { data, error, revalidate } = useSWR(getCompaniesUrl, fetcher, swrOptions)

  useEffect(() => {
    if (prevServiceId && prevServiceId !== serviceId) {
      setCursor(null)
    }
  }, [serviceId, prevServiceId])

  const createCompany = async (values: Company) => {
    const response = await fetch(
      `/api/crm/companies/post?jwt=${session?.jwt}&serviceId=${serviceId}`,
      {
        method: 'POST',
        body: JSON.stringify(values)
      }
    )
    return response.json()
  }

  const updateCompany = async (id: string, values: Company) => {
    const response = await fetch(
      `/api/crm/companies/patch?jwt=${session?.jwt}&serviceId=${serviceId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id, company: values })
      }
    )
    return response.json()
  }

  const deleteCompany = async (id: string) => {
    const response = await fetch(
      `/api/crm/companies/delete?jwt=${session?.jwt}&serviceId=${serviceId}`,
      {
        method: 'DELETE',
        body: JSON.stringify({ id })
      }
    )
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
    setCursor(prevCursor)
  }

  useEffect(() => {
    if (prevCursor && prevCursor !== cursor) {
      revalidate()
    }
  }, [cursor, prevCursor, revalidate])

  return {
    companies: data,
    isLoading: !error && !data,
    isError: data?.error || error,
    hasNextPage: data?.meta?.cursors?.next,
    currentPage: data?.meta?.cursors?.current,
    hasPrevPage: data?.meta?.cursors?.previous,
    nextPage,
    prevPage,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompaniesUrl
  }
}
