import {useState} from 'react'

export default function BarForm({onSearch}){
    const initialValues = {
        query : ''
    }

    const [values,setValues] = useState(initialValues);
    
    function submitHandler(e){
        e.preventDefault();
        onSearch(values);
        setValues(initialValues)
    }

    function inputChangeHandler(event){
        let { name , value } = event.target;

        setValues({... values, [name]: value });
    }

    return (
        <>
        <form onSubmit={submitHandler} className="text-center">
            <input name='query' type='query' id='query' value={values.query} onChange={inputChangeHandler} placeholder='Search Crypto Here'/>
            <button type='submit'>search</button>
        </form>
        </>
    );
}
