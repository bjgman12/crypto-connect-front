import NumberFormat from 'react-number-format'

export default function DetailBanner({ title, price, logo, changePerc, changeUsd }) {

    return (
        <>
        <div className='flex justify-between mt-20'>
        <h1 className="font-sans text-4xl text-black uppercase">{title}</h1>
        <img src={logo}/>
        </div>

        <div>
            <h2 className='mt-2 font-mono text-2xl font-medium text-black'>
                <NumberFormat value={ price }  displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={2}/>
            </h2>
            { changePerc < 0 ?
            (
                <div className='flex text-sm text-red-500'>
                <p className=''>
                    <NumberFormat value={ changeUsd }  displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={2} prefix={'-$'}/>
                </p>
                <p className='pl-1 text-xs'>({changePerc}%)</p>
                </div>
            ):
            (
                <div className='flex text-sm text-green-500'>
                <p className=''>
                    <NumberFormat value={ changeUsd }  displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={2} prefix={'+$'}/>
                </p>
                <p className='pl-1 text-xs'>({changePerc}%)</p>
                </div>
            )}
            
        </div>

        </>
    )

}