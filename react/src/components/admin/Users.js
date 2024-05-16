
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Users() {

    const [loading, setLoading] = useState(true);
    const [userslist, setUserslist] = useState([]);
    
    useEffect(() => {
        let isMounted = true;
        document.title = "Users";


        axios.get(`/api/view-users`).then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setUserslist(res.data.users)
                    setLoading(false);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    const deleteUsers = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-users/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Success",res.data.message,"success");
                thisClicked.innerText = "Deleted";
            }
        });

    }
    // const appointUsers = (e, id) => {
    //     e.preventDefault();
      
    //     const thisClicked = e.currentTarget;
    //     thisClicked.innerText = "Appointing";
      
    //     axios.put(`/api/appoint-admin/${id}`).then((res) => {
    //       if (res.data.status === 200) {
    //         swal("Success", res.data.message, "success");
    //         thisClicked.innerText = "Appointed";
    //         thisClicked.disabled = true; // Disable the button after appointing
    //         // You can perform any additional actions here after successfully assigning the admin role.
    //       } else if (res.data.status === 404) {
    //         swal("Error", res.data.message, "error");
    //         thisClicked.innerText = "Appoint Admin";
    //       }
    //     });
    //   };
      
    //   const removeAdmin = (e, id) => {
    //     e.preventDefault();
      
    //     const thisClicked = e.currentTarget;
    //     thisClicked.innerText = "Removing";
      
    //     axios.put(`/api/remove-admin/${id}`).then((res) => {
    //         if (res.data.status === 200) {
    //             swal("Success", res.data.message, "success");
    //             thisClicked.innerText = "Removed";
    //             thisClicked.disabled = true; // Disable the button after appointing
    //             // You can perform any additional actions here after successfully assigning the admin role.
    //           } else if (res.data.status === 404) {
    //             swal("Error", res.data.message, "error");
    //             thisClicked.innerText = "Remove Admin";
    //           }
    //         });
    //       };
      
    const toggleAdminRole = (e, id, currentRole) => {
        e.preventDefault();
      
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Processing';
      
        if (currentRole === 1) {
          removeAdmin(e, id, thisClicked);
        } else {
          appointAdmin(e, id, thisClicked);
        }
      };
      
      const appointAdmin = (e, id, buttonElement) => {
        axios.put(`/api/appoint-admin/${id}`).then((res) => {
          if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            // Update button properties
            buttonElement.innerText = 'Remove Admin';
            buttonElement.className = 'btn btn-danger btn-sm';
            buttonElement.disabled = false;
            // Refresh the page to fetch the latest data
            window.location.reload();
          } else if (res.data.status === 404) {
            swal('Error', res.data.message, 'error');
          }
        });
      };
      
      const removeAdmin = (e, id, buttonElement) => {
        axios.put(`/api/remove-admin/${id}`).then((res) => {
          if (res.data.status === 200) {
            swal('Success', res.data.message, 'success');
            // Update button properties
            buttonElement.innerText = 'Assign Admin';
            buttonElement.className = 'btn btn-success btn-sm';
            buttonElement.disabled = false;
            // Refresh the page to fetch the latest data
            window.location.reload();
          } else if (res.data.status === 404) {
            swal('Error', res.data.message, 'error');
          }
        });
      };
      
      
      
      
      
      

      
    var viewusers_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Users...</h4>
    }
    else
    {
        viewusers_HTMLTABLE = 
        userslist.map( (item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    
                    <td>
                    {/* <button
                    type="button"
                    onClick={(e) => appointUsers(e, item.id)}
                    className="btn btn-success btn-sm"
                    disabled={item.role_as === 1} // Disable the button if role_as is 1 (admin)
                    >
                    {item.role_as === 1 ? "Appointed" : "Appoint"}
                    </button>

                    <button
                    type="button"
                    onClick={(e) => removeAdmin(e, item.id)}
                    className="btn btn-danger btn-sm button-with-margin-left"
                    disabled={item.role_as === 0} // Disable the button if role_as is 0(user)
                    >
                    {item.role_as === 0 ? "Not Admin" : "Remove Admin"}
                    </button> */}
                    <button
                    type="button"
                    onClick={(e) => toggleAdminRole(e, item.id, item.role_as)}
                    className={`btn btn-${item.role_as === 1 ? 'danger' : 'success'} btn-sm`}
                    >
                    {item.role_as === 1 ? 'Remove Admin' : 'Assign Admin'}
                    </button>




                    </td>
                    <td>
                        <button type="button" onClick={ (e) => deleteUsers(e, item.id) } className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        });
    }

    return  (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Users List 
                        <Link to="/admin/add-users" className="btn btn-primary btn-sm float-end">Add Users</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Appoint/Remove Admin</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewusers_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}





export default Users;
