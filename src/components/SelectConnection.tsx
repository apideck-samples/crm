import { Menu, Transition } from '@headlessui/react'
import { createVaultSession, useConnection } from 'utils'

import { Connection } from 'types/Connection'
import Image from 'next/image'
import Spinner from './Spinner'
import { swrOptions } from 'constants/swr-options'
import { useEffect } from 'react'
import { useLeads } from 'utils/useLeads'
import useSWR from 'swr'
import { useSession } from 'utils/useSession'
import { validateEnv } from 'utils/validateEnv'

const SelectConnection = () => {
  const { setConnection, connection } = useConnection()
  const { session } = useSession()
  const { leads } = useLeads()

  const getConnections = async (url: string) => {
    validateEnv()
    const response = await fetch(url)
    return await response.json()
  }

  const { data: connections, error } = useSWR(
    session?.jwt ? `/api/vault/connections?jwt=${session?.jwt}` : null,
    getConnections,
    swrOptions
  )
  const isLoading = session && !connections && !error
  const callableConnections = connections?.data?.filter(
    (connection: Connection) => connection.state === 'callable'
  )

  useEffect(() => {
    if (leads?.service && callableConnections?.length && !connection) {
      const connector = callableConnections.find(
        (connection: Connection) => connection.service_id === leads?.service
      )
      setConnection(connector)
    } else if (!connection && callableConnections?.length) {
      setConnection(callableConnections[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads?.service, setConnection, callableConnections])

  const selectConnection = async (connection: Connection) => {
    if (connection.state === 'callable') {
      setConnection(connection)
      return
    }

    const redirectUrl = `https://vault.apideck.com/integrations/${connection.unified_api}/${connection?.service_id}`
    if (connection.state === 'available') {
      // Enable integration in vault
      redirectUrl.concat('/enable')
    }

    window.location.href = `${redirectUrl}?jwt=${session?.jwt}`
  }

  const redirectToVault = async () => {
    let url
    if (session) {
      url = `https://vault.apideck.com/session/${session?.jwt}`
    } else {
      const response = await createVaultSession()
      url = response.data?.session_uri
    }

    window.location.href = url
  }

  const statusColor = (connection: Connection) => {
    if (!connection.enabled) return 'bg-gray-300'
    if (connection.state !== 'callable') return 'bg-yellow-400'
    return 'bg-green-400'
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
              <div className="flex items-center">
                {!isLoading && connection?.icon && (
                  <div className="w-6 h-6 mr-2">
                    <Image
                      className={`rounded-full ${isLoading ? 'animate-spin opacity-20' : ''}`}
                      src={!isLoading && connection?.icon ? connection?.icon : '/img/logo.png'}
                      alt={connection.name}
                      height={28}
                      width={28}
                    />
                  </div>
                )}
                {isLoading && <Spinner className="w-6 h-6" />}
                {!isLoading && <span>{connection?.name || 'Select integration'}</span>}
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
                  {connections?.data?.map((connection: Connection, i: number) => {
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
                            <div className="flex p-2">
                              <Image
                                className="rounded-sm"
                                src={connection.icon}
                                alt={connection.name}
                                height={28}
                                width={28}
                              />
                            </div>
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
                            Manage integrations
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
