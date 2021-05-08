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

    const handleTrueFalse = () => {
        setTrueFalse(!trueFalse)
        console.log("trueFalse is", trueFalse)
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
        <>
        <div>
                <h2>Search by coin name, or min and max.</h2>
                <input type="radio" id='coin_search' name='coin_mm' value='coin_search' onClick={handleCoinClick}/>
                <label for='coin_search'>Coin Name</label>
                <input type="radio" id='min_max' name='coin_mm' value='min_max' onClick={handleMinMaxClick}/>
                <label for='min_max'>Min/Max Price</label>
            </div>
            <form onSubmit={coinFormHandler} className={coin ? 'visible w-100 border-2 rounded-md border-purple-500' : 'invisible absolute'}>
                <div >
                    <label for="coin">Coin</label>
                    <input type="text" name='coin' id='coin' value={coinName.coin} onChange={inputChangeHandlerName} placeholder='Coin Name Here'></input>
                    <br></br>
                    <button className={coin ? 'visible ' : 'invisible absolute '}>Search</button>
                </div>
            </form>

            <form onSubmit={formHandler} className={min_Max ? 'visible w-100 border-2 rounded-md border-purple-500' : 'invisible absolute'}>
                <div>
                    <label for="min">min</label>
                    <input type="number" name='min' id='min' value={values.min} onChange={inputChangeHandler} placeholder='Min'></input>
                    <br/>
                    <label for="max">max</label>
                    <input type="number" name='max' id='max' value={values.max} onChange={inputChangeHandler} placeholder='max'></input>
                    <br></br>
                    <label>Search by ascending or decending order</label>
                    <br/>
                    {/* working on this */}
                    <label>ascending</label>
                    <input type='radio' name='ascDes' id='true' value={values.ascDes=trueFalse} onClick={handleTrueFalse} onChange={inputChangeHandler} />
                    <label>decending</label>
                    <input type='radio' name='ascDes' id='false' value={values.ascDes=trueFalse} onClick={handleTrueFalse} onChange={inputChangeHandler} />
                    <br/>
                    <button className={min_Max ? 'visible ' : 'invisible absolute'}>Search</button>
                </div>
            </form>
        
        </>
    )
}