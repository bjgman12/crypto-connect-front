import Header from '../../../components/header'
import Footer from '../../../components/footer'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { getBalance, currentCoins, getTransactions, postTransactions } from '../../../services/cryptoApi'
import { CurrencyDollarIcon, CreditCardIcon } from '@heroicons/react/outline'


export default function Buy(){
    const Post = () => {
        const router = useRouter()
        const { buying } = router.query
    
        return buying
    } 
    const postId = Post()

    const [cash_balance, setCashBalance] = useState("0.00")

    const [coinInfo, setCoinInfo] = useState({
        name: 'loading...',
        curr_price: 'loading...',
        logo: 'loading...',
    })

    const [ownedCoins, setOwnedCoins] = useState('loading...')

    useEffect(() => {
        let config = {
            headers:{'Access-Control-Allow-Origin':'*'}
        }
        const request = axios.get(`https://api.coingecko.com/api/v3/coins/${postId}?localization=false&market_data=true&community_data=false`,config)
        .then(res => {
            setCoinInfo(
                { 
                    name: res.data.id,
                    curr_price:res.data.market_data.current_price.usd,
                    logo:res.data.image.small,
                 }
                )
            const token = Cookies.get('token')
            getBalance(token).then(response => {
                console.log(response)
                const data = response[0].balance
                setCashBalance(data)
            })
    
            getTransactions(token).then(response => {
                let coins = currentCoins(response)
                let resultCoins = coins.filter(coin => coin.coin == res.data.id);
                if (resultCoins[0]){
                    setOwnedCoins(Number.parseFloat(resultCoins[0].units * res.data.market_data.current_price.usd).toFixed(2))
                }
                else {
                    setOwnedCoins(0)
                }
            })

        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    const [buyPrice, setBuyPrice] = useState(0)

    const changeHandler = (e) => {
        e.preventDefault()
        setBuyPrice(Number.parseFloat(e.target.value * coinInfo.curr_price).toFixed(2))
    }
    
    const purchaseHandler = (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        const id = Cookies.get('user_id')
        const info = {
            user_id: id,
            units: e.target.units.value,
            price: Number.parseFloat(coinInfo.curr_price).toFixed(2),
            coin: coinInfo.name,
            transaction_type: 'BUY'
        }
        postTransactions(token, info).then(response => {
                console.log(response)
                window.location.replace('/wallet/')
        })
        .catch(error=> {
            console.log(error)
            alert('YOU DONT HAVE THE FUNDS!')
        })
    }

    return(
        <div className='h-screen mt-16 bg-white'>
            <Header/>
            <div className='flex items-center justify-around w-full pt-2 text-purple-700'>
                <div className='text-center w-3/8'>
                    <Link href='../../wallet'><CurrencyDollarIcon className='w-3/4 ml-2 h-14'/></Link>
                    <p className=''>Usable Cash: </p>
                    <p className=''>${cash_balance}</p>
                </div>
                <div className='text-center w-3/8'>
                    <CreditCardIcon className='w-3/4 ml-2 h-14'/>
                    <p className='capitalize'>{coinInfo.name}</p>
                    <p className=''>Owned: ${ownedCoins}</p>
                </div>
            </div>
            <div className='w-11/12 mx-auto mt-10 text-2xl font-semibold text-center text-black uppercase '> Buy {coinInfo.name}</div>
            <form className='w-11/12 mx-auto mt-2 text-white bg-transparent rounded-xl' onSubmit={purchaseHandler}>
                <div className='pb-1 rounded-lg bg-gradient-to-tr from-black via-green-600 to-purple-800'>
                    <div className='flex items-center px-2 pt-1'>
                    <p className='pt-1 mb-1 text-xl text-center'>Amount: </p>
                    <div className='flex'>
                    <p className='pl-1 text-xl text-center '>${buyPrice}</p>
                    <p className='text-sm font-semibold text-red-500'>(mock dollars)</p>
                    </div>
                    </div>
                    <div className="flex items-center justify-between w-11/12 mx-auto mt-20">
                        <div>
                        <label className='text-xl text-center '>Units</label>
                        <input className='w-1/4 h-5 ml-2 text-center bg-black rounded-full ' type='number' name='units' id='units' min='1' onChange={changeHandler}></input>
                    </div>
                    <img className='h-10' src={coinInfo.logo}/>
                    </div>
                </div>
                <p className='pt-1 pl-2 text-sm text-left'>Price Per Unit: ${coinInfo.curr_price}</p>
                <button className='w-full py-3 bg-black rounded-full to-black borderpx-4 hover:bg-gray-500 '>Order</button>
            </form>
            <Footer/>

        </div>
    )
}