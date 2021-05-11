import { CashIcon } from '@heroicons/react/solid'

export default function Balance(){
    return(
        <div className='w-3/4 px-2 py-3 mx-auto text-white rounded-md shadow-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400'>
            <div className='flex'>
                <h2>Crypto-Connect</h2>
                <CashIcon className='h-4 pl-2' />
            </div>
            <div className='flex'>
                <p className='text-4xl'>$0.00</p>
                <p className='text-xs'>(Cash Balance)</p>
            </div>
        </div>
    )
}