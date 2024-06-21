const axios = require('axios');
const { getIo } = require('../../config/socket/socket');
const { getAccessToken, PAYPAL_API } = require('../../config/paypal/paypal');

class PaymentController {

    async index(req, res) {
        res.send('Payment Page');
    };

    async createOrder(req, res) {
        const accessToken = await getAccessToken();
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: req.body.amount
                }
            }],
            application_context: {
                return_url: 'http://localhost:5000/paypal/paypal-success',
                cancel_url: 'http://localhost:5000/paypal/paypal-cancel',
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
                brand_name: 'PetHealthCare',
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({
            id: response.data.id,
            url: response.data.links.find(link => link.rel === 'approve').href
        });
    };

    async captureOrder(req, res) {
        try {
            const { token } = req.query;
            const accessToken = await getAccessToken();
            const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const io = getIo();
            io.emit('payment-success', {
                id: response.data.id,
                status: response.data.status,
                amount: response.data.purchase_units[0].payments.captures[0].amount.value
            });

            res.redirect('http://localhost:3000/payment-success');
        } catch (error) {
            console.error('Error capturing order:', error.response ? error.response.data : error.message);
            res.status(500).send(error);
        }
    };

    async paymentCancel(req, res) {
        console.log('Da huy booking');
        res.send('Payment cancelled');
    };
}

module.exports = new PaymentController();
