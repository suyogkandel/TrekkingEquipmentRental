import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import MasterLayout from './layouts/admin/MasterLayout';
import swal from 'sweetalert';

function AdminPrivateRoute({...rest}) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/checkingAuthenticated')
      .then(res => {
        if (res.status === 200) {
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const axiosRetryInterceptor = (err) => {
        console.log('Error object:', err);
        console.log('Error response object:', err.response);
        console.log('Error response status:', err.response?.status);
      
        if (err.response && err.response.status === 401) {
          swal("Unauthorized", err.response.data.message, "warning");
          history.push('/');
        }
      
        return Promise.reject(err);
      };
      

    const axiosErrorInterceptor = (error) => {
      if (error.response && error.response.status === 403) {
        swal("Forbidden", error.response.data.message, "warning");
        history.push('/403');
      } else if (error.response && error.response.status === 404) {
        swal("404 Error", "Url/Page Not Found", "warning");
        history.push('/404');
      }

      return Promise.reject(error);
    };

    const interceptorId1 = axios.interceptors.response.use(undefined, axiosRetryInterceptor);
    const interceptorId2 = axios.interceptors.response.use(undefined, axiosErrorInterceptor);

    return () => {
      axios.interceptors.response.eject(interceptorId1);
      axios.interceptors.response.eject(interceptorId2);
    };
  }, [history]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Route {...rest} render={({ props, location }) =>
      authenticated ?
        <MasterLayout {...props} /> :
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
    } />
  );
}

export default AdminPrivateRoute;

// axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    //     if(err.response.status === 401)
    //     {
    //         swal("Unauthorized",err.response.data.message,"warning");
    //         history.push('/');
    //     }
    //     return Promise.reject(err);
    // });
    
      
      
      

    // axios.interceptors.response.use(function (response) {
    //         return response;
    //     }, function (error) {
    //         if(error.response.status === 403) // Access Denied
    //         {
    //             swal("Forbidden",error.response.data.message,"warning");
    //             history.push('/403');
    //         }
    //         else if(error.response.status === 404) //Page Not Found
    //         {
    //             swal("404 Error","Url/Page Not Found","warning");
    //             history.push('/404');
    //         }
    //         return Promise.reject(error);
    //     }
    // );