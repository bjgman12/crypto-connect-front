import Header from '../components/header'
import Footer from '../components/footer'
import Balance from '../components/balances'
import React, {useState, useEffect} from 'react'

export default function Wallet() {

    return(
        <>
            <div className="bg-white h-screen">
                <Header/>
                <div className='mb-20'></div>
                <Balance/>
                <Footer/>
            </div>
        </>
    )
}