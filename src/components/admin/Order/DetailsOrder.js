import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { NumericFormat } from 'react-number-format';


function DetailsOrder(props)
{
    
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);


    useEffect(() =>{
        document.title = "Orders";
        const order_id = props.match.params.id
        axios.get(`/api/detail_order/${order_id}`)
            .then( res => {
                if(res.data.status === 200 )
                {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
            
            });
    }, [props.match.params.id]);


    var display_orders = "";
    var display_customers = "";
    var display_products = "";
    if(loading) {
        return(
            <h4>Loading Orders...</h4>
        )
    }
    else
    {
        display_orders = orders.map( (item, i) => {
            return (
                    <tr key={i}>
                        <td colSpan={2}>{item.idOrder}</td>
                        <td colSpan={2}>{item.tracking_no}</td>
                        <td >{item.payment_mode}</td>
                    </tr>
            )
        });
        display_customers = orders.map( (item, i) => {
            return (
                    <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.firstname}{item.lastname}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                    </tr>
            )
        });
        display_products = orders.map( (item, i) => {
            return (
                    <tr key={i}>
                        <td colSpan={2}>{item.pro_name}</td>
                        <td>
                        <NumericFormat value={item.price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/>
                            
                            
                        </td>
                        <td>{item.quantity}</td>
                        <td colSpan={2}>{item.pro_color}</td>

                    </tr>
            )
        });
    }
    return (
        <div className="container px-4 mt-3">
        <div className="card ">
            <div className="card-header">
                <h4>Detail Orders </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <h4 className="mt-4">ID Order</h4>
                        <tr>
                            <th colSpan={2}>Id</th>
                            <th colSpan={2}>Tracking No.</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display_orders}
                    </tbody>

                    <thead>
                        <h4 className="mt-4">Customer</h4>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display_customers}
                    </tbody>
                    <thead>
                        <h4 className="mt-5">Product</h4>
                        <tr>
                            <th colSpan={2}>Name product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th >Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display_products}
                    </tbody>

                </table>

                </div>
                
            </div>
        </div>
        
    </div>
    )

}

export default DetailsOrder;