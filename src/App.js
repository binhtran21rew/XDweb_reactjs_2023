import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import PublicRoute from './PublicRoute';
import Login  from './components/frondend/auth/Login';
import Register from './components/frondend/auth/Register';
import axios from 'axios';

import AdminPrivateRoute from './AdminPrivateRoute'
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';


axios.defaults.baseURL = "https://bkshop.site/"
// axios.defaults.baseURL = "http://localhost:8000/"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Accept'] = '*/*'
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})


function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                {/* <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/contact" component={Contact}/> */}

                <AdminPrivateRoute path="/admin" name="Admin"/>

                <PublicRoute path="/" name="Home" />


                <Route exact path="/403" component={Page403}/>
                <Route exact path="/404" component={Page404}/>

                <Route path='/login'>
                  {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Login/>}
                </Route>
                <Route path='/register'>
                  {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Register/>}
                </Route>

                {/* <Route path="/admin" name="Admin"  render={(props) => <MasterLayout {...props}/>} /> */}
                
            </Switch>
        </Router>
    </div>
  );
}

export default App;
