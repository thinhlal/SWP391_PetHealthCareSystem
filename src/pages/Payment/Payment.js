import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const bookingID = params.get('bookingID');
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/paypal/paypal-success-getData`,
          { bookingID },
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [location.search]);

  const formatDate = isoString => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      {data ? (
        <div>
          <div>
            <h1>Payment Successful</h1>
            <p>Your payment has been processed successfully.</p>
          </div>
          <div>
            <div>
              <div>
                <p>BookingID</p>
                <p>{data.id}</p>
              </div>
              <div>
                <p>Total Amount</p>
                <p>${data.totalPrice}</p>
              </div>
              <div>
                <p>Date</p>
                <p>{formatDate(data.date)}</p>
              </div>
              <div>
                <p>Services</p>
                <p>Visa ending in 1234</p>
              </div>
            </div>
          </div>
          <div>
            <Link to='/your-booking'>View Order History</Link>
            <Link to='/'>Return to Homepage</Link>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default Payment;
