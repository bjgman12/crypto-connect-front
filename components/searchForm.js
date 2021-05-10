import { useState } from "react";

export default function SearchForm({onSearch}){
    // showing coin or min max
    const [coin, setCoin] = useState(false)
    const [min_Max, setMin_Max] = useState(false)
    const [trueFalse, setTrueFalse] = useState(false)

    const handleCoinClick = () => {
        setMin_Max(false)
        setCoin(!coin)
    }

    const handleMinMaxClick = () => {
        setCoin(false)
        setMin_Max(!min_Max)
    }

    // const handleTrueFalse = () => {
    //     setTrueFalse(!trueFalse)
    //     console.log("trueFalse is", trueFalse)
    // }
    const handleTrue =() => {
        setTrueFalse(true)
    }

    const handleFalse =() => {
        setTrueFalse(false)
    }

    // form values
    const initialValues = {
        coin: '',
        min: 0,
        max: 0,
        ascDes: true,
    };

    const searchName = {
        coin: '',
        min: 0,
        max: 0,
    }
    
    const [values, setValues] = useState(initialValues)
    const [coinName, setName] = useState(searchName)

    function formHandler(event){
        event.preventDefault();

        onSearch(values)
        setValues(values)
        // console.log('values are', values)
    }

    function coinFormHandler(event){
        event.preventDefault();
        
        onSearch(coinName)
        setName(coinName)
        // console.log('coinName is', coinName)

    }

    function inputChangeHandler(event) {
        let { name, value} = event.target;
        // console.log(event.target)
        setValues({...values, [name]: value});
    }

    function inputChangeHandlerName(event){
        let { name, value } = event.target;

        setName({...coinName, [name]: value});
    }

    return (
        <div className=''>
        <div className='mb-20'></div>

            <div className=''>
                <h2 className='text-md text-purple-700 ml-10'>Search by coin name, or min and max.</h2>
                <label className='text-lg text-purple-700 ml-10' for='coin_search'>Coin Name</label>
                <label className='text-lg text-purple-700 ml-10' for='min_max'>Min/Max Price</label>
                <br/>
                <input className='py-1 ml-10 bg-gray-800 text-white rounded-md mb-3' type="radio" id='coin_search' name='coin_mm' value='coin_search' onClick={handleCoinClick}/>
                <input className='py-1 ml-32 bg-gray-800 text-white rounded-md mb-3' type="radio" id='min_max' name='coin_mm' value='min_max' onClick={handleMinMaxClick}/>
            </div>

            <form onSubmit={coinFormHandler} className={coin ? 'visible w-11/12 shadow-2xl mx-auto rounded-md bg-gradient-to-b from-gray-100 via-gray-100 to-white text-center mb-4 ' : 'invisible absolute'}>
                <div className=''>
                    <input className='w-3/4 bg-gray-500  rounded-lg h-8 text-center mt-3 mb-3' type="text" name='coin' id='coin' value={coinName.coin} onChange={inputChangeHandlerName} placeholder='Coin Name Here'></input>
                    <br></br>
                    <button className={coin ? 'visible py-1  w-3/4 bg-gray-800 text-white rounded-lg mb-10 hover:bg-black hover:font-bold' : 'invisible absolute '}>Search</button>
                </div>
            </form>

            <form onSubmit={formHandler} className={min_Max ? 'visible w-11/12 mx-auto rounded-md bg-gradient-to-b from-gray-100 via-gray-100 to-white shadow-2xl mb-4 ' : 'invisible absolute'}>
                <div>
                    <p className='text-md text-purple-700 w-3/4 mx-auto text-center'>Search by ascending or decending</p>
                    <div className='text-purple-700 flex-wrap'>
                    <label className='text-xl ' for="min">MIN </label>
                    <input className='ml-3 py-1 w-2/5 bg-gray-500 text-white rounded-md mt-3' type="number" min='1' name='min' id='min' value={values.min} onChange={inputChangeHandler} placeholder='1'></input>
                    <label className='text-lg  ml-2' >ascending</label>
                    <input className='py-1 ml-2 text-white rounded-md mb-3' type='radio' name='ascDes' id='true' value={values.ascDes=trueFalse} onClick={handleTrue} onChange={inputChangeHandler} />
                    <label className='text-xl ' for="max">MAX</label>
                    <input className='ml-3 py-1 w-2/5 bg-gray-500 text-white rounded-md mb-3' type="number" min='1' name='max' id='max' value={values.max} onChange={inputChangeHandler} placeholder='max'></input>
                    <label className='text-lg  ml-2'>decending</label>
                    <input className='py-1 ml-2 bg-gray-800 text-white rounded-md mb-3' type='radio' name='ascDes' id='false' value={values.ascDes=trueFalse} onClick={handleFalse} onChange={inputChangeHandler} />
                    </div>
                    
                    <button className={min_Max ? 'visible py-1 ml-10  w-3/4 bg-gray-800 text-white rounded-md mb-3 hover:bg-black hover:font-bold' : 'invisible absolute'}>Search</button>

                </div>
            </form>
        
        </div>
    )
}
