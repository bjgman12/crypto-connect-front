// import { MenuIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Navbar from './navbar'

export default function Header() {
    return(
        <header>
            <div className="border-b-2">
                {/* <MenuIcon className=" float-right text-right w-11 h-11 text-purple-600"/> */}
                
                <h1 className="text-purple-500 text-mobileHeader text-left font-bold ml-3 mb-2">Crypto-Connect</h1>
                <Navbar/>
            </div>
        </header>
    )
}