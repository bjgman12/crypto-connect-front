import Header from '../components/header'
import Footer from '../components/footer'
import Portfolio from '../components/wallet/portfolio'
import Card from '../components/wallet/card'
import History from '../components/wallet/history'
import Coins from '../components/wallet/coins'
import React, {useState, useEffect} from 'react'
import { getTransactions, getBalance } from '../services/wallet'
import Cookies from 'js-cookie'


export default function Wallet() {
    
    const [transactions, setTransactions] = useState([])
    const [cash_balance, setCashBalance] = useState("0.00")
    const email = Cookies.get('email')
    
    useEffect(() => {
        const token = Cookies.get('token')
        getTransactions(token).then(response => {
            setTransactions(response)  
        })

        getBalance(token).then(response => {
            const data = response[0].balance
            setCashBalance(data)
        })
    }, []);
    
    return(
        <div className="relative h-full overflow-scroll bg-white">
            <Header/>
            <div className='mb-20'></div>
            <Portfolio transactions = { transactions }/>
            <Card balance = { cash_balance } email = { email }/>
            <div className='mb-10'></div>
            <Coins  transactions = { transactions } />
            <History transactions = { transactions } />   
            <div className='w-screen h-8 mb-20 bg-gradient-to-t from-gray-100 via-gray-50 to-white'></div>
            <Footer/>
        </div>
    )
}