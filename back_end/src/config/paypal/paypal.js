const axios = require('axios');

const PAYPAL_API = process.env.PAYPAL_BASE_URL;

const getAccessToken = async () => {
    const response = await axios({
        url: PAYPAL_API + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_CLIENT_SECRET,
        }
    });
    return response.data.access_token;
};

module.exports = { getAccessToken, PAYPAL_API };
