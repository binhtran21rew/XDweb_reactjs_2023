import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { imageAPI } from "../../../constant/Constant";
function ViewSlider(){
    const [loading, setLoading] = useState(true)
    const [viewSlider, setViewSlider] = useState([]);
    useEffect(() => {
        axios.get('/api/slider/get_viewSlider')
            .then(res => {
                if(res.data.status === 200){
                    setViewSlider(res.data.slider)
                    setLoading(false)
                }
            })
    }, [])
    var displayView = ''
    const handleDelete = () => {
        
    }
    if(loading){
        return (
            <h4>Loading data...</h4>
        )
    }else{
        if(viewSlider.length > 0){
            displayView = viewSlider.map( (data, i) => {
                return (
                    <tr key={i}>
                        <th>{data.id}</th>
                        <th>{data.name}</th>
                        <th width="10%">
                            <img src={`${imageAPI}${data.image}`} width="100px" alt={`${data.name}`}/>
                        </th>
    
                        <th>{data.description}</th>
                        <td>
                            <Link to={`/admin/edit_slider/${data.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                            <button onClick={(e) => handleDelete(e, data.id)}  className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                )
            })
        }else{
            displayView = 
            (
                <tr>
                    <th colSpan="6" className="text-center">
                        No Slider
                    </th>
                </tr>
            )
        }
    }
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        View Slider
                        <Link to='/admin/Add_slider'  className="btn btn-primary btn-sm float-end">Add Slider</Link>
                    </h4>

                </div>

                <div className="card-body">
                    <table className="table table-bordered table-striped thead-dark">
                        <thead>
                            <tr>
                                <th className='text-center'>Id</th>
                                <th className='text-center'>Name</th>
                                <th className='text-center'>Image</th>
                                <th className='text-center'>Description</th>
                                <th className='text-center'>Edit</th>
                                <th className='text-center'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayView}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewSlider;