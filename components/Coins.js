
import Link from 'next/link'
import { useState, useEffect} from 'react'
import { ResponsiveContainer,LineChart,XAxis,YAxis,Line,Tooltip,CartesianGrid} from 'recharts'
import axios from 'axios'
import { setWatchlist } from '../services/watchlistPost'
import Cookies from 'js-cookie'
import { SaveIcon } from '@heroicons/react/outline'
import NumberFormat from 'react-number-format'




export default function Coin( { price , priceChange, image, symbol,id } ){
    

    const [graphData,setGraphData] = useState([])
    const [showAdd,setShowAdd] = useState(false)
    const [fill,setFill] = useState(false)
    const [isAuth,setIsAuth] = useState(false)

    const formatData = data => {
        setIsAuth(Cookies.get('token'))
        return data.map((el) => {
            return {
            // do no recognize this time format
                time: new Intl.DateTimeFormat('en-US', {year: 'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second: '2-digit'}).format(el[0]),
                price: el[1].toFixed(2),
            };
        });
    }

    let resData = ''
    
    useEffect(() => {
        const request = axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=70&interval=daily`)
        .then(res => {
            resData = res.data.prices
            setGraphData(formatData(resData))
            
       
        })
        .catch(error => {
            console.error(error)
        })
    },[])

    async function addWatchList(){
        try{
        await setWatchlist(Cookies.get('token'),Cookies.get('user_id'),id)
        return 0}
        catch {
            alert('already in watchlist')
        }
    }

    

    return (
        <Link href={`post/${id}`}>
        <div className='z-0 grid grid-cols-5 grid-rows-1 gap-1 mb-2 ml-2 mr-2 bg-white rounded-md shadow-2xl hover:bg-gray-300'>
            <img className='h-8 mt-1 ml-4 ' src={image}/>
            <p className='pt-2 font-semibold text-black'> {symbol.toUpperCase()} </p>
            <p className='pt-2 font-semibold text-black justify-self-end'> 
                <NumberFormat value={ price }  displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={2}/>
            </p>
            {priceChange > 0 ?
            (
            <p className='col-span-2 pt-2 pl-6 font-semibold text-green-500'> +{priceChange.toFixed(2)}%</p>
            ) :
            (
            <p className='col-span-2 pt-2 pl-6 font-semibold text-red-500'> {priceChange.toFixed(2)}%</p>
            ) }
            { ! isAuth  ?
            (<ResponsiveContainer height={100} width={300} className='col-span-5 ml-4'>
            <LineChart data={graphData}>

               <defs>
                   <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                       <stop  offset="0%" stopColor="#245187" stopOpacity={0.4}/>
                       <stop  offset="75%" stopColor="#245187" stopOpacity={0.05}/>
                   </linearGradient>
               </defs>

               <Line dataKey='price' stroke='#2451B7' dot={false}/>

               <XAxis 
               dataKey='time'
               axisLine={false}
               tickLine={false}/>

               <yAxis 
               dataKey='price'
               />



               <CartesianGrid opacity={0.7} vertical={false} />

           </LineChart>
           </ResponsiveContainer>):
           (<div className='grid w-full grid-cols-3 grid-rows-1 '>
           <SaveIcon className='h-10 pr-4 mt-8 ml-4 hover:text-purple-500 hover:z-10' onClick={addWatchList}/>
           <ResponsiveContainer height={100} width={210} className='z-0 col-span-2 ml-20 '>
            <LineChart data={graphData}>

               <defs>
                   <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                       <stop  offset="0%" stopColor="#245187" stopOpacity={0.4}/>ol-span-5
                       <stop  offset="75%" stopColor="#245187" stopOpacity={0.05}/>
                   </linearGradient>
               </defs>

               <Line dataKey='price' stroke='#2451B7' dot={false}/>

               <XAxis 
               dataKey='time'
               axisLine={false}
               tickLine={false}/>

               <yAxis 
               dataKey='price'
               />



               <CartesianGrid opacity={0.7} vertical={false} />

           </LineChart>
           </ResponsiveContainer>

           
           </div>)
           }
        </div>
        </Link> 
    )
}


