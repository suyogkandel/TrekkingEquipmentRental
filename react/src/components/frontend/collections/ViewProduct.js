import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useHistory } from 'react-router-dom';
import Helmet from '../../../components/Helmet/Helmet' 
import '../../../styles/img-container.css'


function ViewProduct(props)
{
    

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const sortedProducts = [...product].sort((a, b) => a.name.localeCompare(b.name));
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    };

    const filteredProducts = sortedProducts.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
    );

    const productCount = product.length;

    useEffect(() => {

        let isMounted = true;

        const product_slug = props.match.params.slug;
        axios.get(`/api/fetchproducts/${product_slug}`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    setLoading(false);
                }
                else if(res.data.status === 400)
                {
                    swal("Warning",res.data.message,"");
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
    }, [props.match.params.slug, history]);


    if(loading)
    {
        return <h4>Loading Products...</h4>
    }
    else
    {
        var showProductList = '';
        if(productCount)
        {

             showProductList = (
                <div className="row">
                  {filteredProducts.map((item, idx) => (
                    <div className="col-md-3" key={idx}>
                      <div className="card h-100">
                        <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                          <img
                            src={`http://localhost:8000/${item.image}`}
                            className="img_container w-100"
                            alt={item.name}
                          />
                        </Link>
                        <div className="card-body">
                          <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                            <h5>{item.name}</h5>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
              
        }
        else
        {
            showProductList = 
            <div className="col-md-12">
                <h4>No Product Available for {category.name}</h4>
            </div>
        }
    }

    return (
        <div>
            <Helmet title='Products' >
            <div className="py-3 bg-secondary">
               <div className="container">
                <h6>Categories / {category.name}</h6>
               </div>
            </div>

            <div className="py-3">
               <div className="container">
                   <div className="row">
                    <div className ="row" >
                        <div className="col-md-4 mb-4">
                        <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="form-control"
                        />
                        </div>
                        </div>
                        
                       {showProductList}
                   </div>
               </div>
            </div>
            </Helmet>
            
            
        </div>
    );
}

export default ViewProduct;
