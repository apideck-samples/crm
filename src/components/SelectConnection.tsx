import { Menu, Transition } from '@headlessui/react'
import { useEffect } from 'react'
import useSWR from 'swr'
import { Connection } from 'types/Connection'
import { useConnection } from 'utils'
import { useLeads } from 'utils/useLeads'
import { validateEnv } from 'utils/validateEnv'
import Spinner from './Spinner'

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

  useEffect(() => {
    if (leads?.service && connections?.data?.length && !connection) {
      const connector = connections.data.find(
        (connection: Connection) => connection.service_id === leads?.service
      )
      setConnection(connector)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads?.service, setConnection])

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
                {!isLoading && connection?.icon ? (
                  <img
                    className={`inline-block w-6 h-6 mr-2 rounded-full ${
                      isLoading ? 'animate-spin opacity-20' : ''
                    }`}
                    src={!isLoading && connection?.icon ? connection?.icon : '/img/logo.png'}
                    alt=""
                  />
                ) : (
                  <Spinner className="w-6 h-6" />
                )}
                {!isLoading && <span>{connection?.name}</span>}
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
                            onClick={() => setConnection(connection)}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } flex items-center justify-between min-w-0 mx-2 cursor-pointer rounded-md py-1 overflow-hidden`}
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
                          </div>
                        )}
                      </Menu.Item>
                    )
                  })}
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
