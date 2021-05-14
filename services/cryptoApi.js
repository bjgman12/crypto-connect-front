import axios from 'axios'
import Cookies from 'js-cookie'


const apiBase = 'https://stage-jlab-crypto.herokuapp.com/api/'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrfToken'


export async function getTransactions(token) {
    const path = 'transactions/'
    const config = makeConfig(token)
    const response = await axios.get(apiBase + path, config)
    return response.data
}

export async function getBalance(token) {
    const path = 'wallet/'
    const config = makeConfig(token)
    const response = await axios.get(apiBase + path, config)
    return response.data
}

export async function postTransactions(token, prices) {
    const tokenAPI = 'transactions/'
    const config = makeConfig(token)
    const response = await axios.post(apiBase + tokenAPI, prices, config)
}

export function currentCoins(transactions) {
    let coins = []
    console.log("transactions are:", transactions.length)
    if (transactions.length > 0){
        transactions.forEach((txn) => {	
            let txn_units = txn.transaction_type === "SELL" ? txn.units * - 1 : txn.units;   
            let existing = coins.find(item => item.coin == txn.coin);
            
            if (existing){
                existing.units += txn_units
            } else {
                let new_coin = {coin: txn.coin, units: txn_units}
                coins.push(new_coin)
            }            
        });
    }

    coins = coins.filter(coin => coin.units > 0);
    return coins
}


export async function getToken(values) {
    const login = 'auth/login/'
    const response = await axios.post(apiBase + login, values);
    const token = response.data.key
    Cookies.set('user_id',response.data.user_id, {expires:7},{domain : '0.0.0.0:3000'})

    return token;
}


export async function postUserCre(values) {
    const body = {
        email : values.username,
        password : values.password
    }
    const user = 'users/'
    const response = await axios.post(apiBase + user, body)
    return response.data
}


export async function delWatchList(token,id) {
    const tokenAPI = `watchlist/${id}`
    const config = makeConfig(token)
    const response = await axios.delete(apiBase + tokenAPI, config)
    return response.data
}



function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}