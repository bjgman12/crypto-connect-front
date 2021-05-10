import { useState } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import BannerLog from '../components/logFormComps/logBanner'
import LogForm from '../components/logFormComps/login'

export default function LogSign(){

    return (
        <div className='h-screen bg-white  w-screen'>
        <Header/>
        <LogForm/>
        <Footer/>
        </div>
    )
}