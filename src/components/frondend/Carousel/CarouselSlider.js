import React, { useEffect, useState } from "react";
import axios from "axios";

import { imageAPI } from "../../../constant/Constant";

function CarouselSlider(){
    const [slider, setSlider] = useState([])
    useEffect(() => {
        axios.get('/api/get_slider')
            .then(res => {
                if(res.data.status === 200){
                    setSlider(res.data.slider)
                }
            })
    }, [setSlider])
    var displaySlider = ''
    if(slider.length > 0  ){
        displaySlider = slider.map( (data,i) => {
            return (
                <div className={"carousel-item " + ( i === 0 ? 'active': '' )}  style={{height: "410px"}} key={i}>
                    <img className="img-fluid" src={`${imageAPI}${data.image}`} alt={`${data.name}`}/>
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{maxWidthdth: "700px"}}>
                            <h4 className="display-4 text-white font-weight-semi-bold mb-4">{data.name}</h4>
                        </div>
                    </div>
                </div>
                
            )
        })
    }
    
    return(
        <div id="header-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {displaySlider}
            </div>
            <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                <div className="btn btn-dark" style={{width: "45px", height: "45px"}}>
                    <span className="carousel-control-prev-icon mb-n2"></span>
                </div>
            </a>
            <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                <div className="btn btn-dark" style={{width: "45px", height: "45px"}}>
                    <span className="carousel-control-next-icon mb-n2"></span>
                </div>
            </a>
        </div>
    )
}

export default CarouselSlider;