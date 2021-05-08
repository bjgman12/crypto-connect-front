import { useState } from 'react'
import Link from 'next/link'
import { MenuIcon } from '@heroicons/react/solid'
import { XIcon } from '@heroicons/react/solid'

export default function Navbar() {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    return (
        <>
            <nav className=''>
                {/* <Link to='/'>
                    Link Here
                </Link> */}
                <MenuIcon className={click ? "float-left absolute left-nav text-right w-0 h-0 text-purple-600" : 'float-right absolute left-nav top-4 w-10 h-10 text-purple-600'} onClick={handleClick}/>
                <XIcon className={click ? "float-left absolute left-nav top-4  mb-100 text-right w-10 h-10 text-purple-600" : 'float-right absolute left-nav w-0 h-0 text-purple-600'} onClick={handleClick}/>
            </nav>
            <ul className={click ? 'visible mb-14 flex' : 'invisible'}>
                <li className='flex-1 ml-1 '>
                    {/* <p onclick={closeMenu}>Test</p> */}
                    <Link href='/'>
                        <a className='text-white absolute top-20 px-3 py-1 border-2 rounded-md border-purple-500'>Home</a>
                    </Link>
                </li>
                <li className='flex-1'>
                    <Link href='/search'>
                    <p className='text-white absolute top-20 px-3 py-1 border-2 rounded-md border-purple-500'>Search</p>
                    </Link>
                </li>
                <li className='flex-1'>
                    <Link href='/'>
                    <p className='text-white absolute top-20 px-3 py-1 border-2 rounded-md border-purple-500'>Wallet</p>
                    </Link>
                </li>
                <li className='flex-1'>
                    <Link href='/loginform'>
                    <p className='text-white absolute top-20 px-3 py-1 border-2 rounded-md border-purple-500'>Log-in</p>
                    </Link>
                </li>
                <li className='flex-1'>
                    <Link href='/'>
                    <p className='text-white absolute top-20 px-3 py-1 border-2 rounded-md border-purple-500'>Watch</p>
                    </Link>
                </li>
            </ul>
        </>
    )
}