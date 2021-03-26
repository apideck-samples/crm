import { Menu, Transition } from '@headlessui/react'
import { createVaultSession, useConnection } from 'utils'

import { Connection } from 'types/Connection'
import Spinner from './Spinner'
import { isAuthorized } from 'utils'
import { useEffect } from 'react'
import { useLeads } from 'utils/useLeads'
import useSWR from 'swr'
import { validateEnv } from 'utils/validateEnv'

const SelectConnection = () => {
  const { setConnection, connection } = useConnection()
  const { leads } = useLeads()

  const getConnections = async (url: string) => {
    validateEnv()
    const response = await fetch(url)
    return await response.json()
  }

  const { data: connections, error } = useSWR(`/api/vault/connections`, getConnections)
  const isLoading = !connections && !error
  const addedConnections = connections?.data?.filter((connection: Connection) => connection.added)

  useEffect(() => {
    if (leads?.service && addedConnections.length && !connection) {
      const connector = addedConnections.find(
        (connection: Connection) => connection.service_id === leads?.service
      )
      setConnection(connector)
    } else if (!connection && addedConnections?.length) {
      setConnection(addedConnections[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads?.service, setConnection, addedConnections])

  const selectConnection = async (connection: Connection) => {
    if (!isAuthorized(connection)) {
      const response = await createVaultSession()
      const sessionUrl = response?.data?.session_uri
      if (!sessionUrl) return
      const redirectUrl = `https://vault.apideck.com/integrations/crm/${connection?.service_id}/enable`
      const token = sessionUrl.substring(sessionUrl.lastIndexOf('/') + 1)
      window.location.href = `${redirectUrl}?jwt=${token}`
    }
    setConnection(connection)
  }

  const redirectToVault = async () => {
    const response = await createVaultSession()
    window.location.href = response.data?.session_uri
  }

  const statusColor = (connection: Connection) => {
    if (!connection.enabled) return 'bg-gray-300'
    if (!isAuthorized(connection)) return 'bg-yellow-400'
    return 'bg-primary-500'
  }

  return (
    <div className="relative inline-block">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-md group hover:bg-cool-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cool-gray-100 focus:ring-blue-600"
              style={{ minWidth: 240 }}
            >
              <div>
                {!isLoading && connection?.icon && (
                  <img
                    className={`inline-block w-6 h-6 mr-2 rounded-full ${
                      isLoading ? 'animate-spin opacity-20' : ''
                    }`}
                    src={!isLoading && connection?.icon ? connection?.icon : '/img/logo.png'}
                    alt=""
                  />
                )}
                {isLoading && <Spinner className="w-6 h-6" />}
                {!isLoading && <span>{connection?.name || 'No integrations'}</span>}
              </div>
              <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Menu.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              className="min-w-sm"
            >
              <Menu.Items
                static
                className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white border divide-y rounded-md outline-none border-cool-gray-200 divide-cool-gray-100"
              >
                <div className="py-1">
                  {addedConnections?.map((connection: Connection, i: number) => {
                    return (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <div
                            onClick={() => selectConnection(connection)}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                            } flex items-center justify-between min-w-0 mx-2 cursor-pointer rounded-md py-0.5 overflow-hidden ${
                              connection.enabled ? '' : 'opacity-60'
                            }`}
                          >
                            <img
                              className="flex-shrink-0 w-6 h-6 m-2 rounded-full"
                              src={connection.icon}
                              alt=""
                            />
                            <span className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {connection.name}
                              </span>
                            </span>

                            <span
                              className={`inline-block w-2.5 h-2.5 mr-2 rounded-full ring-2 ring-white ${statusColor(
                                connection
                              )}`}
                            ></span>
                          </div>
                        )}
                      </Menu.Item>
                    )
                  })}
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => redirectToVault()}
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                        } flex items-center justify-between min-w-0 mx-2 cursor-pointer rounded-md py-0.5 overflow-hidden`}
                      >
                        <svg
                          className="flex-shrink-0 w-6 h-6 m-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            Add integration
                          </span>
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default SelectConnection
