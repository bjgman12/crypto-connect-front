import Header from '../components/header'
import CoinListed from "../components/listed";
import SearchForm from '../components/searchForm'
import Footer from '../components/footer'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Search() {
    const [search, setSearch] = useState(false)
    const [coinData,setCoinData] = useState([])
    const [searchCoinData, setSearchCoinData] = useState([])
    const [displayData,setDisplayData] = useState([])
    const [coinPage,setCoinPage] = useState(0)

    let resData = ''

    useEffect(() => {
        let config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        }
        const request = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', config)
        .then(res => {
            resData = res.data
            setCoinData(resData)
            setDisplayData(resData.slice(0,4))
        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    function cacheCoins(start = 0, end = 4) {
        // console.log(searchCoinData)
        setDisplayData(searchCoinData.slice(start,end))
    }

    function searchHandler(values) {
        setCoinPage(0)
        setSearch(true)
        // cacheCoins(0,4)
        console.log('values are', values)
        if (values.coin == ''){
            // console.log('values working')
            let min = values.min
            let max = values.max
            let trueFalse = values.ascDes
            console.log('trueFalse is', trueFalse)
            let temp = coinData.filter(function(num){
                // console.log('num is', num)
                if (num.current_price < max && num.current_price > min){
                    return num
                }
            })

            if (trueFalse == true){
                console.log('true')
                temp.sort((a, b) => (a.current_price > b.current_price) ? 1: -1)
                setSearchCoinData(temp)
                setDisplayData(temp.slice(0,4))
                // setDisplayData(temp)
            } 
            if (trueFalse == false) {
                console.log('false')
                temp.sort((a, b) => (a.current_price > b.current_price) ? -1: 1)
                setDisplayData(temp)
                setSearchCoinData(temp)
                setDisplayData(temp.slice(0,4))
            }
            // console.log('temp is', temp)
            
        }
        else{
            console.log('coin name working')
            let temp = coinData
            // console.log(temp)
            temp = temp.filter(function(coin) {
                return coin.id == values.coin.toLowerCase()
            })
            setDisplayData(temp)
        }
    }

    function nextHandler(e){
        e.preventDefault()
        let temp = coinPage
        // console.log(coinPage)
        temp=(temp+4)
        console.log(temp)
        setCoinPage(temp)
        // console.log('coinPage Next is', coinPage)
        // console.log("searchCoinData.length", searchCoinData.length)
        if (coinPage >= searchCoinData.length - 4){
            alert('no way forward from here')
        }
        else {
       
        let start = coinPage+1 * 4
        let end = start + 4
        cacheCoins(start,end)
        }
    
    
    }

    function prevHandler(e){
        e.preventDefault()
        let temp = coinPage
        temp = (temp-4)
        // console.log('coinPage Prev is', coinPage)
        if (temp >= 0){
            setCoinPage(temp)
            let start = coinPage-1 *4
            let end = start + 4
            cacheCoins(start,end)
        }
        else{
            alert('No way back from here')
        }
    }

    return (
        <div className="bg-white h-full overflow-scroll relative ">
            <Header/>
            <SearchForm onSearch={searchHandler}/>
            <CoinListed filteredCoins={displayData}/>

            <div className='w-11/12 mx-auto flex items-center justify-between'>
            <button className={search ? 'visible w-2/5 border-2 rounded-md bg-gray-800 text-white rounded-lg h-10' : 'invisible absolute'} onClick={prevHandler} >Prev</button>

            <button className={search ? 'visible w-2/5 border-2 rounded-md bg-gray-800 text-white rounded-lg h-10' : 'invisible absolute'}  onClick={nextHandler}>Next</button>
            </div>
            <br className='mb-8'/>
            <Footer/>
        </div>
    )
}