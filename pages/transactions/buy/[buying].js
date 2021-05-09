import Header from '../../../components/header'
import CoinListed from "../../../components/listed";
import SearchForm from '../../../components/searchForm'
import Footer from '../../../components/footer'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
            console.log("res is", res)
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

    return(
        <div className='bg-gray-900 h-screen'>
            <Header/>
            <div className='flex'>
                <p className='text-white text-3xl w-8/12 font-bold ml-2 mt-2'>Buy {coinInfo.name}</p>
                <p className='text-white text-sm w-4/12 mt-3'>Balance: (SQL here)</p>
            </div>
            <img className='mt-2 ml-2' src={coinInfo.logo}/>

            {/* make an on submit to send to the SQL database */}
            <form className='text-white w-100 border-2 rounded-md border-purple-500 mt-2'>
                <div className='grid grid-rows-4 grid-cols-1 items-center'>
                    <p className='text-xl text-center border-b-2 border-purple-500 mb-1 '>Amount (mock dollars): </p>
                    <p className='text-xl text-center'>${buyPrice}</p>
                    <p className='text-sm text-gray-400 text-center'>Price Per Unit: ${coinInfo.curr_price}</p>
                    <div className="flex w-3/4 items-center">
                        <label className='w-full text-xl text-center'>Units</label>
                        <input className='w-1/4 bg-gray-800' type='number' name='units' id='units' min='1' onChange={changeHandler}></input>
                    </div>
                </div>
                <br/>
                <button className='bg-gray-800 px-4 py-3 w-full round-md mt-1 hover:bg-gray-600'>Order</button>
            </form>
            <Footer/>

        </div>
    )
}