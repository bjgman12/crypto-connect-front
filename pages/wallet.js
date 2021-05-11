import Header from '../components/header'
import Footer from '../components/footer'
import Portfolio from '../components/wallet/portfolio'
import Balance from '../components/wallet/balance'
import History from '../components/wallet/history'
import Coins from '../components/wallet/coins'
import React, {useState, useEffect} from 'react'
import { getTransactions } from '../services/wallet'
import Cookies from 'js-cookie'


export default function Wallet() {
    
    const [transactions, setTransactions] = useState("Loading...")
    
    useEffect(() => {
        //  TODO: Redirect to Sign In if token not present
        const token = Cookies.get('token')
        getTransactions(token).then(response => {
            const data = JSON.stringify(response)
            setTransactions(data)  
        })
    });
    
    return(
        <div className="h-full overflow-scroll bg-white">
            <Header/>
            <Portfolio />
            <Balance />
            <Coins/>
            { transactions }
            <History/>   
            <Footer/>
        </div>
    )
}