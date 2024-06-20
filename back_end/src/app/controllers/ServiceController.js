const Service = require('../models/Service.js');

class ServiceController {
    //GET /
    async getAllServices(req, res, next) {
        try {
            const services = await Service.find();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching services', error });
        }
    }

}

module.exports = new ServiceController();