import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Payment() {
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        
        socket.on('payment-success', (data) => {
            console.log(data);
            setPaymentData(data);
        });
        // Lắng nghe lỗi xác thực
        socket.on('connect_error', (err) => {
            console.error('Connection error:', err.message);
        });

        return () => {
            socket.off('payment-success');
            socket.off('connect_error');
        };
    }, []);

    if (!paymentData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-green-500 rounded-full p-4">
                        <CheckIcon className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Payment Successful</h1>
                    <p className="text-gray-500 dark:text-gray-400">Your payment has been processed successfully.</p>
                </div>
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">BookingID</p>
                            <p className="text-gray-900 dark:text-gray-100">{JSON.stringify(paymentData).id}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount</p>
                            <p className="text-gray-900 dark:text-gray-100">${JSON.stringify(paymentData).amount}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Services</p>
                            <p className="text-gray-900 dark:text-gray-100">Visa ending in 1234</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <Link
                        to="/order-history"
                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-700"
                    >
                        View Order History
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-4 py-2 ml-4 text-gray-900 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:ring-gray-700"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PaymentWrap() {
    return (
        <Layout>
            <Payment></Payment>
        </Layout>
    )
}

function CheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}
