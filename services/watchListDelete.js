import axios from 'axios'

const apiBase = 'https://stage-jlab-crypto.herokuapp.com/api/'

export async function delWatchList(token,id) {
    const tokenAPI = `watchlist/${id}`

 
    const config = makeConfig(token)
    const response = await axios.delete(apiBase + tokenAPI,config)
    return response.data
}




function makeConfig(token) {
    return {
        headers: {
            'Authorization': 'Token ' + token
        }
    }
}