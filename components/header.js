// import { MenuIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Navbar from './navbar'

export default function Header() {
    
    return(
        <>
        <header className='fixed top-0 bottom-0 left-0 right-0 h-16 bg-white rounded-sm shadow-xl'>
            <div className="flex justify-between h-10">
                <Navbar/>
                <p className="pt-3 pr-3 text-xs leading-8 text-black " >  User@overlordmail.net </p>
            </div>
        </header>
        </>
    )
}