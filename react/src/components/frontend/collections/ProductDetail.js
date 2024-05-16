import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import Helmet from '../../../components/Helmet/Helmet' 


function ProductDetail(props)
{
    


    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [days, setDays] = useState(1);

    useEffect(() => {

        let isMounted = true;

        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;
        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.product);
                    setLoading(false);
                }
                else if(res.data.status === 404)
                {
                    history.push('/collections');
                    swal("Warning",res.data.message,"error");
                }
            }
        });

        return () => {
            isMounted = false
        };
    }, [props.match.params.category, props.match.params.product, history]);

    // Quantity Increment/Decrement in Hooks - Start
    const handleQuantityDecrement = () => {
        if (quantity > 1) {
          setQuantity(prevCount => prevCount - 1);
        }
      };
    
      const handleQuantityIncrement = () => {
        if (quantity < product.qty) {
          setQuantity(prevCount => prevCount + 1);
        }
      };
    
      const handleDaysDecrement = () => {
        if (days > 1) {
          setDays(prevCount => prevCount - 1);
        }
      };
    
      const handleDaysIncrement = () => {
        if (days < 365) {
          setDays(prevCount => prevCount + 1);
        }
      };
    // Quantity Increment/Decrement in Hooks - End
    

    const submitAddtocart = (e) => {
        e.preventDefault();
        
        const data = {
            product_id: product.id,
            product_qty: quantity,
            rent_days: days,

        }

        axios.post(`/api/add-to-cart`, data).then(res=>{
            if(res.data.status === 201){
                //Created - Data Inserted
                swal("Success",res.data.message,"success");
            }else if(res.data.status === 409){
                //Already added to cart
                swal("Success",res.data.message,"success");
            }else if(res.data.status === 401){
                //Unauthenticated
                swal("Error",res.data.message,"error");
            }else if(res.data.status === 404){
                //Not Found
                swal("Warning",res.data.message,"warning");
            }
        });

    }

    if(loading)
    {
        return <h4>Loading Product Detail...</h4>
    }
    else
    {

        var avail_stock = '';
        if(product.qty > 0)
        {
            avail_stock = <div>
                <label className="btn-sm btn-success px-4 mt-2">In stock</label>
                <div className="row">
                    <div className="col-md-4 mt-3">
                        <div className="input-group">
                        <label className=" px-2 mt-2 fw-bold">Quantity:</label>
                            <button type="button" onClick={handleQuantityDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            <button type="button" onClick={handleQuantityIncrement} className="input-group-text">+</button>
                        </div>
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col-md-5 mt-3">
                        <div className="input-group">
                        <label className=" px-2 mt-2 fw-bold">Days To Rent:</label>
                            <button type="button" onClick={handleDaysDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{days}</div>
                            <button type="button" onClick={handleDaysIncrement} className="input-group-text">+</button>
                        </div>
                    </div>
                    
                </div>
                <div className="col-md-3 mt-3">
                        <button type="button" className="btn btn-primary w-100" onClick={submitAddtocart}>Add to Cart</button>
                    </div>
            </div>
        }
        else
        {
            avail_stock = <div>
                <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
            </div>
        }
    }

    return (
        <div>
            <Helmet title='ProductDetail' />
            <div className="py-3 bg-secondary">
                <div className="container">
                    <h6>Collections / {product.category.name} / {product.name}</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">

                        <div className="col-md-4 border-end">
                            <img src={`http://localhost:8000/${product.image}`} alt={product.name} className="h-100 w-100" />
                        </div>

                        <div className="col-md-8">
                            <h4>
                                {product.name}
                                <span className="float-end badge btn-sm btn-danger badge-pil"> {product.brand} </span>
                            </h4>
                            <p> {product.description} </p>
                            <h4 className="mb-1"> 
                                Rs: {product.selling_price}
                                <s className="ms-2">  Rs: {product.original_price} </s>
                            </h4>
                            <div>
                                {avail_stock}
                            </div>

                            {/* <button type="button" className="btn btn-danger mt-3">Add to Wishlist</button> */}
                           
                       </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
