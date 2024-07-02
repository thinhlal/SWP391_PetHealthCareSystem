import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';
import acceptImage from '../../assets/images/img_Payment/accept.png';
import cancel from '../../assets/images/img_Payment/cancel.png';

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
        setData(response.data.paymentData);
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
    return `${year}-${month}-${day}`;
  };

  let serviceNames;
  if (data) {
    serviceNames = data[0].serviceDetails.map(service => service.name);
  }
  return (
    <div className='payment-main-container'>
      {data ? (
        <div className='payment-sub-container'>
          <div className='payment-main-title'>
            {status && status === 'success' ? (
              <div>
                <img
                  src={acceptImage}
                  alt='Success'
                  className='payment-success-image'
                />
                <h1 className='payment-sub-title-success'>
                  Payment Successful
                </h1>
              </div>
            ) : (
              <div>
                <img
                  src={cancel}
                  alt='Cancel'
                  className='payment-success-image'
                />
                <h1 className='payment-sub-title-cancel'>Payment Cancel</h1>
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
                <div>{data[0].paymentID}</div>
              </div>
              <div className='payment-booking-content'>
                <div className='payment-booking-content-title'>
                  BookingID:&nbsp;{' '}
                </div>
                <div>{data[0].bookingID}</div>
              </div>
              <div className='payment-total-content'>
                <div className='payment-booking-content-title'>
                  Total Amount:&nbsp;{' '}
                </div>
                <div>${data[0].totalPrice}</div>
              </div>
              <div className='payment-date-content'>
                <div className='payment-booking-content-title'>
                  Date:&nbsp;{' '}
                </div>
                <div>{formatDate(data[0].bookingDetails[0].dateBook)}</div>
              </div>
              <div className='payment-date-content'>
                <div className='payment-booking-content-title'>
                  Time:&nbsp;{' '}
                </div>
                <div>{`${data[0].bookingDetails[0].startTime} - ${data[0].bookingDetails[0].endTime}`}</div>
              </div>
              <div className='payment-services-content'>
                <div className='payment-booking-content-title'>
                  Doctor:&nbsp;{' '}
                </div>
                <div>
                  {data[0].doctorsDetails.length === 0
                    ? 'Not choose doctors'
                    : data[0].doctorsDetails[0].name}
                </div>
              </div>
              <div className='payment-services-content'>
                <div className='payment-booking-content-title'>
                  Services:&nbsp;{' '}
                </div>
                <div>{serviceNames.join(', ')}</div>
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
