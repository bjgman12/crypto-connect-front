import Coin from "../components/Coins";
import CoinListed from "../components/listed";
import React,{ useEffect,useState,useContext } from 'react'
import coinGecko from '../services/coinGecko'



export default function Home({filteredCoins}) {

    return (
        <>
        <h1> Header here</h1>
        <p>Mission statement here</p>
        <p> search bar here</p>
        <CoinListed filteredCoins={filteredCoins}/>
        <p> news here </p>
        <p> footer here </p>

        </>
    )
}

export const getServerSideProps = async() => {
    const res = await coinGecko.get('/coins/markets/', {
        params:{
            vs_currency: 'usd'
        },
    });


let filteredCoins = await res.data;

console.log(filteredCoins)



return {
    props:{
        filteredCoins
    }
};
}

