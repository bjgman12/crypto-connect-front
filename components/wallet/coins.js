import { currentCoins } from '/services/transactions'
import Table from './tableHelper'


export default function Coins({ transactions }){

    const actualCoins = currentCoins(transactions)
    const columns = [
        {
          Header: 'Coin',
          accessor: 'coin'
        }, 
        {
          Header: 'Units',
          accessor: 'units'
        }, 
      ]
    
    return(
        <div className='w-11/12 pt-2 mx-auto mt-8 rounded-lg bg-gradient-to-b from-gray-300 via-gray-200 to-white'>
            <h2 className='pl-2 text-3xl text-purple-800'> Owned Currencies</h2>
            <Table data={actualCoins} columns={columns}></Table>
        </div>
    )
}