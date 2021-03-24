import { columns } from 'constants/columns'

const LoadingTable = () => {
  const array = Array.from(Array(20).keys())

  return (
    <table className="min-w-full divide-y divide-cool-gray-200">
      <thead>
        <tr>
          {columns.map((column: any, i: number) => (
            <th
              key={`column-${i}`}
              className="py-3 space-x-6 text-xs font-medium tracking-wide text-left text-gray-500 uppercase"
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
                className="py-4 space-x-6 text-sm font-medium truncate whitespace-nowrap"
                key={`cell-${i}`}
                style={{ maxWidth: 250 }}
              >
                <span className="px-16 py-0 rounded-sm bg-cool-gray-200 animate-pulse"></span>
              </td>
            ))}
            <td
              className="max-w-xs px-1 py-2 text-sm font-medium text-right truncate whitespace-nowrap"
              key={`cell-${i}`}
            >
              <span className="px-4 py-0 rounded-sm bg-cool-gray-200 animate-pulse"></span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LoadingTable
