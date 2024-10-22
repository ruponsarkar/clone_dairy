import React, { useState, useEffect, useContext } from 'react'
// import Navbar from '../components/common/nav'
import Nav2 from '../components/common/navbar'
import About from '../components/home/about'
import Footer from '../components/common/footer'
import api from '../API/api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Overview from '../components/home/overview'
import { ColorContext } from '../App'
import OverviewScheme from "../components/home/OverviewScheme";
import Certificate from "../components/approvel/certificate";



const Homepage = () => {

    const [loader, setLoader] = useState(false);
    const { colors, bio } = useContext(ColorContext);



    return (
        <>



            <div className=''>
                <Nav2 />
                <Overview />
                <OverviewScheme />
                {/* <About bio={bio}/> */}

                {/* <Certificate /> */}
               
               <Footer />
            </div>
        </>
    )
}

export default Homepage;