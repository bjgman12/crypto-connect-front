import { useState } from 'react'
import Footer from '../components/layout/footer'
import Header from '../components/layout/header'
import BannerLog from '../components/logFormComps/logBanner'
import LogForm from '../components/logFormComps/login'
import { getToken, login } from '../services/login'

export default function LogSign(){

    const [token,setToken] = useState();
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('user@email.com')

    async function loginHanlder(values){
        console.log('values at loginForm',values)
        const fetchedToken = await getToken(values) 
        setToken(fetchedToken)
        console.log(token)
        setUsername(values.email)
    }


    return (
        <div className='h-screen bg-white  w-screen'>
        <Header/>
        <LogForm onSubmit={loginHanlder}/>
        <Footer/>
        </div>
    )
}