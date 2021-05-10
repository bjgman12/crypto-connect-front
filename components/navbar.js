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
                <MenuIcon className={click ? "absolute left-nav text-right w-0 h-0 text-gray-500" : 'absolute top-2 left-1 left-nav w-10 h-10 text-black'} onClick={handleClick}/>
                <XIcon className={click ? "absolute top-0 left-0 left-nav pt-1  mb-100 text-right w-12 h-16 text-black bg-white" : 'absolute left-nav w-0 h-0 text-black'} onClick={handleClick}/>
            </nav>
            <div className={click ? 'visible bg-white relative top-12 mr-5 mt-2 w-52 h-64 grid grid-rows-5 grid-cols-1 shadow-2xl z-40 ' : '  w-0 relative invisible'}>
                    <Link href='/'>
                        <a className='text-center pt-1 bg-white text-black font-sans font-medium   hover:bg-black hover:text-lg hover:font-bold  hover:text-white'>Home</a>
                    </Link>
                    <Link href='/search'>
                    <p className='text-center pt-1 bg-white text-black font-sans font-medium border-t-1  hover:bg-black hover:text-lg  hover:font-bold hover:text-white'>Search</p>
                    </Link>
                
                    <Link href='/wallet'>
                    <p className='text-center pt-1 bg-white text-black font-sans font-medium  hover:bg-black hover:text-lg hover:font-bold hover:text-white'>Wallet</p>
                    </Link>
                
                    <Link href='/loginform'>
                    <p className='text-center pt-1 bg-white text-black font-sans font-medium  hover:bg-black hover:text-lg hover:font-bold hover:text-white'>Log-in</p>
                    </Link>
                
                    <Link href='/'>
                    <p className='text-center pt-1 bg-white text-black font-sans font-medium  hover:bg-black hover:text-lg border-b-2 hover:font-bold hover:text-white'>Watch</p>
                    </Link>
                
            </div>
        </>
    )
}