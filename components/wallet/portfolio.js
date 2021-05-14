import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { currentPrices } from '../../services/coingecko'
import NumberFormat from 'react-number-format'
import {useEffect, useState} from 'react'
import { currentCoins } from '../../services/cryptoApi'

export default function Portfolio({ transactions }){
    
    const [portfolioBalance, setPortfolioBalance] = useState(0.00)
    
    function getCoinNames(coins) {
        const uniqueNames = [... new Set(coins.map((txn) => txn.coin))].toString()
        return uniqueNames
    }


    function calculatePortfolioBalance(current_coins, current_prices) {
        let total = 0
        current_coins.forEach((coin) => {
            let price = current_prices[coin.coin]
            total += price.usd * coin.units
        })
        setPortfolioBalance(total)
    }
    
    useEffect(() => {
        const current_coins = currentCoins(transactions)
        const unique_names = getCoinNames(current_coins)
        currentPrices(unique_names).then(response => {
            calculatePortfolioBalance(current_coins, response)
        })
    },);
    
    return(
        <div className='flex w-11/12 m-4 mx-auto text-purple-900 '>
            <CurrencyDollarIcon className='h-20'/>
            <p className='pt-2 text-5xl font-light'>
                <NumberFormat value={ portfolioBalance }  displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
            </p>
            <p className='pt-2 text-xs'>(Coin Value)</p>
        </div>
    )
}