const Service = require('../models/Service.js');

class ServiceController {
  //GET /getAllServices
  async getAllServices(req, res, next) {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services', error });
    }
  }

  //GET /addService
  async addService(req, res, next) {
    try {
      let { serviceName, description, price } = req.body;
      let serviceID;
      while (true) {
        try {
          const lastService = await Service.findOne().sort({ serviceID: -1 });
          if (lastService) {
            const lastID = parseInt(lastService.serviceID.substring(2));
            serviceID = 'SV' + (lastID + 1).toString().padStart(6, '0');
          } else {
            serviceID = 'SV000000';
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const newService = new Service({
        serviceID: serviceID,
        name: serviceName,
        description: description,
        price: price,
      });

      await newService.save();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error add services', error });
    }
  }

  //PATCH /updateServiceStatus
  async updateServiceStatus(req, res, next) {
    const { service } = req.body;
    console.log(service);
    try {
      await Service.findOneAndUpdate(
        { serviceID: service.serviceID },
        {
          status: service.status ? false : true,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services', error });
    }
  }

  //POST /updateServiceInfo
  async updateServiceInfo(req, res, next) {
    const { serviceID, name, description, price } = req.body;
    try {
      await Service.findOneAndUpdate(
        { serviceID },
        {
          name,
          description,
          price,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error update services', error });
    }
  }

  //GET /checkServiceName
  async checkServiceName(req, res, next) {
    const { name } = req.query;
    try {
      const service = await Service.findOne({
        name: { $regex: `^${name}$`, $options: 'i' },
      });
      const exists = service ? true : false;
      res.status(200).json({ exists });
    } catch (error) {
      res.status(500).json({ message: 'Error checking service name', error });
    }
  }
}

module.exports = new ServiceController();
