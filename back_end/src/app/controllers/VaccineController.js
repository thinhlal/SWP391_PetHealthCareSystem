const Vaccination = require('../models/Vaccination.js');

class VaccineController {
  // GET /getAllVaccines
  async getAllVaccines(req, res, next) {
    try {
      const allVaccines = await Vaccination.find({});
      res.json(allVaccines);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vaccines' });
    }
  }
}

module.exports = new VaccineController();
