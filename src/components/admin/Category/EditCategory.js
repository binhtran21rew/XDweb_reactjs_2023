import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import axios from "axios";
import swal from 'sweetalert'
import slug from '../../../utils/CreateSlug'

function EditCategory(props) {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [EditCategoryInput, setEditCategory] = useState({
        name: '',
        slug: ''
}   );
    const [error, setError] = useState([])
    useEffect(() => {
        const idCate = props.match.params.id;
        axios.get(`/api/category/edit_category/${idCate}`)
            .then(res => {
                if(res.data.status === 200) {
                    setEditCategory(res.data.category)
                }else if(res.data.status === 404) {
                    swal("Error", res.data.message, "error")
                    history.push('/admin/categories')
                }
                setLoading(false)
            })
    }, [props.match.params.id, history])
    
    const handleInput = (e) => {
        e.persist();
        setEditCategory({...EditCategoryInput, [e.target.name]: e.target.value});
    }
    const handleUpdate = (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const data = {
            name: EditCategoryInput.name,
            slug: slug(EditCategoryInput.name)
        };
        axios.put(`/api/category/update_category/${id}`, data)
            .then(res => {
                if(res.data.status === 200){
                    swal('Success', res.data.message,'success')
                    setError([])
                    history.push('/admin/categories')
                    
                }else if(res.data.status === 422){
                    swal("All fields are madetory","", 'error')
                    setError(res.data.err_mess)
                }else if(res.data.status === 404){
                    swal("Error", res.data.message, 'error')
                    history.push('/admin/categories')
                }
            })
    }
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }
    return (
        <div className="container-fluid px-4">
        <h1 className="mt-4 mb-4">Edit Catagory</h1>

        <form onSubmit={handleUpdate}>
            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane card-body border fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={EditCategoryInput.name} className="form-control"/>    
                        <span>{error.name}</span>
                    </div>                     
                    <div className="form-group mb-3">
                        <label className=" mb-3">Status</label>
                        <input type="checkbox" name="status" onChange={handleInput} value={EditCategoryInput.status} />    
                        <span>{error.status}</span>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                    <div className="form-group mb-3">
                        <label>Status</label>
                        <input type="checkbox" name="status" className="form-control"/>    
                    </div>
                </div>
                <button type="submit" className="btn btn-primary px-4 float-end">Save</button>
            </div>
        </form>
    </div>
    )
}
export default EditCategory