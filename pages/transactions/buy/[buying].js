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
        <div className='bg-white h-screen  mt-16'>
            <Header/>
            <div className='flex  w-full items-center justify-between text-purple-700  pt-2'>
                <p className='pl-1'>Owned Coins :(x.xx)</p>
                <p className=' w-4/12 pl-4'>Balance:(x.xx)</p>
         </div>
            <div className='w-11/12 mx-auto text-center uppercase text-2xl text-black font-semibold mt-10 '> Buy {coinInfo.name}</div>
            {/* make an on submit to send to the SQL database */}
            <form className='text-white bg-transparent w-11/12 mx-auto  rounded-xl   mt-2' onSubmit={purchaseHandler}>
                <div className='bg-gradient-to-tr from-black via-green-600 to-purple-800 pb-1 rounded-lg'>
                    <div className='flex items-center px-2  pt-1'>
                    <p className='text-xl text-center mb-1  pt-1'>Amount: </p>
                    <div className='flex'>
                    <p className='text-xl text-center pl-1 '>${buyPrice}</p>
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
                <button className='bg-black to-black borderpx-4 py-3 w-full   rounded-full  hover:bg-gray-500 '>Order</button>
            </form>
            <Footer/>

        </div>
    )
}