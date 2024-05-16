import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function Returns() {
  const [loading, setLoading] = useState(true);
  const [returnsData, setReturnsData] = useState([]);

  useEffect(() => {
    document.title = "Returns";

    fetchReturnsData();
  }, []);

  const fetchReturnsData = async () => {
    try {
      const response = await axios.get(`/api/admin/returns`);
      if (response.data.status === 200) {
        setReturnsData(response.data.returns);
        setLoading(false);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveReturn = async (e, productId, returnId, orderId, returnQty) => {
    e.preventDefault();
    
  
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Approving";
  
    try {
      const res = await axios.post(`/api/admin/approve-return`, {
        product_id: productId,
        return_id: returnId,
        order_id: orderId,
        return_qty: returnQty,
      });
  
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      thisClicked.innerText = "Approved";
    }
  };
  
  
  

  let displayReturnsData;
  if (loading) {
    return <h4>Loading Returns Data...</h4>;
  } else {
    displayReturnsData = returnsData.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.user_id}</td>
        <td>{item.user_name}</td>
        <td>{item.product_id}</td>
        <td>{item.product_name}</td>
        <td>{item.return_qty}</td>
        <td>
        <button
            type="button"
            onClick={(e) =>
              handleApproveReturn(
                e,
                item.product_id,
                item.id,
                item.order_id,
                item.return_qty
              )
            }
            className={`btn btn-${item.returned === 1 ? 'secondary' : 'success'} btn-sm`}
            disabled={item.returned === 1} // Disable the button if returned is 1
            >
            {item.returned === 1 ? 'Approved' : 'Approve'}
          </button>

        </td>
      </tr>
    ));
  }

  return (
    <div className="container px-4 mt-3">
      <div className="card">
        <div className="card-header">
          <h4>Returns Data</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Return Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{displayReturnsData}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returns;
