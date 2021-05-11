import { CurrencyDollarIcon } from '@heroicons/react/solid'

export default function Portfolio(){
    return(
        <div className='flex w-11/12 m-4 mx-auto text-purple-900'>
            <CurrencyDollarIcon className='h-20'/>
            <p className='pt-2 text-5xl'>$0.00</p>
            <p className='pt-2 text-xs'>(Portfolio Value)</p>
        </div>
    )
}