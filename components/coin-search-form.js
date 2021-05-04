import { useState } from "react";

export default function Form(props){
    const initialValues = {
        coin: '',
        min: 0,
        max: 0,
    };
    
    const [values, setValues] = useState(initialValues)

    function formHandler(event){
        event.preventDefault();

        setValues(values)
        console.log(values)
        
    }

    function inputChangeHandler(event) {
        let { name, value, type} = event.target;

        setValues({...values, [name]: value});
    }

    return (
        <form onSubmit={formHandler} >
            <div>
                <h2>Search by coin name, or min and max.</h2>
                <label for="coin">Coin</label>
                <input type="text" name='coin' id='coin' value={values.coin} onChange={inputChangeHandler} placeholder='Coin Name Here'></input>
                <br></br>
                <label for="min">min</label>
                <input type="number" name='min' id='min' value={values.min} onChange={inputChangeHandler} placeholder='Min'></input>
                <br></br>
                <label for="max">max</label>
                <input type="number" name='max' id='max' value={values.max} onChange={inputChangeHandler} placeholder='max'></input>
                <br></br>
                <button>Search</button>

            </div>
        </form>
    )
}