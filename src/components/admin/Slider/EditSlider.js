import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert'
import { imageAPI } from "../../../constant/Constant";
const EditSlider = (props) => {
    const history = useHistory();
    const [error, setError] = useState([])
    const [picture, setPicture] = useState([])
    const [sliderInput, setSliderInput] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        const slider_id = props.match.params.id
        axios.get(`/api/slider/edit_slider/${slider_id}`)
            .then(res => {
                if(res.data.status === 200){
                    setSliderInput(res.data.slider)
                }else if(res.data.status === 404) {
                    swal("Error", res.data.message, "error")
                    history.push('/admin/slider')
                }
            })
    }, [props.match.params.id, history])

    

    const handleInput = (e) =>{
        e.persist()
        setSliderInput({...sliderInput, [e.target.name]: e.target.value})
    }
    const handleImageInput = (e) => {
        setPicture({ image: e.target.files[0]})
    } 
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('image', picture.image)
        data.append('description', sliderInput.description)
        data.append('name', sliderInput.name)
        const slider_id = props.match.params.id

        axios.post(`/api/slider/update_slider/${slider_id}`, data)
            .then( res => {
                if(res.data.status === 200){
                    swal("Success", res.data.message, "success")
                    setError([])
                    history.push('/admin/slider')
                }else if(res.data.status === 422){
                    swal("You must filled out the required", "", 'error')
                    setError(res.data.errorsMessage)
                }else if(res.data.status === 404){
                    swal("Error", res.data.message, "error")
                    history.push('/admin/slider') 
                }
            })
    }
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Edit Slider
                        <Link to='/admin/slider'  className="btn btn-primary btn-sm float-end">Back to slider page</Link>
                    </h4>

                </div>

                <div className="card-body">
                        <form onSubmit={handleSubmit}  encType="multipart/form-data">
                            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="info-tab" data-bs-toggle="pill" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true">Infomation</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane card-body border fade show active" id="info" role="tabpanel" aria-labelledby="info" tabIndex="0"> 
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={sliderInput.name}  className="form-control"/> 
                                        <span className="text-danger">{error.name}</span>
   
                                    </div>  
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <input type="text" name="description" onChange={handleInput} value={sliderInput.description}  className="form-control"/>    
                                        <span className="text-danger">{error.description}</span>
                                    </div>   
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImageInput} className="form-control"/>
                                        <span className="text-danger">{error.image}</span>
                                        <img src={`${imageAPI}${sliderInput.image}`} width="100px" alt={`${sliderInput.name}`}/>
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

export default EditSlider;