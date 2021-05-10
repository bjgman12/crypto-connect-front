// import { MenuIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Navbar from './navbar'

export default function Header() {
    return(
        <header className=' fixed top-0 left-0 right-0 bottom-0 bg-white h-16 rounded-sm shadow-xl'>
            <div className="flex h-10 justify-between">
                {/* <MenuIcon className=" float-right text-right w-11 h-11 text-purple-600"/> */}
                <Navbar/>
                <p className=" text-black  text-xs  leading-8 pr-3 pt-3" >  User@overlordmail.net </p>
            </div>
        </header>
    )
}