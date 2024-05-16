import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import swal from 'sweetalert';
import axios from 'axios';

function Navbar() {

    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`/api/logout`).then(res => {
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success",res.data.message,"success");
                history.push('/');
            }
        });

    }

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token'))
    {
        AuthButtons = (
           <>
            <NavLink className="text-white hover:bg-green-700 no-underline hover:text-white rounded-md px-3 py-2 text-sm font-medium" 
            to="/login"
            activeStyle={{
              backgroundColor:"orange"
            }}>Login</NavLink>
               
               <NavLink className="text-white hover:bg-green-700 no-underline hover:text-white rounded-md px-3 py-2 text-sm font-medium" 
               to="/register"
               activeStyle={{
                backgroundColor:"orange"
              }}>Register</NavLink>
       
           </>
                   
        );
    }
    else
    {
        AuthButtons = (
            
            
                <button type="button" onClick={logoutSubmit} className="text-white no-underline hover:bg-green-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logout</button>
            
        );
    }

    return (



        <nav className="bg-blue-700">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
        <NavLink className="navbar-brand" to="/"> 
          
        </NavLink>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
      
            <NavLink
            exact
             to="/" className="no-underline text-white hover:bg-green-700 rounded-md px-3 py-2 text-sm font-medium" 
            activeStyle={{
              backgroundColor:"orange"
            }}aria-current="page"> Home</NavLink>

            <NavLink to="/about" className="text-white no-underline hover:bg-green-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            activeStyle={{
              backgroundColor:"orange"
            }}>About</NavLink>

            <NavLink to="/contact" className="text-white no-underline hover:bg-green-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            activeStyle={{
              backgroundColor:"orange"
            }}>Contact</NavLink>

            <NavLink to="/collections" className="text-white no-underline hover:bg-green-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            activeStyle={{
              backgroundColor:"orange"
            }}>Category</NavLink>
            <NavLink to="/cart" className="text-white no-underline hover:bg-green-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            activeStyle={{
              backgroundColor:"orange"
            }}>Cart</NavLink>
            <NavLink to="/orders" className="text-white no-underline hover:bg-green-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            activeStyle={{
              backgroundColor:"orange"
            }}>My Orders</NavLink>
            {AuthButtons}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* <!-- Mobile menu, show/hide based on menu state. --> */}
  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
    <NavLink to="/" className="bg-gray-900 no-underline text-white rounded-md px-3 py-2 text-sm font-medium"
    activeStyle={{
      backgroundColor:"orange"
    }} aria-current="page"> Home</NavLink>

<NavLink to="/about" className="text-gray-300 no-underline hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
activeStyle={{
  backgroundColor:"orange"
}}>About</NavLink>

<NavLink to="/contact" className="text-gray-300 no-underline hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
activeStyle={{
  backgroundColor:"orange"
}}>Contact</NavLink>

<NavLink to="/collections" className="text-gray-300 no-underline hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
activeStyle={{
  backgroundColor:"orange"
}}>Collection</NavLink>
<NavLink to="/cart" className="text-gray-300 no-underline hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
activeStyle={{
  backgroundColor:"orange"
}}>Cart</NavLink>
{AuthButtons}
     </div>
  </div>
</nav>

    );
}

export default Navbar;
