import React from "react";
import { Link } from "react-router-dom";

function NavbarContent(){
    return (
        <>
            <Link to="" className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
            </Link>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                    <Link to="/" className="nav-item nav-link active">Home</Link>
                    <Link to="/collections" className="nav-item nav-link">Shop</Link>
                    <Link to="/cart" className="nav-item nav-link">Shopping Cart</Link>
                    <Link to="/checkout" className="nav-item nav-link">Checkout</Link>
                </div>
            </div>
        
        </>
    )
}

export default NavbarContent