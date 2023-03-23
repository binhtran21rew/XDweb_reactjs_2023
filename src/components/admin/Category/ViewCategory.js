import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'

function ViewCategory(){
    const [loading, setLoading] = useState(true)
    const [ViewCategory, setViewCategory] = useState([])
    useEffect(() => {
        document.title = "View Categories"

        axios.get('/api/category/view_category')
            .then(res => {
                if(res.status === 200){

                    setViewCategory(res.data.categories)
                }
                setLoading(false)
            })
    },[])
    const handleDelete = (e, id) => {
        e.preventDefault()
        const clicked = e.currentTarget
        axios.put(`/api/category/delete_category/${id}`)
            .then(res => {
                if(res.data.status === 200){
                    swal("success", res.data.message, 'success')
                    clicked.closest('tr').remove()
                }else if(res.data.status === 404){
                    swal("Error", res.data.message, "error")
                }
            })

    }
    var displayList = ""
    if(loading){
        return (
            <h4>Loading...</h4>
        )
    }else{
        displayList = ViewCategory.map( (data, i) => {
            var status = ''
            if(data.status === 0){
                status = 'Hien Thi'
            }
            return (
                <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{status}</td>
                    <td>
                        <Link to={`/admin/edit_category/${data.id}`} className="btn btn-success btn-sm">Edit</Link>
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
                    <h3> Category View
                        <Link to="/admin/Add_categories" className="btn btn-primary btn-sm float-end">Add category</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayList}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>

                <Link to="/admin/Garbage_categories" className="text-primary float-end">Show garbage</Link>
            </div>
        </div>
    )
}

export default ViewCategory