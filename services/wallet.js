import axios from 'axios'

const apiBase = 'https://stage-jlab-crypto.herokuapp.com/api/'

export async function getTransactions(token) {
    const tokenAPI = 'transactions/'
    const config = makeConfig(token)
    const response = await axios.get(apiBase + tokenAPI, config)
    return response.data
}

export async function postTransactions(token, prices) {
    const tokenAPI = 'transactions/'
    const config = makeConfig(token)
    const response = await axios.post(apiBase + tokenAPI, prices, config)
}

function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}
