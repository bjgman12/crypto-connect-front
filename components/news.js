import React, { useEffect, useState } from 'react'
import axios from 'axios'

// console.log(process.env.REACT_APP_GUARDIAN_KEY)

export default function News() {
    const [article1, setarticle1] = useState()
    const [link1, setlink1] = useState()
    const [article2, setarticle2] = useState()
    const [link2, setlink2] = useState()
    

    useEffect(() => {
        const request = axios.get(`https://content.guardianapis.com/search?q=cryptocurrency&api-key=${process.env.REACT_APP_GUARDIAN_KEY}`)
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
        <div className="mb-20">
            <img src='https://www.usnews.com/dims4/USNEWS/0087eb5/2147483647/crop/1996x1310%2B3%2B0/resize/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F0f%2F3e%2Fb10501f74fa6b123dad8dbc925a7%2F210416-stock.jpg' width='280'/>
            <p className="text-white">{ article1 } </p>
            <a className="text-purple-500" href={ link1 }>Click to Read More</a>
            <br/>
            <img src='https://b2bm.s3.amazonaws.com/styles/default_image/s3/istock-1165342430_edited.jpg?itok=BilR0KOM' width='280'/>
            <p className="text-white">{ article2 } </p>
            <a className="text-purple-500" href={ link2 }>Click to Read More</a>
        </div>
    )
}