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

function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}