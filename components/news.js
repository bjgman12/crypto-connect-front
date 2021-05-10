import React, { useEffect, useState } from 'react'
import axios from 'axios'

// console.log(process.env.REACT_APP_GUARDIAN_KEY)

export default function News() {
    const [article1, setarticle1] = useState()
    const [link1, setlink1] = useState()
    const [article2, setarticle2] = useState()
    const [link2, setlink2] = useState()
    

    useEffect(() => {
        let config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        }
        const request = axios.get(`https://content.guardianapis.com/search?q=cryptocurrency&api-key=${process.env.REACT_APP_GUARDIAN_KEY}`,config)
        .then(response => {
            setarticle1(response.data.response.results[0].webTitle)
            setlink1(response.data.response.results[0].webUrl)
            setarticle2(response.data.response.results[1].webTitle)
            setlink2(response.data.response.results[1].webUrl)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="ml-3 bg-gradient-to-b from-gray-300 via-gray-100 to-white mt-4 mr-3 rounded-md pl-2 flex-wrap mb-24 w-11/12">
            <h2 className='text-purple-800 text-lg font-semibold pt-3'> News</h2>
            <div className='bg-white shadow-2xl pl-3 pt-1 rounded-lg w-11/12 mb-2'>
            <p className="text-black font-semibold">{ article1 } </p>
            <a className="text-purple-700 font-semibold" href={ link1 }>Click to Read More</a>
            </div>

            <div className='bg-white shadow-2xl pl-3 pt-1 rounded-lg w-11/12 mb-2 font-semibold' >
            
            <p className="text-black">{ article2 } </p>
            <a className="text-purple-700" href={ link2 }>Click to Read More</a>
            </div>
        </div>
    )
}