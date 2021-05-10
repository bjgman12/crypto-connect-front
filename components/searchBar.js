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
        <div className='w-11/12 mx-auto '>.
        <form onSubmit={submitHandler} className="flex mb-4 h-14 bg-white rounded-md w-full items-center justify-between p-4 shadow-xl">
            <input className='h-8 w-3/4 bg-gray-900 rounded-3xl text-center text-white' name='query' type='query' id='query' value={values.query} onChange={inputChangeHandler} placeholder='Coin Name'/>
            <button className='h-8 bg-gray-500 w-1/4 rounded-3xl ml-4 text-white hover:bg-black hover:font-bold' type='submit'>search</button>
        </form>
        </div>
    );
}
