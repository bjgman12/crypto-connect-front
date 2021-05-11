import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrfToken'

export const userApi = 'https://stage-jlab-crypto.herokuapp.com/api/users/'

export async function postUserCre(values,cookie) {
    const body = {
        email : values.username,
        password : values.password
    }



    const response = await axios.post(userApi,body)
    console.log('RESPONSE',response.data)
    return response.data
}


