import { Column, useSortBy, useTable } from 'react-table'

interface Props {
  columns: Column[]
  data: any[]
  action?: any
  actionText?: string
}

const Table = ({ columns, data, action, actionText = 'Edit' }: Props) => {
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: data || []
    },
    useSortBy
  )

  return (
    <table className="min-w-full divide-y divide-cool-gray-200">
      <thead className="">
        {headerGroups.map((headerGroup: any, i: number) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup${i}`}>
            {headerGroup.headers.map((column: any, i: number) => (
              <th
                key={`column-${i}`}
                className="py-3 space-x-6 text-xs tracking-wide text-left uppercase text-cool-gray-400 font-semi-bold"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="inline-block w-4 h-4 ml-2 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="inline-block w-4 h-4 ml-2 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    )
                  ) : (
                    ''
                  )}
                </span>
              </th>
            ))}
            {action ? (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            ) : null}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
        {rows.map((row: any, i: number) => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()} key={`row-${i}`}>
              {row.cells.map((cell: any, i: number) => {
                return (
                  <td
                    className="max-w-lg py-4 pr-2 space-x-6 text-sm font-medium text-gray-900 truncate whitespace-nowrap"
                    {...cell.getCellProps()}
                    key={`cell-${i}`}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
              {action ? (
                <td className="py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    className="font-semibold text-blue-600 cursor-pointer hover:text-blue-900"
                    onClick={() => action(row.original)}
                  >
                    {actionText}
                  </button>
                </td>
              ) : null}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
