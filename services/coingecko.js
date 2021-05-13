import axios from 'axios'

const config = {headers: {"Access-Control-Allow-Origin": "*"}}


export async function currentPrices(coins) {
    const api = `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`
    console.log(api, config)
    const response = await axios.get(api, config)
    return response.data

}
