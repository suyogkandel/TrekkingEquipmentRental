import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const AddUsers = () => {
    const [usersInput, setUsers] = useState({
        
        name: '',
        email: '',
        password: '',
        
        error_list: [],
    });
    
    const handleInput = (e) => {
        e.persist();
        setUsers({...usersInput, [e.target.name]: e.target.value })
    }

    const submitUsers = (e) => {
        e.preventDefault();

        

        const data = {
            
            name:usersInput.name,
            email:usersInput.email,
            password:usersInput.password,
           
        }
        // console.log(data);

        axios.post(`api/store-users`, data).then(res => {
            if(res.data.status === 200)
            {
                e.target.reset();
                swal("Success",res.data.message,"success");
                // document.getElementById('Users_FORM').reset();
            }
            else if(res.data.status === 400)
            {
                setUsers({...usersInput, error_list:res.data.errors});
            }
        });

    }

    var display_errors = [];
    if(usersInput.error_list)
    {
        // display_errors = [
            
        //     usersInput.error_list.name,
        //     usersInput.error_list.email,
        //     usersInput.error_list.password,
        // ]
    }

    return  (
        <div className="container-fluid px-4">

            {
                display_errors.map( (item) => {
                   return( <p className="mb-1" key={item}>{item}</p>)
                })
            }

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Users 
                        <Link to="/admin/users" className="btn btn-primary btn-sm float-end">View Users</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitUsers} id="USERS_FORM">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li> */}
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={usersInput.name} className="form-control" />
                                    <small className="text-danger">{usersInput.error_list.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <textarea name="email" onChange={handleInput} value={usersInput.email} className="form-control"></textarea>
                                    <small className="text-danger">{usersInput.error_list.email}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password" 
                                        name="password"
                                        onChange={handleInput}
                                        value={usersInput.password}
                                        className="form-control"
                                    />
                                    <small className="text-danger">{usersInput.error_list.password}</small>
                                </div>

                                

                            </div>
                            
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddUsers
