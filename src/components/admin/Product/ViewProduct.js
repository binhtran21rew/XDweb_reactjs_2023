import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NumericFormat } from 'react-number-format';
import swal from 'sweetalert'
import {imageAPI} from '../../../constant/Constant'

function ViewProduct(){
    const [loading, setLoading] = useState(true)
    const [viewProduct, setViewProduct] = useState([])
    useEffect(() =>{
        document.title = "View Products"
        axios.get('/api/product/view_product')
            .then( res => {
                if(res.data.status === 200 ){
                    setViewProduct(res.data.products);
                    setLoading(false)
                }
            })
    }, [])
    const handleDelete = (e, id) => {
        e.preventDefault()
        const clicked = e.currentTarget
        axios.put(`/api/product/delete_product/${id}`)
            .then(res => {
                if(res.data.status === 200){
                    swal("success", res.data.message, 'success')
                    clicked.closest('tr').remove()
                }else if(res.data.status === 404){
                    swal("Error", res.data.message, "error")
                }
            })
        
    }
    var viewDisplay = ''
    if(loading) {
        return(
            <h4>Loading...</h4>
        )
    }else{
        viewDisplay = viewProduct.map( (data, i) => {
            return (
                <tr key={data.id}>
                <td>{data.id}</td>
                {/* get forgien key of category using method belongto
                    in file model of lavarel
                */}
                <td>{data.category.name}</td>
                <td>{data.name}</td>
                <td><img src={`${imageAPI}${data.image}`} width="100px" alt={`${data.name}`}/></td>
                <td><NumericFormat value={data.seller_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'}/></td>
                <td>
                    <Link to={`/admin/edit_product/${data.id}`} className="btn btn-success btn-sm">Edit</Link>
                </td>
                <td>
                    <button onClick={(e) => handleDelete(e, data.id)}  className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
            )
        })
    }
    return (
        <div className="container-fluid px-4">
        <div className="card mt-4">
            <div className="card-header">
                <h3> Products View
                    <Link to="/admin/Add_product" className="btn btn-primary btn-sm float-end">Add category</Link>
                </h3>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Selling price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewDisplay}
                    </tbody>
                </table>
            </div>
        </div>
        <div>

            <Link to="/admin/Garbage_prod" className="text-primary float-end">Show garbage</Link>
        </div>
    </div>
    )
}

export default ViewProduct