import { useState, useEffect } from 'react'
import BannerLog from './logBanner'
import axios from 'axios'
import { postUserCre } from '../../services/postUser'
import { getToken } from '../../services/login'
import Cookies from 'js-cookie'



export default function LogForm() {

    const[logOrSign,setLogOrsign] = useState(false)
    const[created,setCreated] = useState(false)
    
    


    const flipHandler = () => {
        const log = true
        const sign = false

        if (logOrSign) {
            setLogOrsign(sign)
        }
        else {
            setLogOrsign(log)
        }
        console.log(logOrSign)
        return 0

    }



    async function logHandler(e){
        e.preventDefault()
        
        const values = {
            username: e.target.email.value,
            password: e.target.pass.value}
        console.log(e.target.children.length == 3)
    

        if (e.target.children.length == 3 )
        {
        const res = await getToken(values)
        Cookies.set('token',res,{ expires:7 }, { domain : '0.0.0.0:3000'})
        Cookies.set('email',values.username, {expires:7}, {domain: '0.0.0.0:3000'})
        window.location.replace('/')
        }
        else {
            if (e.target.pass.value != e.target.passCon.value){
                alert('Password must match confirmation')
            }
            else {
                let reqTok = Cookies.get()
                await postUserCre(values,reqTok.csrftoken)
                alert('Account Created Please LogIn')
                flipHandler()
            }
        }
    }

    


    return (
        <>
        <div className='flex items-center h-screen w-screen'>
            <div className='w-screen pb-20'>
            <BannerLog/>
            <form className='bg-gradient-to-b from-gray-300 via-gray-200 to-white block w-11/12 mx-auto rounded-lg s' onSubmit={logHandler}>
                <input className='w-3/4 bg-gray-500 ml-10 h-12 rounded-md mt-4' id='email'type='text' placeholder=' Email@anActualemail.com'/>
                <input className='w-3/4 bg-gray-500 ml-10 mt-6 h-12 rounded-md' id='pass' type='password' placeholder=' Password'/>
                { !logOrSign ? 
                (<>
                <button className='w-3/4 bg-gray-800 ml-10 mt-8 h-12 rounded-md text-white font-semibold hover:bg-black' id='log' type='submit'>Log In</button>
                </>)
                :
                (<>
                <input className='w-3/4 bg-gray-500 ml-10 mt-6 h-12 rounded-md' id='passCon' type='password' placeholder=" Confirm Password" />
                <button className='w-3/4 bg-gray-800 ml-10 mt-8 h-12 rounded-md text-white font-semibold hover:bg-black hover:bold ' id='sign' type='submit' value='sign'>Sign Up</button>
                 </>)
                }
            </form>
            <div className='bg-white mt-2 w-screen grid grid-cols-2 grid-row-1 ml-10  w-3/4' >
                { logOrSign ? 
                (<>
                <p className='text-blue-700 pl-1'>Have an Account?</p>
                <button  className='text-blue-500'onClick={flipHandler}> Log in</button>
                </>):
                (<>
                <p className='text-blue-700 pl-1'>Need an Account?</p>
                <button  className='text-blue-500 ml-2' onClick={flipHandler}>Sign Up</button>
                </>)
                }
            </div>
            </div>
            
        </div>
        </>
    )
}
