
import Link from 'next/link'
import { useState, useEffect} from 'react'
import { ResponsiveContainer,AreaChart,XAxis,YAxis,Area,Tooltip,CartesianGrid} from 'recharts'
import axios from 'axios'


export default function Coin( { price , priceChange, image, symbol,id } ){
    

    const [graphData,setGraphData] = useState([])

    const formatData = data => {
        return data.map((el) => {
            return {
                time: el[0],
                price: el[1].toFixed(2),
            };
        });
    }

    let resData = ''

    useEffect(() => {
        const request = axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=minutely`)
        .then(res => {
            resData = res.data.prices
            setGraphData(formatData(resData))
       
        })
        .catch(error => {
            console.error(error)
        })
    },)

    return (
        <Link href={`post/${id}`}>
        <div className='grid grid-cols-5 grid-rows-1 gap-.2'>
            <img className='h-10 ' src={image}/>
            <p className=''> {symbol.toUpperCase()} </p>
            <p> ${price.toFixed(2)} </p>
            {priceChange > 0 ?
            (
            <p className='text-green-500'> {priceChange.toFixed(2)} </p>
            ) :
            (
            <p className='text-red-500'> {priceChange.toFixed(2)} </p>
            ) }
            <ResponsiveContainer witdh='100%' height={100}>
            <AreaChart data={graphData}>

               <defs>
                   <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                       <stop  offset="0%" stopColor="#245187" stopOpacity={0.4}/>
                       <stop  offset="75%" stopColor="#245187" stopOpacity={0.05}/>
                   </linearGradient>
               </defs>

               <Area dataKey='price' stroke='#2451B7' fill="url(#color)"/>

               <XAxis 
               dataKey='time'
               axisLine={false}
               tickLine={false}/>

               <yAxis 
               dataKey='price'
               axisLine={false}
               tickLine={false}
               tickCount={8}
               tickFormatter={number => `$${number}`}
               />

               <Tooltip wrapperStyle={{ top: 0, left: -135 }}/>


               <CartesianGrid opacity={0.7} vertical={false} />

           </AreaChart>
        </ResponsiveContainer>
        </div>
        </Link> 
    )
}


