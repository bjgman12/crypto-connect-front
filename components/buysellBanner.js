import Link from 'next/link'

export default function OrderBanner({id}){
    console.log('check')

    return (
        <div className='bg-gradient-to-r from-purple-700 via-red-500 to-purple-300 z-50 h-20 w-screen fixed flex items-center justify-around'>
        <Link href={`../transactions/buy/${id}`}><p className='bg-blue-800 h-10 w-32 text-center rounded-full leading-9 text-white mb-2 border-2  hover:bg-black hover:border-green-500 hover:text-green-500'>Buy</p></Link>
        <Link href={`../transactions/sell/${id}`}><p className='bg-blue-800 h-10 w-32 text-center rounded-full leading-9 text-white mb-2 border-2 mr-2 hover:bg-black hover:border-green-500 hover:text-green-500'>Sell</p></Link>
        </div>
    )
}