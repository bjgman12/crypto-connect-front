import React, {useState, useEffect} from 'react'
import { currentCoins } from '/services/transactions'

export default function Coins({ transactions }){
    
    const [coins, setCoins] = useState('placeholder')

    useEffect(() => {
        let response = currentCoins(transactions)
        console.log(response)
    });
    
    return(
        <div className='w-11/12 pt-2 mx-auto mt-8 rounded-lg bg-gradient-to-b from-gray-300 via-gray-200 to-white'>
            <h2 className='pl-2 text-3xl text-purple-800'> Owned Currencies</h2>
            <p>{ coins }</p>
        </div>
    )
}