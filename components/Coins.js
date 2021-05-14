
import Link from 'next/link'
import { useState, useEffect} from 'react'
import { ResponsiveContainer,LineChart,XAxis,YAxis,Line,Tooltip,CartesianGrid} from 'recharts'
import axios from 'axios'
import { setWatchlist } from '../services/watchlistPost'
import Cookies from 'js-cookie'
import { SaveIcon } from '@heroicons/react/outline'
import { TrashIcon } from '@heroicons/react/solid'
import { delWatchList } from '../services/watchListDelete'
import { getWatchlist } from '../services/watchlistGet'
import NumberFormat from 'react-number-format'





export default function Coin( { price , priceChange, image, symbol,id , isWatch} ){
    

    const [graphData,setGraphData] = useState([])
    const [showAdd,setShowAdd] = useState(false)
    const [fill,setFill] = useState(false)
    const [isAuth,setIsAuth] = useState(false)
    const [watchId,setWatchId] = useState(0)

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
        await setWatchlist(Cookies.get('token'),Cookies.get('user_id'),id).then( res => {
            window.location.replace('/watchlist')
        })
        return 0}
        catch {
            alert('already in watchlist')
        }
    }


 

    const formatId = data => {
        let watchlist_Id = 0
        for ( let i = 0 ; i < data.length ; i++){
            console.log(data[i])
            console.log(data[i].watchlist_id)
            if (data[i].coin == id) {
                watchlist_Id = data[i].watchlist_id
            }
        }
        return watchlist_Id
                   
        }


    



    
    async function  deleter(){
            getWatchlist(Cookies.get('token'),Cookies.get('user_id')).then(res => {
            console.log('GetWatchRes',res)
            return formatId(res)
        }).then(res => {
            console.log('ASYNC',res)
            delWatchList(Cookies.get('token'),res).then( res => {

            window.location.replace('/watchlist')
            })
        })
            


        
    
    }
    

    return (
        <>
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
            </div>
            </Link>
            <div className='grid grid-cols-5 grid-rows-1 gap-1 bg-white  mb-2 ml-2 mr-2 rounded-md shadow-2xl z-0'>
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

           (<div className='grid grid-rows-1 grid-cols-3 w-full '>
            { ! isWatch ? (
           <SaveIcon className='h-10 mt-8 pr-4 ml-4 hover:text-purple-500 hover:z-10' onClick={addWatchList}/>):
           (<TrashIcon className='h-10 mt-8 ml-4 hover:text-red-700' onClick={deleter} />)
            }
           <ResponsiveContainer height={100} width={210} className='col-span-2 ml-20 z-0 '>

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
        </>
        
    )
}


