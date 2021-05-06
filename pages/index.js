import Coin from "../components/Coins";
import CoinListed from "../components/listed";
import React,{ useEffect,useState,useContext } from 'react'
import coinGecko from '../services/coinGecko'
import BarForm from '../components/searchBar'
import News from '../components/news'
import Header from '../components/header'
import Mission from '../components/mission'

export default function Home() {
    
    const [coinData,setCoinData] = useState([])
    const [displayData,setDisplayData] = useState([])
    const [coinParam,setCoinParam] = useState('')
    const [coinPage,setCoinPage] = useState(1)

    const getServerSideProps = async() => {
    
        const res = await coinGecko.get('/coins/markets/', {
                params:{
                    vs_currency: 'usd',
                    ids: coinParam
                },
            });
        
        let filteredCoins = await res.data;
        setCoinData(filteredCoins);

        }
    
    getServerSideProps()
        
        function searchHandler(values) {
            setCoinParam(values.query)
            
            
        }
        
        function pageHandler(e){
            console.log(e.target)
        }

    return (
        <div className="bg-center bg-gray-800">
            <Header/>
            <Mission/>
            <BarForm onSearch={searchHandler}/>
            <CoinListed filteredCoins={coinData}/>
            <form onSubmit={pageHandler}>
                <button> Next </button>
                <button> Prev</button>
            </form>
            <News/>
            <p> footer here </p>

        </div>
    )
}



