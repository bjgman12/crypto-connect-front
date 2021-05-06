import { useEffect , useState  } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ResponsiveContainer,AreaChart,XAxis,YAxis,Area,Tooltip,CartesianGrid} from 'recharts'




export default function Detail() {

    const Post = () => {
        const router = useRouter()
        const { detail } = router.query
    
        return detail
        
    }

    const formatData = data => {
        return data.map((el) => {
            return {
            // do no recognize this time format
                time: el[0],
                price: el[1].toFixed(2),
            };
        });
    }
    
    const id = Post()

    const [graphData,setGraphData] = useState([])

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
    }, [])

    return (
        <>
        <h2> header here</h2>
        <h2></h2>
        <h2>market info here</h2>
        <ResponsiveContainer witdh='70%' height={200}>
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
               tickLine={false}
              />

               <yAxis 
               dataKey='price'
               axisLine={false}
               tickLine={false}
               tickCount={8}Zillow
               tickFormatter={number => `$${number}`}
               />


               <Tooltip/>

               <CartesianGrid opacity={0.7} vertical={false} />

           </AreaChart>
        </ResponsiveContainer>
        <h2> news here</h2>
        <h2> w auth buy sell watch here</h2>
        <h2> footer here</h2>
        </>
    )
}






