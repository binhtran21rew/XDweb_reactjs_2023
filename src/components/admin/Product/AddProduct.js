import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert'

import slug from '../../../utils/CreateSlug'

function ViewProduct(){
    const [errors, setError] = useState([]);
    const [productInput, setProductInput] = useState({
        category_id: '',
        name:'',
        slug:'',
        description: '',
        seller_price: '',
        origin_price:'',
        brand: '',
        color: '',
        quantity:'',
    });
    const [picture, setPicture] = useState([])
    const handleInput = (e) => {
        e.persist()
        setProductInput({...productInput, [e.target.name]: e.target.value})
        console.log(productInput);
    }
    const handleImageInput = (e) => {
        setPicture({ image: e.target.files[0]})
    }
    const [cateList, setCateList] = useState([])
    useEffect(() => {
        axios.get('/api/category/view_category')
            .then( res => {
                if(res.data.status === 200){
                    setCateList(res.data.categories)
                }
            })
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData()
        data.append('image', picture.image)
        data.append('category_id', productInput.category_id)
        data.append('name', productInput.name)
        data.append('slug', slug(productInput.name))
        data.append('description', productInput.description)
        data.append('seller_price', productInput.seller_price)
        data.append('origin_price', productInput.origin_price)
        data.append('brand', productInput.brand)
        data.append('color', productInput.color)
        data.append('quantity', productInput.quantity)

        

        axios.post('/api/product/add_product',data)
            .then(res => {
                if(res.data.status === 200){
                    swal("success", res.data.message,'success')
                    setProductInput({...productInput,
                        category_id: '',
                        name:'',
                        slug:'',
                        description: '',
                        seller_price: '',
                        origin_price:'',
                        brand: '',
                        color: '',
                        quantity:'',
                    })
                    setPicture({...picture,image: ''})
                    setError([])
                }else if(res.data.status === 422){
                    swal("You must filled out the required", "", 'error')
                    setError(res.data.errorsMessage)
                }
            })
    }
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3 className="mt-4 mb-4"> Add product
                    </h3>
                        <Link to="/admin/product">Back view product</Link>
                </div>
                <div className="card-body">
                        <form onSubmit={handleSubmit}  encType="multipart/form-data">
                            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="info-tab" data-bs-toggle="pill" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">Infomation</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="detail-tab" data-bs-toggle="pill" data-bs-target="#detail" type="button" role="tab" aria-controls="detail" aria-selected="false">Orther detail</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane card-body border fade show active" id="info" role="tabpanel" aria-labelledby="info" tabIndex="0">
                                    <div className="form-group mb-3">
                                        <label>Select Category</label>
                                        <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control" >
                                            <option>---Select---</option>  
                                            {
                                                cateList.map(data => {
                                                    return (
                                                        <option value={data.id} key={data.id}>{data.name}</option>
                                                    )
                                                })
                                            }  
                                        </select> 
                                        <span className="text-danger">{errors.category_id}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={productInput.name}  className="form-control"/>    
                                        <span className="text-danger">{errors.name}</span>
                                    
                                    </div>    
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <input type="text" name="description" onChange={handleInput} value={productInput.description}  className="form-control"/>    
                                        <span className="text-danger">{errors.description}</span>
                                    </div>         
                                </div>
                                <div className="tab-pane fade" id="detail" role="tabpanel" aria-labelledby="detail" tabIndex="0">
                                    <div className="row">
                                        <div className="col-md-4 form-group mb-3">
                                            <label> Selling Price</label>
                                            <input type="number" min={0}  name="seller_price" onChange={handleInput} value={productInput.seller_price} className="form-control" />
                                            <span className="text-danger">{errors.seller_price}</span>
                                        
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label> Original Price</label>
                                            <input type="number" min={0}  name="origin_price" onChange={handleInput} value={productInput.origin_price} className="form-control"/>
                                            <span className="text-danger">{errors.origin_price}</span>
                                        
                                        </div>

                                        <div className="col-md-4 form-group mb-3">
                                            <label> Brand</label>
                                            <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control"/>
                                            <span className="text-danger">{errors.brand}</span>
                                        
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label> Color</label>
                                            <input type="text" name="color" onChange={handleInput} value={productInput.color} className="form-control"/>
                                            <span className="text-danger">{errors.color}</span>
                                        
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label> Quantity </label>
                                            <input type="number" min={0} name="quantity" onChange={handleInput} value={productInput.quantity} className="form-control"/>
                                            <span className="text-danger">{errors.quantity}</span>
                                        
                                        </div>
                                        <div className="col-md-8 form-group mb-3">
                                            <label> Image</label>
                                            <input type="file" name="image" onChange={handleImageInput} className="form-control"/>
                                            <span className="text-danger">{errors.image}</span>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary px-4 float-end">Save</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct