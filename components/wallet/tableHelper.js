import {useTable, useSortBy} from 'react-table'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'

export default function Table({ columns, data }) {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data}, useSortBy)
    
    return (
        <table {...getTableProps()} className="w-full my-2 font-light text-left table-auto ">
        
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup
                  .headers
                  .map(column => (
                    <th className ="font-normal border-b-2" {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                      <span>{column.isSorted ? column.isSortedDesc ? 
                        <ChevronDownIcon className="inline h-4 pl-1 text-gray-500"/> : 
                        <ChevronUpIcon className="inline h-4 pl-1 text-gray-500"/>: ''}
                      </span>
                    </th>
                  ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row
                    .cells
                    .map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                </tr>
              )
            })}
          </tbody>
        </table>
    )
}