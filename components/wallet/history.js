import {useTable} from 'react-table'


function Table({ columns, data }) {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data})
    
    return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup
                  .headers
                  .map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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

export default function History({ transactions }){
    
    const columns = [
        {
          Header: 'Type',
          accessor: 'transaction_type'
        }, 
        {
          Header: 'Coin',
          accessor: 'coin'
        }, 
        {
          Header: 'Price',
          accessor: 'price'
        }, 
        {
          Header: 'Units',
          accessor: 'units'
        }
      ]
    
    return(
        <div className='w-11/12 pl-2 mx-auto mt-14'>
            <h2 className='text-3xl text-purple-800'>History</h2>
            <Table data={transactions} columns={columns}></Table>
        </div>
    )
}