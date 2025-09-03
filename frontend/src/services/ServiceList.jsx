import React from "react";
import ServiceCard from "./ServiceCard";
import {Col} from "reactstrap";

import weatherImg from '../assets/images/weather.png'
import guidImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
    {
        imgUrl: weatherImg,
        title : "Calculate Weather",
        desc: "Lorem ipsum dolor sit amet,consectetuer adipisicin elit."
    },
       {
        imgUrl: guidImg,
        title : "Best Tour Guide",
        desc: "Lorem ipsum dolor sit amet,consectetuer adipisicin elit."
    },
       {
        imgUrl: customizationImg,
        title : "Customization",
        desc: "Lorem ipsum dolor sit amet,consectetuer adipisicin elit."
    }
]


function ServiceList() {
    return(<>
     {
        servicesData.map((item,index) => (<Col lg ='3' key={index}><ServiceCard item={item} /></Col>
     ))}
    </> 
    );
       
    
}

export default ServiceList;