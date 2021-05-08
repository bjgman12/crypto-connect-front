import { useState } from "react";

export default function Balance() {

    const [useBalance, setUseBalance] = useState(0)
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
            <div className='ml-3'>
                <p className='float-right mr-20 text-2xl text-purple-600'>${useBalance}</p>
                <p className='text-xl text-white mt-2 mb-5'>Useable Balance:</p>
                <p className='float-right mr-20 text-2xl text-purple-600'>${portfolio}</p>
                <p className='text-xl text-white mb-8'>Portfolio Value:</p>

                <h2 className='text-xl text-purple-200'>Owned Currencies</h2>
                <br/>
                
                <h2 className='text-xl text-purple-400'>History</h2>
                <p className='text-white mb-10'>still in progress</p>
            </div>
        </>
    )
}