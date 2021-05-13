import axios from 'axios'

const config = {headers: {"Access-Control-Allow-Origin": "*"}}


export async function currentPrices(coins) {
    const api = `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`
    console.log(api, config)
    const response = await axios.get(api, config)
    return response.data

}


export async function getCoinData(coins){
    console.log(coins)
    const api = (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    const response = await axios.get(api,config)
    return response.data
}