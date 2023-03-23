import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Navbar from "../../layouts/frondend/Navbar";

import '../../assets/client/css/style.css'
import '../../assets/client/css/style.min.css'


import publicRoutesList from '../../routes/Publicroutelist'
import Footer from './Footer';
const FrontendLayout = () => {
    return (
            <div className="sb-nav-fixed">
                <Navbar />
                    <div >
                            <Switch>
                                {
                                    publicRoutesList.map((routedata, i) => {
                                        return(
                                            routedata.component && (
                                                <Route 
                                                    key={i}
                                                    path={routedata.path}
                                                    exact={routedata.exact}
                                                    name={routedata.name}
                                                    render={(props) => (
                                                        <routedata.component {...props}/>
                                                    )}
                                                />

                                            )
                                        )
                                    }
                                )}
                                
                            </Switch>
                        
                       
                    </div>   
                    <Footer />  
            </div>
            
    )
};

export default FrontendLayout;