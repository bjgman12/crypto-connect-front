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
        <div className='w-11/12 mx-auto mt-4'>
        <form onSubmit={submitHandler} className="flex items-center justify-between w-full p-4 mb-4 bg-white rounded-md shadow-xl h-14">
            <input className='w-3/4 h-8 text-center text-white bg-gray-900 rounded-3xl' name='query' type='query' id='query' value={values.query} onChange={inputChangeHandler} placeholder='Coin Name'/>
            <button className='w-1/4 h-8 ml-4 text-white bg-gray-500 rounded-3xl hover:bg-black hover:font-bold' type='submit'>search</button>
        </form>
        </div>
    );
}
