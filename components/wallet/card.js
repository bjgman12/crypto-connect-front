import { CashIcon } from '@heroicons/react/solid'
import NumberFormat from 'react-number-format'


export default function Card({ balance, email }){
    return(
        <div className='w-4/5 h-40 px-2 py-3 mx-auto text-white border border-gray-400 rounded-md shadow-2xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500'>
            <div className='flex'>
                <h2 className='text-lg font-lobster'>Crypto-Connect</h2>
                <CashIcon className='h-4 pl-2' />
            </div>
            <div className='flex'>
                <p className='text-4xl'>
                    <NumberFormat value={ balance }  displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </p>
                <p className='text-xs'>(Cash Balance)</p>
            </div>
            <div className='flex items-center justify-between px-2 mt-12 mb-2 text-xs'>
                <p> { email } </p>
            </div>
        </div>
    )
}