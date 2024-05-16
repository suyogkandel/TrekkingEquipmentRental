import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import Helmet from '../../components/Helmet/Helmet';

function Orders(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    // const [product, setProduct] = useState([]);

    useEffect(() => {
        let isMounted = true;

        // Fetch the product details using the category_slug and product_slug from the URL params
        // const category_slug = props.match.params.category;
        // const product_slug = props.match.params.product;
        // axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res => {
        //     if (isMounted) {
        //         if (res.data.status === 200) {
        //             setProduct(res.data.product);
        //             setLoading(false);
        //         } else if (res.data.status === 404) {
        //             history.push('/orders');
        //             swal('Warning', res.data.message, 'error');
        //         }
        //     }
        // });

        // Fetch the user's orders
        axios.get(`/api/myorders`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setOrders(res.data.orders); // Update the state with the correct data
                    setLoading(false);
                } else if (res.data.status === 401) {
                    history.push('/');
                    swal('Warning', res.data.message, 'error');
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [props.match.params.category, props.match.params.product, history]);

    const submitAddtoreturn = (e, orderId) => {
        e.preventDefault();
      
        // Find the selected order by its ID
        const selectedOrder = orders.find((order) => order.id === orderId);
      
        if (!selectedOrder) {
          // If the selected order is not found in the orders state, show an error
          swal("Error", "Selected order not found", "error");
          return;
        }
      
        const data = {
          user_id: selectedOrder.user_id,
          user_name: selectedOrder.user_name,
          product_id: selectedOrder.product_id,
          order_id: selectedOrder.id,
          return_qty: selectedOrder.return_qty,
          product_name: selectedOrder.product_name,
        };
      
        axios
          .post(`/api/add-to-return`, data)
          .then((res) => {
            if (res.data.status === 201) {
              // Created - Data Inserted
              swal("Success", res.data.message, "success");
            } else if (res.data.status === 409) {
              // Already added to cart
              swal("Success", res.data.message, "success");
            } else if (res.data.status === 401) {
              // Unauthenticated
              swal("Error", res.data.message, "error");
            } else if (res.data.status === 404) {
              // Not Found
              swal("Warning", res.data.message, "warning");
            }
          })
          .catch((error) => {
            console.log(error); // Log any errors that occurred during the POST request
            swal("Error", "An error occurred while processing your request", "error");
        });
    };
      
    
    if (loading) {
        return <h4>Loading Product Detail...</h4>;
    }

    return (
        <div>
            <Helmet title="Orders" />
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Orders</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {orders.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, idx) => (
                                                <tr key={idx}>
                                                    <td width="20%">
                                                        <img
                                                            src={`http://localhost:8000/${order.product_image}`}
                                                            alt={order.product_name}
                                                            width="100px"
                                                            height="100px"
                                                        />
                                                    </td>
                                                    <td>{order.product_name}</td>
                                                    <td width="20%">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => submitAddtoreturn(e, order.id)} // Pass the order ID to the function
                                                            className="btn btn-success btn-sm"
                                                        >
                                                            Return
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="card card-body py-5 text-center shadow-sm">
                                    <h4>Your Order List is Empty</h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
