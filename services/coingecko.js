import axios from 'axios'

const config = {headers: {"Access-Control-Allow-Origin": "*"}}


export async function currentPrices(coins) {
    const api = `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`
    const response = await axios.get(api, config)
    return response.data

}


export async function getCoinData(coins){
    const api = (`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    const response = await axios.get(api,config)
    return response.data
}

export async function getDetailData(coin_id){
    const api = (`https://api.coingecko.com/api/v3/coins/${coin_id}?localization=false&market_data=true&community_data=false`)
    const response = await axios.get(api,config)
    return response.data
}

export async function getChartData(coin_id){
    const api = (`https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=usd&days=20&interval=daily`)
    const response = await axios.get(api,config)
    return response.data
}