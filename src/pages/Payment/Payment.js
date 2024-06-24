import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';
import acceptImage from '../../assets/images/img_Payment/accept.png'; // Adjust the path based on your project structure

const Payment = () => {
  const [status, setStatus] = useState('');
  const [data, setData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const bookingID = params.get('bookingID');
        const status = params.get('status');
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/paypal/paypal-success-getData`,
          { bookingID },
        );
        setData(response.data);
        setStatus(status);
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
            {status && status === 'success' ? (
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-check-circle-fill'
                  viewBox='0 0 16 16'
                >
                  <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                </svg>
                <h1 className='payment-sub-title'>Payment Successful</h1>
              </div>
            ) : (
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-x-circle'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                  <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
                </svg>
                <h1 className='payment-sub-title'>Payment Cancel</h1>
              </div>
            )}
            <p className='payment-sub-title-content'>
              Your payment has been processed successfully.
            </p>
          </div>
          <div className='payment-main-details'>
            <div className='payment-sub-details'>
              <div className='payment-booking-content'>
                <div className='payment-booking-content-title'>
                  PaymentID:&nbsp;{' '}
                </div>
                <div>{data.paymentID}</div>
              </div>
              <div className='payment-booking-content'>
                <div className='payment-booking-content-title'>
                  BookingID:&nbsp;{' '}
                </div>
                <div>{data.bookingID}</div>
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
