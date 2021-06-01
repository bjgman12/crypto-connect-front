// import { MenuIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import Navbar from './navbar'
import Cookies from 'js-cookie'
export default function Header() {


    const [isAuth,setIsAuth] = useState(Cookies.get('email'))

    
    return(
        <>
        <header className='fixed top-0 bottom-0 left-0 right-0 z-50 h-16 bg-white rounded-sm shadow-xl lg:w-3/4 lg:mx-auto'>
            <div className="flex justify-between h-10">
                <Navbar/>
                { isAuth == undefined ? (<></>)
                :
                (<>
                <p className="pt-3 pr-3 text-xs leading-8 text-black " >{isAuth}</p>
                    </>)}
               
            </div>
        </header>
        </>
    )
}