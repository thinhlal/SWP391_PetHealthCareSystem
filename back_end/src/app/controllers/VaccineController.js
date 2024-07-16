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

  // GET /getAllVaccinesAvailable
  async getAllVaccinesAvailable(req, res, next) {
    try {
      const allVaccines = await Vaccination.aggregate([
        {
          $match: {
            quantity: { $gte: 0 },
            status: true,
          },
        },
      ]);
      res.json(allVaccines);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vaccines' });
    }
  }

  // GET /checkDuplicateName
  async checkDuplicateName(req, res, next) {
    try {
      const { name } = req.query;
      const existingVaccine = await Vaccination.findOne({
        name: { $regex: new RegExp('^' + name + '$', 'i') },
      });

      if (existingVaccine) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to check duplicate vaccine name' });
    }
  }

  // POST /addVaccine
  async addVaccine(req, res, next) {
    try {
      const { name, notes, nextDate, quantity } = req.body;
      let idVaccine;
      while (true) {
        try {
          const lastVaccineID = await Vaccination.findOne().sort({
            vaccinationID: -1,
          });
          if (lastVaccineID) {
            idVaccine = parseInt(lastVaccineID.vaccinationID) + 1;
          } else {
            idVaccine = 0;
          }
          break;
        } catch (error) {
          console.log(error);
        }
      }
      const newVaccine = new Vaccination({
        vaccinationID: idVaccine,
        name,
        notes,
        quantity,
        nextDate,
        status: quantity > 0,
      });

      await newVaccine.save();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to check duplicate vaccine name' });
    }
  }

  // PATCH /updateStatusVaccine
  async updateStatusVaccine(req, res, next) {
    try {
      const { vaccinationID, status } = req.body;
      await Vaccination.findOneAndUpdate(
        { vaccinationID },
        {
          status,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to update vaccine status' });
    }
  }

  // POST /updateVaccineAdmin
  async updateVaccineAdmin(req, res, next) {
    try {
      const { vaccinationID, name, notes, nextDate, quantity } = req.body;
      console.log(vaccinationID, name, notes, nextDate, quantity);
      await Vaccination.findOneAndUpdate(
        { vaccinationID },
        {
          name,
          nextDate,
          notes,
          quantity,
          status: quantity > 0,
        },
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to update vaccine status' });
    }
  }
}

module.exports = new VaccineController();
