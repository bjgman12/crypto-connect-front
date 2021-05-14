import axios from 'axios'

const apiBase = 'https://stage-jlab-crypto.herokuapp.com/api/'

export async function getWatchlist(token,user_id) {
    const tokenAPI = 'watchlist/'
 
    const config = makeConfig(token)
    const response = await axios.get(apiBase + tokenAPI,config)
    return response.data
}




function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}