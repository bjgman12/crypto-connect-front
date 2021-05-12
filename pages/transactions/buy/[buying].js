import Header from '../../../components/header'
import Footer from '../../../components/footer'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { postTransactions } from '../../../services/wallet';
import Cookies from 'js-cookie'

export default function Buy(){
    const Post = () => {
        const router = useRouter()
        const { buying } = router.query
    
        return buying
    } 
    const id = Post()
    const [coinInfo, setCoinInfo] = useState({
        name: 'loading...',
        curr_price: 'loading...',
        logo: 'loading...',
     })

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
        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    const [buyPrice, setBuyPrice] = useState(0)

    const changeHandler = (e) => {
        e.preventDefault()
        setBuyPrice(e.target.value * coinInfo.curr_price)
    }

    const purchaseHandler = (e) => {
        e.preventDefault()
        const token = Cookies.get('token')
        const id = Cookies.get('user_id')

        const info = {
            user_id: id,
            units: e.target.units.value,
            price: coinInfo.curr_price,
            coin: coinInfo.name,
            transaction_type: 'BUY'
        }
        postTransactions(token, info).then(response => {
                console.log(response)
                window.location.replace('/wallet/')
        })
        .catch(error=> {
            console.log(error)
        })
    }
    

    return(
        <div className='bg-white h-screen'>
            <Header/>
            <div className='flex'>
                <p className='text-purple-700 text-3xl w-8/12 font-bold ml-2'>Buy {coinInfo.name}</p>
                <p className='text-purple-700 text-sm w-4/12'>Balance: (SQL here)</p>
            </div>
            <img className='mt-1 ml-2' src={coinInfo.logo}/>

            {/* make an on submit to send to the SQL database */}
            <form className='text-white w-100 border-2 rounded-md border-purple-500 mt-2' onSubmit={purchaseHandler}>
                <div className='grid grid-rows-4 grid-cols-1 items-center'>
                    <p className='text-xl text-center mb-1 text-purple-700'>Amount (mock dollars): </p>
                    <p className='text-xl text-center text-purple-700'>${buyPrice}</p>
                    <p className='text-sm text-purple-900 text-center'>Price Per Unit: ${coinInfo.curr_price}</p>
                    <div className="flex w-3/4 items-center">
                        <label className='w-full text-xl text-center text-purple-700'>Units</label>
                        <input className='w-1/4 bg-gray-500' type='number' name='units' id='units' min='1' onChange={changeHandler}></input>
                    </div>
                </div>
                <br/>
                <button className='bg-gray-800 px-4 py-3 w-full round-md mt-1 hover:bg-gray-900'>Order</button>
            </form>
            <Footer/>

        </div>
    )
}