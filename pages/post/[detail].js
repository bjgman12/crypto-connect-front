import { useEffect , useState  } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ResponsiveContainer,AreaChart,XAxis,YAxis,Area,Tooltip,CartesianGrid} from 'recharts'
import DetailBanner from '../../components/detail_banner'
import Header from '../../components/header'
import MarketData from '../../components/market_data'
import millify from 'millify'
import Description from '../../components/detail_coin_description'
import Link from 'next/link'
import News from '../../components/news'
import Footer from '../../components/footer'
import Cookies from 'js-cookie'
import OrderBanner from '../../components/buysellBanner'


export default function Detail() {

    const Post = () => {
        const router = useRouter()
        const { detail } = router.query
    
        return detail
        
    } 

    const removeHtml = data => {
        return data.replace('<a[^>]*? href=\"(?<url>[^\"]+)\"[^>]*?>(?<text>.*?)<\/a>','Test')

    }

    const formatData = data => {
        return data.map((el) => {
            return {
            // do no recognize this time format
                time: new Intl.DateTimeFormat('en-US', {month:'2-digit',day:'2-digit'}).format(el[0]),
                price: el[1].toFixed(2),
            };
        });
    }

    const formatUsdChange = data => {
        return String(data).replace('-','')
    }
    
    const id = Post()

    const [graphData,setGraphData] = useState([])
    const [isAuth,setIsAuth] = useState(Cookies.get('token'))

    const [markData,setMarkData] = useState(
        {
            market_data: 
                {
                    current_price: 'loading',
                    
                    },
            image: 'loading'
         })


    let resChartData = ''
    let resMarkData = ''

    useEffect(() => {
        let config = {
            headers:{'Access-Control-Allow-Origin':'*'}
        }
        const request = axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=20&interval=daily`,config)
        .then(res => {
            resChartData = res.data.prices
            setGraphData(formatData(resChartData))
       
        })
        .catch(error => {
            console.error(error)
        })
    }, [])

    useEffect(() => {
        let config = {
            headers:{'Access-Control-Allow-Origin':'*'}
        }
        const request = axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true&community_data=false`,config)
        .then(res => {
            resMarkData = res.data
            setMarkData(
                { 
                    id: res.data.id,
                    curr_price:res.data.market_data.current_price.usd,
                    logo:res.data.image.small,
                    changePerc:res.data.market_data.price_change_percentage_24h_in_currency.usd,
                    changeUsd:formatUsdChange(res.data.market_data.price_change_24h_in_currency.usd),

                    desc:res.data.description.en,

                    link:res.data.links.homepage,
                    vol:millify(res.data.market_data.total_volume.usd),
                    mCap:millify(res.data.market_data.market_cap.usd),
                    high_24h:millify(res.data.market_data.high_24h.usd),
                    low_24h:millify(res.data.market_data.low_24h.usd)
                 }
                )

        })
        .catch(error => {
            console.error(error)
        })
    },[])
    console.log(isAuth)

    return (
        <section className='bg-white h-full w-11/12  overflow-scroll relative'>
        <div className='pl-2'> 
        <Header/> 
        <DetailBanner 
            title={markData.id}
            price={markData.curr_price} 
            logo={markData.logo} 
            changePerc={markData.changePerc} 
            changeUsd={markData.changeUsd}
            />
        
        <ResponsiveContainer witdh="75%" height={200}>
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
               tickLine={true}
               angle={20}
               interval={2}
              />

               <yAxis 
               dataKey='price'
               axisLine={false}
               tickLine={false}
               tickFormatter={number => `$${number}`}
               />


               <Tooltip/>

               <CartesianGrid opacity={0.1} vertical={false} />

           </AreaChart>
        </ResponsiveContainer>
        <MarketData vol={markData.vol} mCap={markData.mCap} high={markData.high_24h} low={markData.low_24h}/>
        <Description id={markData.id} desc={markData.desc} />
        </div>
        { isAuth == undefined ? 
        (<><p>test</p></>):
        (<><OrderBanner id={id}/></>)}
        
        <News />
        <h2> w auth buy sell watch here</h2>
        <Footer />
        </section>
    )
}






