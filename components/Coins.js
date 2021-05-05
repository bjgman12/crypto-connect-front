import Link from 'next/link'
import coinGecko from '../services/coinGecko'

export default function Coin( {name , price , priceChange, image, id } ){
    


    return (
        
        <div className='grid grid-cols-5 grid-rows-1 gap-1'>
            <img className='h-10 ' src={image}/>
            <p className=''> {name} </p>
            <p> ${price.toFixed(2)} </p>
            {priceChange > 0 ?
            (
            <p className='text-green-500'> {priceChange.toFixed(2)} </p>
            ) :
            (
            <p className='text-red-500'> {priceChange.toFixed(2)} </p>
            ) }
            <p> graph comingsoon </p>
        </div>
    )
}


