import React from "react";
import CarouselSlider from './Carousel/CarouselSlider'

import NavbarContent from '../../layouts/frondend/NavbarHome'
import NavbarCategory from "../../components/frondend/NavbarCategory";
import HomeProduct from "./HomePage/HomeProduct";
function Home(){
    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: "65px", marginTop: "-1px", padding:" 0 30px"}}>
                    <h6 className="m-0">Categories</h6>
                    <i className="fa fa-angle-down text-dark"></i>
                </a>
                <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                    <div className="navbar-nav w-100 overflow-hidden" style={{height: "100%"}}>
                       <NavbarCategory />
                    </div>
                </nav>
            </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                       <NavbarContent />
                    </nav>
                   <CarouselSlider />
                </div>
            </div>
            <HomeProduct />
        </div>
    )
};

export default Home;