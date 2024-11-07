// import React, { useEffect, useState } from 'react';
// import api from '../../services/api';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch the token from localStorage or context
//   const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

//   useEffect(() => {
//     if (token) {
//       api.get('/orders', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => {
//           setOrders(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching orders:', error);
//           setLoading(false);
//         });
//     }
//   }, [token]);

//   if (loading) {
//     return <div>Loading your orders...</div>;
//   }

//   return (
//     <div>
//       <p>order summmary</p>
//       <h2>Your Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id}>
//             <p>Order ID: {order._id}</p>
//             <p>Status: {order.status}</p>
//             <p>Total Amount: ${order.totalAmount}</p>
//             <p>Items:</p>
//             <ul>
//               {order.products.map((item) => (
//                 <li key={item.product._id}>
//                   {item.product.name} (x{item.quantity})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default OrderHistory;
// // OrderHistory.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import '../../styles/component.css';
import '../../styles/global.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth(); // Use user from AuthContext

  useEffect(() => {
    api.get(`/orders/user/${user._id}`, { // Adjusted endpoint
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setOrders(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
      setLoading(false);
    });
  },[]);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Your Orders</h2>
      {orders.length === 0 ? (
        <p  className="no-orders">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="order-item" key={order._id}>
            <p className="order-id">Order ID: {order._id}</p>
            <p className={`order-status ${order.status.toLowerCase()}`}>Status: {order.status}</p>
            <p className="order-total">Total Amount: ${order.totalAmount}</p>
            <p>Items:</p>
            <ul className="order-items">
              {order.products.map((item) => (
                <li key={item.product._id}>
                  {item.product.name} (x{item.quantity})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
