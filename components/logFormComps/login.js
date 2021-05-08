import { useState } from 'react'
import BannerLog from './logBanner'

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

    return (
        <>
        <div className='flex items-center h-screen w-screen'>
            <div className=''>
            <BannerLog/>
            <form className='bg-gray-900 block'>
                <input className='w-3/4 bg-gray-800 ml-10 h-12 rounded-md' id='email'type='text' placeholder=' Email@anActualemail.com'/>
                <input className='w-3/4 bg-gray-800 ml-10 mt-6 h-12 rounded-md' id='pass' type='password' placeholder=' Password'/>
                { !logOrSign ? 
                (<>
                <button className='w-3/4 bg-gray-500 ml-10 mt-8 h-12 rounded-md text-white font-semibold' id='log' type='submit'>Log In</button>
                </>)
                :
                (<>
                <input className='w-3/4 bg-gray-800 ml-10 mt-6 h-12 rounded-md' id='pass conf' type='password' placeholder=" Confirm Password" />
                <button className='w-3/4 bg-gray-500 ml-10 mt-8 h-12 rounded-md text-white font-semibold' id='sign' type='submit'>Sign Up</button>
                 </>)
                }
            </form>
            <div className='bg-gray-900 mt-2 ml-10 flex'>
                { logOrSign ? 
                (<>
                <p className='text-white'>Have an Account?</p>
                <button  className='text-blue-500'onClick={flipHandler}> Log in</button>
                </>):
                (<>
                <p className='text-white'>Need an Account?</p>
                <button  className='text-blue-500 ml-2' onClick={flipHandler}>Sign Up</button>
                </>)
                }
            </div>
            </div>
            
        </div>
        </>
    )
}