import axios from 'axios'
import Cookies from 'js-cookie'

export const login='https://stage-jlab-crypto.herokuapp.com/api/auth/login/'

export async function getToken(values) {
    const response = await axios.post(login,values);

    const token = response.data.key
    Cookies.set('user_id',response.data.user_id, {expires:7},{domain : '0.0.0.0:3000'})

    return token;
}

