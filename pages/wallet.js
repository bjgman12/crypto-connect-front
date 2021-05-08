import Header from '../components/header'
import Footer from '../components/footer'
import Balance from '../components/balances'
import React, {useState, useEffect} from 'react'

export default function Wallet() {

    return(
        <>
            <div className="bg-gray-800 h-screen">
                <Header/>
                <Balance/>
                <Footer/>
            </div>
        </>
    )
}