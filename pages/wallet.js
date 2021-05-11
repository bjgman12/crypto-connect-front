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
    
    const [transactions, setTransactions] = useState("Loading...")
    const [cash_balance, setCashBalance] = useState("...")
    const [portfolio_balance, setPortfolioBalance] = useState('0.00')
    
    useEffect(() => {
        //  TODO: Redirect to Sign In if token not present
        const token = Cookies.get('token')
        getTransactions(token).then(response => {
            const data = JSON.stringify(response)
            setTransactions(data)  
        })

        getBalance(token).then(response => {
            const data = response[0].balance
            setCashBalance(data)
        })
    });
    
    // TODO: need to calculate portfolio balance to pass into Portfolio

    // TODO: constructor for transaction object

    
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