import Link from 'next/link'

export default function OrderBanner({id}){
    console.log('check')

    return (
        <div className='bg-gradient-to-r from-purple-700 via-red-500 to-purple-300 z-40 h-20 w-full fixed flex items-center justify-around bottom-0 rounded-r-full '>
        <Link href={`../transactions/buy/${id}`}><p className='bg-blue-800 h-12 w-32 text-center rounded-full pt-1 text-white  border-2  hover:bg-black hover:border-green-500 hover:text-green-500 '>Buy</p></Link>
        <Link href={`../transactions/sell/${id}`}><p className='bg-blue-800 h-12 w-32 text-center rounded-full pt-1 text-white border-2  hover:bg-black hover:border-green-500 hover:text-green-500'>Sell</p></Link>
        </div>
    )
}