import { useState , useEffect } from 'react'
import axios from 'axios'
import Cookies, { get } from 'js-cookie'
import { getWatchlist } from '../services/watchlistGet'
import Header from '../components/header'
import Footer  from '../components/footer'
import CoinListed from '../components/listed'
import { getCoinData } from '../services/coingecko'


export default function WatchList(){
    const [fetchCoinNames,setFetchCoinNames] = useState('')
    const [displayData,setDisplayData] = useState([])
    


    const formatData = data => {
        return data.map((el) => {
            return el['coin']          
            });}
    



    useEffect(() => {
        getWatchlist(Cookies.get('token'),Cookies.get('user_id')).then(res => {
            const test = formatData(res)
            setFetchCoinNames(test.toString())

            getCoinData(test).then(res => {
                setDisplayData(res)
            })
        })

        
    
    }, [])



    return (
        <>
        <Header />
        <div className='mt-20'></div>
        <CoinListed filteredCoins={displayData}/>
       
        <Footer />
        </>
    )
}