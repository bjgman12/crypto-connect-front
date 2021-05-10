import axios from 'axios'

export const login=' https://stage-jlab-crypto.herokuapp.com/api/auth/login'

export async function getToken(values) {
    

    const response = await axios.post(login,values);

    return response.data.access;


}
