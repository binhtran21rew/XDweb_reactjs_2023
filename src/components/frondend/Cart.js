import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { imageAPI } from '../../constant/Constant';
import { NumericFormat } from 'react-number-format';
import Top from "../../layouts/frondend/Top.js"
import NavbarContent from '../../layouts/frondend/NavbarContent'

import {pathCart} from '../../constant/Constant'


function Cart()
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;

    if(!localStorage.getItem('auth_token')){
        history.push('/login');
        swal("Warning","Login to goto Cart Page","error");
    }

    useEffect(() => {
        let isMounted = true;
        
        
        axios.get(`/api/cart/cart`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);    
                    setLoading(false);
                }
             
                else if(res.data.status === 401)
                {
                    history.push('/');
                    swal("Warning",res.data.message,"error");
                }
            }
        });
        
        return() => {
            isMounted =false;
        };
    }, [history]);

    const handleDecrement =(cart_id) =>{
        setCart(cart =>
            cart.map((item)=>
                cart_id === item.idCart ? {...item, product_quantity: item.product_quantity - (item.product_quantity > 1 ? 1:0) } : item

            )
        );
            updateCartQuantity(cart_id, "dec")
    }
    const handleIncrement =(cart_id) =>{
        setCart(cart =>
            cart.map((item)=>
                cart_id === item.idCart ? {...item, product_quantity: item.product_quantity + (item.product_quantity < 10 ? 1:0) } : item
            )
        );
            updateCartQuantity(cart_id, "inc")
    }
    const updateCartQuantity = (cart_id, scope) =>
    {
        axios.put(`/api/cart/cart-updatequantity/${cart_id}/${scope}`).then(res=>{
            if(res.data.status === 200){
                swal("Success",res.data.message,"success");
            }
        });
    }

    const deleteCartitem = (e, cart_id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete(`/api/cart/delete-cartitem/${cart_id}`).then( res=> {
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Remove";
            }
        });
    }

    if(loading)
    {
        return <h4>Loading products detail....</h4>
    }

    var cart_HTML = '';
    if(cart.length > 0)
    {
        cart_HTML = <div className="table-responsive">
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Total Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item,idx) => {
                    totalCartPrice += item.seller_price * item.product_quantity;
                    return (
                        <tr key={idx}>
                            <td width="10%">
                                <img src={`${imageAPI}${item.image}`} alt={item.name} width="50px" height="50px" />
                            </td>
                            <td>{item.name}</td>
                            <td width="15%" className="text-center">
                                <NumericFormat value={item.seller_price} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                            </td>
                            <td width="15%">
                                <div className="input-group">
                                    <button type="button" onClick={() => handleDecrement(item.idCart)} className="input-group-text">-</button>
                                    <div className="form-control text-center">{item.product_quantity}</div>
                                    <button type="button" onClick={() => handleIncrement(item.idCart)} className="input-group-text">+</button>
                                </div>
                            </td>
                            <td width="15%" className="text-center">
                                <NumericFormat value={item.seller_price * item.product_quantity}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                                
                            </td>
                            <td width="10%">
                                <button type="button" onClick={ (e) => deleteCartitem(e, item.idCart) } className="btn btn-danger btn-sm">Remove</button>
                            </td>
                        </tr>
                 )
                })}
            </tbody>
        </table>

    </div>
    }

    else
    {
        cart_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty</h4>

            </div>

        </div>
    }

    return(
        <div>
            <NavbarContent />
            <Top  path={pathCart.path} name={pathCart.name}/>


            <div className="py-4 ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {cart_HTML}
                        </div>
                        <div className="col-md-8"></div>
                        <div className="col-md-4">
                        <div className="card card-body mt-3">
                            <h4>Sub Total:
                                <span className="float-end">
                                    <NumericFormat value={totalCartPrice} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                                    
                                </span>
                            </h4>
                            <h4>Grand Total:
                                <span className="float-end">
                                    <NumericFormat value={totalCartPrice} displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>

                                </span>
                            </h4>
                            <hr />
                            <Link to="/checkout" className="btn btn-primary">Checkout</Link>
                        </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default Cart;