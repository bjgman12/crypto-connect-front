import axios from 'axios'

const apiBase = 'https://stage-jlab-crypto.herokuapp.com/api/'


export class Transaction {
    constructor(info) {
        this.type = info.transaction_type;
        this.coin = info.coin;
        this.price = info.price;
        this.units = info.units;
    }
}

export async function getTransactions(token) {
    const path = 'transactions/'
    const config = makeConfig(token)
    const response = await axios.get(apiBase + path, config)
    const transactions = response.data.map(info => new Transaction(info))
    return transactions
}

export async function getBalance(token) {
    const path = 'wallet/'
    const config = makeConfig(token)
    const response = await axios.get(apiBase + path, config)
    return response.data
}

function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}