import { useState } from 'react'
import BannerLog from './logBanner'
import { getToken, postUserCre } from '../../services/cryptoApi'
import Cookies from 'js-cookie'



export default function LogForm() {

    const[logOrSign,setLogOrsign] = useState(false)


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
        <div className='flex items-center w-screen h-screen'>
            <div className='w-screen pb-20'>
            <BannerLog/>
            <form className='block w-11/12 mx-auto rounded-lg bg-gradient-to-b from-gray-300 via-gray-200 to-white s' onSubmit={logHandler}>
                <input className='w-3/4 h-12 mt-4 ml-10 bg-gray-500 rounded-md' id='email'type='text' placeholder=' Email@anActualemail.com'/>
                <input className='w-3/4 h-12 mt-6 ml-10 bg-gray-500 rounded-md' id='pass' type='password' placeholder=' Password'/>
                { !logOrSign ? 
                (<>
                <button className='w-3/4 h-12 mt-8 ml-10 font-semibold text-white bg-gray-800 rounded-md hover:bg-black' id='log' type='submit'>Log In</button>
                </>)
                :
                (<>
                <input className='w-3/4 h-12 mt-6 ml-10 bg-gray-500 rounded-md' id='passCon' type='password' placeholder=" Confirm Password" />
                <button className='w-3/4 h-12 mt-8 ml-10 font-semibold text-white bg-gray-800 rounded-md hover:bg-black hover:bold ' id='sign' type='submit' value='sign'>Sign Up</button>
                 </>)
                }
            </form>
            <div className='grid w-3/4 w-screen grid-cols-2 mt-2 ml-10 bg-white grid-row-1' >
                { logOrSign ? 
                (<>
                <p className='pl-1 text-blue-700'>Have an Account?</p>
                <button  className='text-blue-500'onClick={flipHandler}> Log in</button>
                </>):
                (<>
                <p className='pl-1 text-blue-700'>Need an Account?</p>
                <button  className='ml-2 text-blue-500' onClick={flipHandler}>Sign Up</button>
                </>)
                }
            </div>
            </div>
            
        </div>
        </>
    )
}
