import axios from 'axios'

export const userApi = 'https://stage-jlab-crypto.herokuapp.com/api/transactions/'

export async function getTransactions(token) {
    const config = makeConfig(token)
    const response = await axios.get(userApi, config)
    return response.data
}


function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}