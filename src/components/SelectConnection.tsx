import { Menu, Transition } from '@headlessui/react'
import { useEffect } from 'react'
import useSWR from 'swr'
import { Connection } from 'types/Connection'
import { useConnector } from 'utils/useConnector'
import { useLeads } from 'utils/useLeads'
import Spinner from './Spinner'

const SelectConnection = () => {
  const { setConnection, connection } = useConnector()
  const { leads } = useLeads()

  const getConnections = async (url: string) => {
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

  return (
    <div className="relative inline-block px-3 my-6 text-left">
      <div>
        <button
          type="button"
          className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md group hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500"
          id="options-menu"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="flex items-center justify-between w-full">
            <span className="flex items-center justify-between min-w-0 space-x-3">
              <img
                className="flex-shrink-0 w-10 h-10 rounded-full"
                src="https://res.cloudinary.com/apideck/image/upload/v1529456047/catalog/salesforce/icon128x128.png"
                alt=""
              />
              <span className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-900 truncate">SalesForce</span>
              </span>
            </span>
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default SelectConnection
