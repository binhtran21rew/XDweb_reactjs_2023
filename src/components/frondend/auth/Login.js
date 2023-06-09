import React, {useState} from 'react'
import Navbar from "../../../layouts/frondend/Navbar";
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert'


function Login(){
    const history = useHistory()
    const [loginInput, setInput] = useState({
        email: '',
        password: '',
        err_list: []
    })
    const handleInput = (e) => {
        e.persist()
        setInput({...loginInput, [e.target.name]: e.target.value})
    }
    const loginSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: loginInput.email,
            password: loginInput.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data)
                .then(res => {
                    if(res.data.status === 200){
                        localStorage.setItem('auth_token', res.data.token)
                        localStorage.setItem('user_name', res.data.username)
                        swal("Success", res.data.message, 'success')
                        if(res.data.role === 'admin'){
                            history.push('/admin')
                        }else{
                            history.push('/')

                        }
                    }else if (res.data.status === 401){
                        swal("Warning", res.data.message, 'warning')

                    }else{
                        setInput({...loginInput, err_list: res.data.validationError})
                    }
                })
        })
    }
    return (
        <div>
            <div className="container py-5">
                <div className='row justify-content-center'>
                    <div className="col-md-6">
                        <h3>
                            admin123@gmail.com
                        </h3>
                        password: admin123
                        <div className='card'>
                            <div className="card-header">
                                <h4>Login</h4>    
                            </div>   
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                                        <span>{loginInput.err_list.email}</span>
                                    </div> 
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" />
                                        <span>{loginInput.err_list.password}</span>
                                    </div>     
                                    <div className='form-group mb-3'>
                                        <button type="submit" className='btn btn-primary '>Login</button>
                                    </div>  
                                </form>    
                            </div>     
                        </div>   

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
