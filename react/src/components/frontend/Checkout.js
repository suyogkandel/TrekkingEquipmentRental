import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Helmet from '../../components/Helmet/Helmet';
import KhaltiCheckout from "khalti-checkout-web";
import config from "../khalti/config";




function Checkout() {
    const [showModal, setShowModal] = useState(false);

  const handlePaymentModeChange = (e) => {
    setCheckoutInput({ ...checkoutInput, payment_mode: e.target.value });
  };

  const history = useHistory();
  if (!localStorage.getItem('auth_token')) {
    history.push('/');
    swal('Warning', 'Login to go to Cart Page', 'error');
  }

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalCartPrice = 0;

  // let checkout = new KhaltiCheckout(config);
  

  const [checkoutInput, setCheckoutInput] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    payment_mode: '', // New state for payment mode selection
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/cart`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
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
  }, [history]);

  const regexPatterns = {
    firstname: /^[a-zA-Z]+$/,
    lastname: /^[a-zA-Z]+$/,
    phone: /^\d{10}$/,
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    address: /^[a-zA-Z0-9\-(), ]+$/,
    city: /^[a-zA-Z]+$/,
    state: /^[a-zA-Z]+$/,
    zipcode: /^\d{5}$/,
  };

  const errorMessages = {
    firstname: 'Please enter a valid first name',
    lastname: 'Please enter a valid last name',
    phone: 'Please enter a valid 10-digit phone number',
    email: 'Please enter a valid email address',
    address: 'Please enter a valid address',
    city: 'Please enter a valid city name',
    state: 'Please enter a valid state name',
    zipcode: 'Please enter a valid 5-digit zipcode',
  };

  const validateField = (fieldName, fieldValue) => {
    if (regexPatterns[fieldName] && !regexPatterns[fieldName].test(fieldValue)) {
      setError((prevError) => ({ ...prevError, [fieldName]: errorMessages[fieldName] }));
    } else {
      setError((prevError) => ({ ...prevError, [fieldName]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    for (const field in checkoutInput) {
      validateField(field, checkoutInput[field]);
      if (!checkoutInput[field]) {
        errors[field] = 'Field is required';
      }
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInput = (e) => {
    e.persist();
    const fieldName = e.target.name;
    let fieldValue = e.target.value;
  
    // Check if the field is "phone" and doesn't start with "98", then add "98" as the default prefix.
    if (fieldName === "phone" && !fieldValue.startsWith("98")) {
      fieldValue = "98" + fieldValue;
    }
  
    setCheckoutInput((prevInput) => ({ ...prevInput, [fieldName]: fieldValue }));
    validateField(fieldName, fieldValue);
  };
  
  const handleKhaltiPaymentSuccess = (data) => {
    var orderData = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
      payment_mode: checkoutInput.payment_mode,
      payment_id: data.token, // Use the payment ID from the Khalti success callback
    };
  
    axios.post(`/api/place-order`, orderData).then((res) => {
      if (res.data.status === 200) {
        swal('Order Placed Successfully', res.data.message, 'success');
        setError([]);
        history.push('/thank-you');
      } else if (res.data.status === 422) {
        swal('All fields are mandatory', '', 'error');
        setError(res.data.errors);
      }
    });
  };
  
  

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      swal('Invalid input', 'Please check the highlighted fields', 'error');
      return;
    }
  
    var data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
      payment_mode: checkoutInput.payment_mode, // Include the selected payment mode
      payment_id: '',
    };
  
    switch (checkoutInput.payment_mode) {
      case 'cod':
        try {
          const res = await axios.post(`/api/place-order`, data);
          if (res.data.status === 200) {
            swal('Order Placed Successfully', res.data.message, 'success');
            setError([]);
            history.push('/thank-you');
          } else if (res.data.status === 422) {
            swal('All fields are mandatory', '', 'error');
            setError(res.data.errors);
          }
        } catch (error) {
          console.error(error);
        }
        break;
  
        case 'Khalti':
          let khaltiCheckout = new KhaltiCheckout(config);
          khaltiCheckout.show({
            amount: totalCartPrice * 100,
            eventHandler: {
              onSuccess: handleKhaltiPaymentSuccess,
              // onError: handleKhaltiPaymentError,
            },
            
          });
          break;


        
  
      default:
        break;
    }
  };

    if(loading)
    {
        return <h4>Loading Checkout...</h4>
    }

    var checkout_HTML = '';
    if(cart.length > 0)
    {
        checkout_HTML = <div>
            <div className="row">

            <div className="col-md-7">
                <div className="card">
                    <div className="card-header">
                        <h4>Basic Information</h4>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> First Name</label>
                                    <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                    <small className="text-danger">{error.firstname}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Last Name</label>
                                    <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                    <small className="text-danger">{error.lastname}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Phone Number</label>
                                    <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} placeholder="98XXXXXXXX" className="form-control" />
                                    <small className="text-danger">{error.phone}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Email Address</label>
                                    <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                    <small className="text-danger">{error.email}</small>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <label> Full Address</label>
                                    <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                    <small className="text-danger">{error.address}</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>City</label>
                                    <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                    <small className="text-danger">{error.city}</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>State</label>
                                    <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                    <small className="text-danger">{error.state}</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>Zip Code</label>
                                    <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                    <small className="text-danger">{error.zipcode}</small>
                                </div>
                            </div>
                            <div className="col-md-12">
              <div className="form-group">
                <label>Payment Mode:</label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="paymentMode"
                    value="cod"
                    checked={checkoutInput.payment_mode === 'cod'}
                    onChange={handlePaymentModeChange}
                  />
                  <label className="form-check-label">Cash on Delivery</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="paymentMode"
                    value="Khalti"
                    checked={checkoutInput.payment_mode === 'Khalti'}
                    onChange={handlePaymentModeChange}
                  />
                  <label className="form-check-label">Khalti Pay</label>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group text-end">
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={submitOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          
                        </div>

                    </div>
                </div>
            </div>

            <div className="col-md-5">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th width="50%">Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Days</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map( (item, idx) => {
                            totalCartPrice += item.product.selling_price * item.product_qty* item.rent_days;
                            return (
                                <tr key={idx}>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.selling_price}</td>
                                    <td>{item.product_qty}</td>
                                    <td>{item.rent_days}</td>
                                    <td>{item.product.selling_price * item.product_qty* item.rent_days}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                            <td colSpan="2" className="text-end fw-bold">{totalCartPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            </div>
        </div>
    }
    else
    {
        checkout_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
            </div>
        </div>
    }

    return (
        <div>

            <Helmet title='Checkout' />

            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Checkout</h6>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              {/* <div>
                <button onClick={() => checkout.show({ amount: totalCartPrice * 100 })}>
                  Pay via Khalti ({totalCartPrice})
                </button>
              </div> */}
              {/* ...modal content... */}
            </Modal>


            <div className="py-4">
                <div className="container">
                   {checkout_HTML}
                </div>
            </div>

        </div>
    )
}



export default Checkout;

