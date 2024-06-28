const Payment = require('../models/Payment.js');

class PaymentController {
    // POST /updatePaymentByID
    async updatePaymentByID(req, res, next) {
        const { paymentID } = req.body;
        console.log(paymentID);
        try {
            const paymentUpdated = await Payment.findOneAndUpdate({ paymentID }, {
                isSuccess: true,
            }, {
                new: true,
                runValidators: true
            })
            res.status(200).json(paymentUpdated)
        } catch (error) {
            res.status(500).json({ message: 'Error creating ', error });
        }
    }
}

module.exports = new PaymentController();
