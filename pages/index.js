import CoinListed from "../components/listed"
import React,{ useEffect,useState, } from 'react'
import BarForm from '../components/searchBar'
import News from '../components/news'
import Header from '../components/header'
import Mission from '../components/mission'
import Footer from '../components/footer'
import axios from 'axios'
import Cookies from 'js-cookie'



export default function Home(props) {

    

    const [token,setToken] = useState(Cookies.get('token'))
    const [coinData,setCoinData] = useState([])
    const [displayData,setDisplayData] = useState([])
    const [coinPage,setCoinPage] = useState(0)

    let resData = ''
    console.log(token)
    
    useEffect(() => {
        const request = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res => {
            resData = res.data
            setCoinData(resData)
            setDisplayData(resData.slice(0,4))
            AuthCheck()
        })
        .catch(error => {
            console.error(error)
        })
    }, [])
    

    

    function cacheCoins(start = 0 ,end = 4) {
        setDisplayData(coinData.slice(start,end))
    }

    
    function searchHandler(values) {
        if (values.query == false){
            setCoinPage(0)
            cacheCoins(0,4)
        }
        else{
        let temp = coinData
        temp = temp.filter(function(coin) {
            return coin.id == values.query.toLowerCase()
        }
        )

        if (temp.length == 0){
            alert('Query Not Found')
        }
        else {
        setDisplayData(temp)
        }
        
    }    
}
    function nextHandler(e){
        e.preventDefault()
        let temp = coinPage
        if (temp > 23){
            alert('no way forward from here')
        }
        else {
        temp ++
        setCoinPage(temp)
        console.log(coinPage)
        let start = coinPage * 4
        let end = start + 4
        cacheCoins(start,end)
        }
    
    
    }

    function prevHandler(e){
        e.preventDefault()
        console.log(coinPage)
        let temp = coinPage
        if (temp > 0){
            temp--
            setCoinPage(temp)
            let start = coinPage*4
            let end = start + 4
            cacheCoins(start,end)
        }
        else{
            alert('No way back from here')
        }
    }



    return (
        <>
            <div className="bg-white h-full relative overflow-scroll">
                <Header tokenpass={token}/>
                <div className='mb-20'></div>
                <Mission/>
        
                <BarForm onSearch={searchHandler}/>

                <CoinListed filteredCoins={displayData}/>

                <div className='w-full flex items-center justify-between px-4'>
    
                    <button  className='w-2/5 bg-gray-500 rounded-lg h-10 text-white font-semibold  font-sans shadow-2xl hover:bg-black'onClick={nextHandler}>Next</button>
                    <button  className='w-2/5 bg-gray-500 rounded-lg h-10 text-white  font-semibold font-sans shadow-2xl hover:bg-black'onClick={prevHandler}>Prev</button>
                
        
                </div>
        
                <News/>

                <div className='bg-gradient-to-t from-gray-500 via-gray-300 to-white  w-screen mb-20 h-8'></div>
                <Footer/>

            </div>
        </>
    )
}



