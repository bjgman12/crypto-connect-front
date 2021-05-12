import axios from 'axios'

const apiBase = 'https://stage-jlab-crypto.herokuapp.com/api/'

export async function setWatchlist(token,user_id,coin_id) {
    const tokenAPI = 'watchlist/'
    const body = {
        'user_id' : user_id,
        'coin' : coin_id

    }
    const config = makeConfig(token)
    const response = await axios.post(apiBase + tokenAPI,body, config)
    return response.data
}

function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}