import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';
import acceptImage from '../../assets/images/img_Payment/accept.png'; // Adjust the path based on your project structure

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
    <div className='payment-main-container'>
      {data ? (
        <div className='payment-sub-container'>
          <div className='payment-main-title'>
            <img
              src={acceptImage}
              alt='Success'
              className='payment-success-image'
            />
            <h1 className='payment-sub-title'>Payment Successful</h1>
            <p className='payment-sub-title-content'>
              Your payment has been processed successfully.
            </p>
          </div>
          <div className='payment-main-details'>
            <div className='payment-sub-details'>
              <div className='payment-booking-content'>
                <div className='payment-booking-content-title'>
                  BookingID:&nbsp;{' '}
                </div>
                <div>{data.id}</div>
              </div>
              <div className='payment-total-content'>
                <div className='payment-booking-content-title'>
                  Total Amount:&nbsp;{' '}
                </div>
                <div>${data.totalPrice}</div>
              </div>
              <div className='payment-date-content'>
                <div className='payment-booking-content-title'>
                  Date:&nbsp;{' '}
                </div>
                <div>{formatDate(data.date)}</div>
              </div>
              <div className='payment-services-content'>
                <div className='payment-booking-content-title'>
                  Services:&nbsp;{' '}
                </div>
                <div>Visa ending in 1234</div>
              </div>
            </div>
          </div>
          <div className='button-payment-container'>
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
