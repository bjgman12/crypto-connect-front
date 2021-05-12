import axios from 'axios'

const apiBase = 'https://stage-jlab-crypto.herokuapp.com/api/'



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

    coins = coins.filter(coin => coin.units > 0);
    return coins
}

function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}
