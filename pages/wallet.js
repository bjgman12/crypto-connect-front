import Header from '../components/header'
import Footer from '../components/footer'
import Portfolio from '../components/wallet/portfolio'
import Card from '../components/wallet/card'
import History from '../components/wallet/history'
import Coins from '../components/wallet/coins'
import React, {useState, useEffect} from 'react'
import { getTransactions, getBalance } from '../services/transactions'
import Cookies from 'js-cookie'


export default function Wallet() {
    
    const [transactions, setTransactions] = useState([])
    const [cash_balance, setCashBalance] = useState("0.00")
    const [portfolio_balance, setPortfolioBalance] = useState('0.00')
    
    useEffect(() => {
        const token = Cookies.get('token')
        getTransactions(token).then(response => {
            console.log(response)
            setTransactions(response)  
        })

        getBalance(token).then(response => {
            const data = response[0].balance
            setCashBalance(data)
        })
    });
    
    return(
        <div className="h-full overflow-scroll bg-white">
            <Header/>
            <Portfolio balance = { portfolio_balance }/>
            <Card balance = { cash_balance }/>
            <Coins/>
            <History transactions = { transactions } />   
            <Footer/>
        </div>
    )
}