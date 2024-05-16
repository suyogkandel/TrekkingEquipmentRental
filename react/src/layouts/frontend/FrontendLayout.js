import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar';
import Header from '../../layouts/frontend/Header';
import Footer from '../../layouts/frontend/Footer';

import publicRoutesList from '../../routes/Publicroutelist';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const FrontendLayout = () => {

    return (
        <div>
            <Header />
            <Navbar />
            
                <div>
                        
                    <Switch>
                        {publicRoutesList.map((routedata, idx) => {
                            return (
                                routedata.component && (
                                    <Route 
                                        key={idx}
                                        path={routedata.path}
                                        exact={routedata.exact}
                                        name={routedata.name}
                                        render={(props) => (
                                            <routedata.component {...props} />
                                        )}
                                    />
                                )
                            )
                        })}
                    </Switch>

                </div>
                
                <Footer />                      
        </div>
    );

}

export default FrontendLayout;


