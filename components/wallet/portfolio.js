import { CurrencyDollarIcon } from '@heroicons/react/solid'
import NumberFormat from 'react-number-format'

export default function Portfolio({ balance }){
    return(
        <div className='flex w-11/12 m-4 mx-auto text-purple-900'>
            <CurrencyDollarIcon className='h-20'/>
            <p className='pt-2 text-5xl'>
                <NumberFormat value={ balance }  displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </p>
            <p className='pt-2 text-xs'>(Portfolio Value)</p>
        </div>
    )
}