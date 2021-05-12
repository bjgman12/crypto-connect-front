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
        let current_units = coins[txn.coin] ? coins[txn.coin] : 0;
        coins[txn.coin] = current_units + txn_units
    });
    return coins
}

function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}
