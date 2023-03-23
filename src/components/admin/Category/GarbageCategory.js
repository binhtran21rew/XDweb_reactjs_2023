import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'

function ViewCategory(){
    const [loading, setLoading] = useState(true)
    const [ViewCategory, setViewCategory] = useState([])
    useEffect(() => {
        document.title = "Garbage Categories"

        axios.get('/api/category/garbage_category')
            .then(res => {
                if(res.status === 200){
                    setViewCategory(res.data.categories)
                }
                setLoading(false)
            })
        },[])
        const handleRestore = (e, id) => {
            e.preventDefault();
            const clicked = e.currentTarget
            axios.put(`/api/category/restore_category/${id}`)
                .then(res => {
                    if(res.data.status === 200){
                        swal("success", res.data.message, 'success')
                        clicked.closest('tr').remove()
                    }
                })
        }
    const handleDelete = (e, id) => {
        e.preventDefault()
        const clicked = e.currentTarget
        axios.put(`/api/category/destroy_category/${id}`)
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
            if(data.status === 1){
                status = 'Hiden'
            }
            return (
                <tr key={i}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{status}</td>
                    <td>
                        <button onClick={(e) => handleRestore(e, data.id)}  className="btn btn-info btn-sm">Restore</button>

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
                    <h3> Garbage Categories
                        <Link to="/admin/categories" className="btn btn-primary btn-sm float-end">Back to category</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Restore</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewCategory