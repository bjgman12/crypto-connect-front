import { useState } from "react";
import { CashIcon } from '@heroicons/react/solid'
import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { CogIcon } from '@heroicons/react/solid'
export default function Balance() {

    const [useBalance, setUseBalance] = useState(0.00)
    const [portfolio, setPortfolio] = useState(0)
    const [ownedCoins, setOwnedCoins] = useState([])
    const [history, setHistory] = useState()
    
    // Get the info from the SQL DB and make an api call for just these coins.
    // the api call must be structured like this:
    // ids=bitcoin%2C%20dogecoin
    // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false

    // useEffect(() => {
    //     let config = {
    //         headers: {'Access-Control-Allow-Origin': '*'}
    //     }
    //     const request = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids={ownedCoins}&order=market_cap_desc&per_page=100&page=1&sparkline=false', config)
    //     .then(res => {
    //         resData = res.data
    //         setCoinData(resData)
    //         setDisplayData(resData.slice(0,4))
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
    // }, [])


    // Get watchlist SQL call

    
    return(
        <>

                <div className='w-11/12 mx-auto flex text-purple-900'>
                <CurrencyDollarIcon className='h-20  ' />
                <p className='text-5xl pt-2 '>{portfolio}</p>
                <p className='text-xs pt-2'>(Portfolio Value)</p>
                </div>
                <div className='text-white w-3/4 mx-auto mt-8 bg-gradient-to-r border border-gray-400 from-yellow-400 via-red-500 to-pink-500  rounded-md text-center h-40 shadow-2xl'>
                <div className='flex pl-1 pt-1'>
                <h2>Crypto-Connect</h2>
                <CashIcon className='h-4 pl-2' />
                </div>
                <div className='flex pl-1 mt-2 ' >
                <p className='text-4xl '>${useBalance}</p>
                <p className='text-xs '>(Useable Balance)</p>
                </div>
                <div className='flex text-xs items-center justify-between px-2 mt-14 mb-2'>
                <p> * * * * .user@user.com</p>
                <CogIcon className="h-3"/>
                </div>
                </div>

                <div className='w-11/12 mx-auto mt-8 pt-2 bg-gradient-to-b from-gray-300 via-gray-200 to-white rounded-lg'>
                    <h2 className='text-3xl pl-2 text-purple-800'> Owned Currencies</h2>
                    <p className='pl-2 text-purple-800'> Coming Soon ...</p>
                </div>
                
                <div className='w-11/12 mx-auto pl-2 mt-14'>
                <h2 className='text-3xl text-purple-800'>History</h2>
                <p className=' text-purple-800'>Coming Soon ...</p>
                </div>    
        </>
    )
}