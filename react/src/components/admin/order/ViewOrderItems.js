import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewOrderItems() {
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    let isMounted = true;
    document.title = 'Order Items';

    axios.get(`/api/admin/view-orders/${orderId}`).then(res => {
      if (isMounted) {
        if (res.data && res.data.status === 200) {
          setOrderItems(res.data.data?.orderItems || []);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  let displayOrderItems;
  if (loading) {
    return <h4>Loading Order Items...</h4>;
  } else {
    displayOrderItems = orderItems.map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.product_id}</td>
        <td>{item.product_name}</td>
        <td>
        {item.price}
          {/* <Link to={`/admin/view-orderitem/${item.id}`} className="btn btn-success btn-sm">View</Link> */}
        </td>
      </tr>
    ));
  }

  return (
    <div className="container px-4 mt-3">
      <div className="card">
        <div className="card-header">
          <h4>Order Items</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {displayOrderItems}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrderItems;
