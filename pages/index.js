import CoinListed from "../components/listed"
import React,{ useEffect,useState, } from 'react'
import BarForm from '../components/searchBar'
import News from '../components/news'
import Header from '../components/layout/header'
import Mission from '../components/mission'
import Footer from '../components/layout/footer'
import axios from 'axios'
import Cookies from 'js-cookie'
import { getCoinData } from '../services/coingecko'


export default function Home(props) {

    

    const [token,setToken] = useState(Cookies.get('token'))
    const [coinData,setCoinData] = useState([])
    const [displayData,setDisplayData] = useState([])
    const [coinPage,setCoinPage] = useState(0)
    const isWatch = false

    let resData = ''
    console.log(Cookies.get('user_id'))
    
    useEffect(() => {
        getCoinData('').then( res => {
            resData = res
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
            <div className="bg-white h-full relative overflow-scroll lg:w-3/4 lg:mx-auto">
                <Header tokenpass={token}/>
                <div className='mb-20'></div>
                <Mission/>
        
                <BarForm onSearch={searchHandler}/>
                
                <CoinListed filteredCoins={displayData} isWatch={isWatch}/>
            

                <div className='w-full flex items-center justify-between px-4 lg:justify-around'>
    
                    <button  className='w-2/5 lg:w-1/4 bg-gray-500 rounded-full h-10 text-white  font-semibold font-sans shadow-2xl hover:bg-black 'onClick={prevHandler}>Prev</button>
                    <button  className='w-2/5 lg:w-1/4 bg-gray-500 rounded-full h-10 text-white font-semibold  font-sans shadow-2xl hover:bg-black'onClick={nextHandler}>Next</button>
                
        
                </div>
        
                <News/>

                <div className='bg-gradient-to-t from-gray-500 via-gray-300 to-white  w-screen mb-20 h-8'></div>
                <Footer/>

            </div>
        </>
    )
}



