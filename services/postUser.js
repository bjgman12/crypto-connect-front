import axios from 'axios'

export const userApi = 'https://stage-jlab-crypto.herokuapp.com/admin/crypto_api/user/'

export async function postUserCre(values) {
    const body = {
        username : values.username,
        password : values.password
    }

    const response = await axios.post(userApi,body)

    return response.data
}


