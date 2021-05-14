import Header from '../../../components/header'
import Footer from '../../../components/footer'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { postTransactions } from '../../../services/wallet';
import Cookies from 'js-cookie'
import { getBalance, currentCoins, getTransactions } from '../../../services/wallet'
import { CurrencyDollarIcon, CreditCardIcon } from '@heroicons/react/outline'


export default function Sell(){
    const Post = () => {
        const router = useRouter()
        const { selling } = router.query
    
        return selling
    } 
    const id = Post()
    const [coinInfo, setCoinInfo] = useState({
        name: 'loading...',
        curr_price: 'loading...',
        logo: 'loading...',
    })

    const [cash_balance, setCashBalance] = useState("0.00")
    const [ownedCoins, setOwnedCoins] = useState('loading...')
    const [unitsOwned, setUnitsOwned] = useState(0)

    useEffect(() => {
        let config = {
            headers:{'Access-Control-Allow-Origin':'*'}
        }
        const request = axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true&community_data=false`,config)
        .then(res => {
            // console.log("res is", res)
            setCoinInfo(
                { 
                    name: res.data.id,
                    curr_price:res.data.market_data.current_price.usd,
                    logo:res.data.image.small,
                 }
                )
            const token = Cookies.get('token')
            getBalance(token).then(response => {
                const data = response[0].balance
                setCashBalance(data)
            })
    
            getTransactions(token).then(response => {
                let coins = currentCoins(response)
                let resultCoins = coins.filter(coin => coin.coin == res.data.id);
                if (resultCoins[0]){
                    setUnitsOwned(resultCoins[0].units)
                    setOwnedCoins(Number.parseFloat(resultCoins[0].units * res.data.market_data.current_price.usd).toFixed(2))
                }
                else{
                    setOwnedCoins(0)
                }
            })
            
        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    const [sellPrice, setSellPrice] = useState(0)

    const changeHandler = (e) => {
        e.preventDefault()
        setSellPrice(Number.parseFloat(e.target.value * coinInfo.curr_price).toFixed(2))
    }

    
    const sellHandler = (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        const id = Cookies.get('user_id')

        const info = {
            user_id: id,
            units: e.target.units.value,
            price: Number.parseFloat(coinInfo.curr_price).toFixed(2),
            coin: coinInfo.name,
            transaction_type: 'SELL'
        }

        console.log("info[units] is", info[units])
        if (info.units > unitsOwned){
            alert('not enough units to sell')
            info.units = 0
        }
        else{
            postTransactions(token, info).then(response => {
                console.log(response)
                window.location.replace('/wallet')
            })
        }

    }

    return(
        <div className='bg-white h-screen  mt-16'>
        <Header/>
        <div className='flex w-full justify-around items-center text-purple-700 pt-2'>
                <div className='w-3/8 text-center'>
                    <Link href='../../wallet'><CurrencyDollarIcon className='h-14 ml-2 w-3/4'/></Link>
                    <p className=''>Usable Cash: </p>
                    <p className=''>${cash_balance}</p>
                </div>
                <div className='w-3/8 text-center'>
                    <CreditCardIcon className='h-14 ml-2 w-3/4'/>
                    <p className='capitalize'>{coinInfo.name}</p>
                    <p className=''>Units Owned: {unitsOwned}</p>
                </div>
            </div>
        <div className='w-11/12 mx-auto text-center uppercase text-2xl text-black font-semibold mt-10 '> Sell {coinInfo.name}</div>
        <form className='text-white bg-transparent w-11/12 mx-auto  rounded-xl   mt-2' onSubmit={sellHandler}>
            <div className='bg-gradient-to-tr from-black via-green-600 to-purple-800 pb-1 rounded-lg'>
                <div className='flex items-center px-2  pt-1'>
                <p className='text-xl text-center mb-1  pt-1'>Amount: </p>
                <div className='flex'>
                <p className='text-xl text-center pl-1 '>${sellPrice}</p>
                <p className='text-red-500 text-sm font-semibold'>(mock dollars)</p>
                </div>
                </div>
                <div className="flex w-11/12 mx-auto items-center justify-between  mt-20">
                    <div>
                    <label className=' text-xl text-center '>Units</label>
                    <input className=' w-1/4 h-5 bg-black text-center ml-2 rounded-full' type='number' name='units' id='units' min='1' onChange={changeHandler}></input>
                </div>
                <img className='h-10' src={coinInfo.logo}/>
                </div>
            </div>
            <p className='text-sm  text-left pl-2 pt-1'>Price Per Unit: ${coinInfo.curr_price}</p>
            <button className='bg-black to-black borderpx-4 py-3 w-full   rounded-full  hover:bg-gray-500 '>Sell</button>
        </form>
        <Footer/>

    </div>
    )
}