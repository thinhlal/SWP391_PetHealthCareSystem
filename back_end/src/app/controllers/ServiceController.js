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

  async addService(req, res, next) {
    try {
      let {status, services_id, serviceName, describe, price} = req.body;

      const newService = new Service({
        serviceID: services_id,
        name: serviceName,
        description: describe,
        price: price,
        status: status
      });
      
      await newService.save();
      res.status(201).json({ message: 'Save successfully', services_id: services_id });
    } catch (error) {

    }
  }
}

module.exports = new ServiceController();
