
import Link from 'next/link'
import { useState, useEffect} from 'react'
import { ResponsiveContainer,LineChart,XAxis,YAxis,Line,Tooltip,CartesianGrid} from 'recharts'
import axios from 'axios'



export default function Coin( { price , priceChange, image, symbol,id } ){
    

    const [graphData,setGraphData] = useState([])

    const formatData = data => {
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

    return (
        <Link href={`post/${id}`}>
        <div className='grid grid-cols-5 grid-rows-1 gap-1 bg-white  mb-2 ml-2 mr-2 rounded-md shadow-2xl'>
            <img className='h-8 mt-1 ml-4 ' src={image}/>
            <p className='text-black font-semibold pt-2'> {symbol.toUpperCase()} </p>
            <p className='text-black pt-2 font-semibold '> ${price.toFixed(2)} </p>
            {priceChange > 0 ?
            (
            <p className='text-green-500 pt-2 col-span-2 pl-6 font-semibold'> +{priceChange.toFixed(2)}%</p>
            ) :
            (
            <p className='text-red-500 pt-2 col-span-2 pl-6 font-semibold'> {priceChange.toFixed(2)}% </p>
            ) }
            <ResponsiveContainer height={100} width={300} className='col-span-5 ml-4'>
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

               <Tooltip wrapperStyle={{ top: 0, left: -135 }}/>


               <CartesianGrid opacity={0.7} vertical={false} />

           </LineChart>
           </ResponsiveContainer>
        </div>
        </Link> 
    )
}


