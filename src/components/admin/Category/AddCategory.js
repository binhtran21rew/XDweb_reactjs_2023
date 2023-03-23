import React, { useEffect, useState,  } from "react";
import axios from "axios";
import swal from "sweetalert";

import slug from '../../../utils/CreateSlug'
import { Link, useHistory } from "react-router-dom";

function AddCategory(){
    document.title = "Add Categories"
    const [cateList, setCateList] = useState([])
    useEffect(() => {
        axios.get('/api/category/view_category')
            .then( res => {
                if(res.data.status === 200){
                    setCateList(res.data.categories)
                }
            })
    },[])
    const history = useHistory()
    const [CategoryInput, setCategoryInput] = useState({
        'name': '',
        'parent_id': '',
        'slug':'',
        'status': '',
        'errors': []
})


    const handleInput = (e) => {
        e.persist();
        setCategoryInput({...CategoryInput, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: CategoryInput.name,
            parent_id: CategoryInput.parent_id === '' ? 0: CategoryInput.parent_id,
            slug: slug(CategoryInput.name),
            status: CategoryInput.status
        }
        axios.post('/api/category/add_Category', data)
            .then(res => {
                if(res.data.status === 200){
                    swal('Success', res.data.message, 'success')
                    document.getElementById('category').reset();
                    history.push('/admin/categories')
                }else if (res.data.status === 400){
                    setCategoryInput({...CategoryInput, errors: res.data.err_mess})
                }
            })
    }
    var displayError = []
    if(CategoryInput.errors){
        displayError=[
            CategoryInput.errors.name,
            CategoryInput.errors.slug,
        ]
    }
    return (
        
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h1 className="mt-4 mb-4">Add Catagory</h1>
                    <Link to={"/admin/categories"} >Back View Category</Link>
                    {   
                        displayError.map( (item,i) => {
                            return(
                                <h4 className="mb-1 text-danger" key={i}>{item}</h4>
                            )
                        })
                    }
                </div>
                <div className="card-body">
                    <form  onSubmit={handleSubmit} id="category">
                        <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane card-body border fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={CategoryInput.name} className="form-control"/>    
                                </div>    
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="parent_id" onChange={handleInput} value={CategoryInput.parent_id} className="form-control" >
                                        <option value={'0'}>---Select---</option>
                                            {
                                                cateList.map(data => {
                                                    return (
                                                        <option value={data.id} key={data.id}>{data.name}</option>
                                                    )
                                                })
                                            }    
                                    </select> 
                                    {CategoryInput.parent_id}
                                    {/* <span className="text-danger">{errors.category_id}</span> */}
                                </div>
                                <div className="form-group mb-3">
                                    <label className=" mb-3">Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={CategoryInput.status} />    
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

export default AddCategory