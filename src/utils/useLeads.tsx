import useSWR from 'swr'

export const useLeads = (serviceId: string) => {
  const fetcher = async (url: string) => {
    const response = await fetch(url)
    return await response.json()
  }
  const { data, error, revalidate, isValidating } = useSWR(
    `/api/crm/leads/get?serviceId=${serviceId || ''}`,
    fetcher
  )

  return {
    leads: data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    revalidate
  }
}
