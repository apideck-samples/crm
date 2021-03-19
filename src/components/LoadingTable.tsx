import { columns } from 'constants/columns'

const LoadingTable = () => {
  const array = Array.from(Array(20).keys())

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column: any, i: number) => (
            <th
              key={`column-${i}`}
              className="px-6 py-3 text-xs font-medium tracking-wide text-left text-gray-500 uppercase"
            >
              {column.Header}
            </th>
          ))}
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {array.map((_, i) => (
          <tr key={i}>
            {columns.map((_, i) => (
              <td
                className="max-w-sm px-6 py-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap"
                key={`cell-${i}`}
              >
                Loading
              </td>
            ))}
            <td
              className="max-w-sm px-6 py-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap"
              key={`cell-${i}`}
            >
              Loading
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LoadingTable
