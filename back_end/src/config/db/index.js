const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://thinhlal273:123@petcare.oippqhu.mongodb.net/PetHealthCare?retryWrites=true&w=majority&appName=PetCare',
    );
    console.log('Connect successfully!!!');
  } catch (error) {
    console.log('Connect failure!!!');
  }
}

module.exports = { connect };
