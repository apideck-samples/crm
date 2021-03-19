import { Column, useSortBy, useTable } from 'react-table'
import { useModal } from 'utils/useModal'
import LeadForm from './LeadForm'

interface Props {
  columns: Column[]
  data: any[]
}

const Table = ({ columns, data }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: data || []
    },
    useSortBy
  )
  const { addModal } = useModal()

  return (
    <table className="min-w-full divide-y divide-cool-gray-200">
      <thead className="">
        {headerGroups.map((headerGroup: any, i: number) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup${i}`}>
            {headerGroup.headers.map((column: any, i: number) => (
              <th
                key={`column-${i}`}
                className="py-3 space-x-6 text-xs font-medium tracking-wide text-left text-gray-500 uppercase"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span>{column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}</span>
              </th>
            ))}
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
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
                    className="py-4 space-x-6 text-sm font-medium text-gray-900 truncate whitespace-nowrap"
                    {...cell.getCellProps()}
                    key={`cell-${i}`}
                    // style={{ maxWidth: 150 }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
              <td className="py-4 text-sm font-medium text-right whitespace-nowrap">
                <button
                  className="font-semibold text-blue-600 cursor-pointer hover:text-blue-900"
                  onClick={() =>
                    addModal(<LeadForm defaultValues={row.original} />, {
                      style: { maxWidth: 480 }
                    })
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
              <thead className="bg-gray-50 dark:bg-gray-900">
                {headerGroups.map((headerGroup: any, i: number) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup${i}`}>
                    {headerGroup.headers.map((column: any, i: number) => (
                      <th
                        key={`column-${i}`}
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render('Header')}
                        <span>{column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-gray-700"
              >
                {rows.map((row: any, i: number) => {
                  prepareRow(row)

                  return (
                    <tr
                      {...row.getRowProps()}
                      className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-100"
                      key={`row-${i}`}
                      onClick={() =>
                        addModal(<LeadForm defaultValues={row.original} />, {
                          style: { maxWidth: 480 }
                        })
                      }
                    >
                      {row.cells.map((cell: any, i: number) => {
                        return (
                          <td
                            className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                            {...cell.getCellProps()}
                            key={`cell-${i}`}
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            rwefgre
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
