import millify from 'millify'

export default function MarketData(props){

    return (
        <>
        <h2 className='text-purple-700 font-bold text-lg mt-8'> Market Data: </h2>
        <div className='text-black grid grid-cols-2 grid-rows-2 mt-2 gap-y-3 font-sans bg-white shadow-2xl rounded-md p-2rop-shadow-2xl p-2'>
      
        <section className="flex">
            <p className='text-sm'>Volume :</p>
            <p className='pl-1 font-semibold '>${props.vol}</p>
            </section>
            <section className="flex">
            <p className='text-sm'>24h High:</p>
            <p className='pl-1 font-semibold '>${props.high}</p>
            </section>
            <section className="flex">
            <p className='text-sm'>Market Cap :</p>
            <p className='pl-1 font-semibold '>${props.mCap}</p>
            </section>
            <section className="flex">
            <p className='text-sm'>24h Low :</p>
            <p className='pl-1 font-semibold '>${props.low}</p>
            </section>
        </div>
        </>
    )
}