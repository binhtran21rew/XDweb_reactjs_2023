import React from 'react';
import {Link} from 'react-router-dom';

const Slidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link to="/admin/dashboard" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link  to="/admin/profile" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Profile
                    </Link>

                    <Link  to="/admin/categories" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Category
                    </Link>
                    <Link  to="/admin/product" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fa-brands fa-dropbox"></i></div>
                        Product
                    </Link>
                    <Link  to="/admin/slider" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fa-brands fa-dropbox"></i></div>
                        Slider
                    </Link>
                    <Link  to="/admin/orders" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Orders
                    </Link>
                    
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>

    )
}

export default Slidebar;