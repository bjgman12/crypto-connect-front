import Table from './tableHelper'


export default function History({ transactions }){
    
    const columns = [
        {
          Header: 'Coin',
          accessor: 'coin'
        }, 
        {
          Header: 'Type',
          accessor: 'transaction_type'
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
        <div className='w-11/12 p-2 mx-auto mt-8 font-light rounded-lg bg-gradient-to-b from-gray-100 via-gray-50 to-white '>
            <h2 className='text-3xl text-purple-800'>History</h2>
            <Table data={transactions} columns={columns}></Table>
        </div>
    )
}