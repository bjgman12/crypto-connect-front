import Table from './tableHelper'


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