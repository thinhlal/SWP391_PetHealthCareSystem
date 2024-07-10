import './PetExamRecord.css';
import Header from '../../components/Doctor/Header/Header.js';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function PetExamRecord() {
  const location = useLocation();
  const [bookingData, setBookingData] = useState({});
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [tempSelectedVaccines, setTempSelectedVaccines] = useState([]);
  const [showSelectedVaccines, setShowSelectedVaccines] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const vaccinesList = [
    'Rabies', 'Distemper', 'Parvovirus', 'Adenovirus', 'Leptospirosis',
    'Bordetella', 'Canine Influenza', 'Lyme Disease', 'Coronavirus', 'Giardia',
    'Feline Herpesvirus', 'Feline Calicivirus', 'Feline Panleukopenia', 'Feline Leukemia',
    'Feline Immunodeficiency Virus', 'Chlamydia', 'Bordetella Bronchiseptica',
    'Dermatophytosis', 'Heartworm', 'Hookworm', 'Roundworm', 'Tapeworm',
    'Whipworm', 'Toxoplasmosis'
  ];

  useEffect(() => {
    const fetchWorkSchedule = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const bookingID = params.get('bookingID');
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/doctor/getBookingByID/${bookingID}`,
        );
        console.log(response.data);
        setBookingData(response.data);
      } catch (error) {
        console.error('Error fetching booking data: ', error);
      }
    };
    fetchWorkSchedule();
  }, [location.search]);

  const handleCancelClick = e => {
    e.preventDefault();
    window.location.href = 'work-schedule';
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const payload = {
        bookingID: bookingData.bookingID,
        diagnosis,
        treatment,
        prescription,
        notes,
        selectedVaccines
      };
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/doctor/savePetExamRecord`,
        payload,
      );
      window.location.href = 'work-schedule';
    } catch (error) {
      console.error('Error saving pet exam record: ', error);
    }
  };

  const handleVaccineSave = () => {
    setSelectedVaccines(tempSelectedVaccines);
    setShowSelectedVaccines(true);
    document.querySelector('.btn-close').click();
  };

  const filteredVaccines = vaccinesList.filter(vaccine =>
    vaccine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className='petExam-record'>
        <div>
          <div>
            <div className='petE-head'>
              <div className='petE-tittle'>Pet Exam Record</div>
              <div className='petE-tittle-1'>
                Receive a examination pool for pet
              </div>
            </div>
          </div>
        </div>
        {bookingData.petDetails ? (
          <form
            className='form-petE'
            onSubmit={handleSave}
          >
            <div className='form-petExam-1'>
              <div className='pet-info-1'>Pet ID</div>
              <div className='petE-info'>
                {bookingData?.petDetails[0]?.petID}
              </div>
            </div>
            <div className='form-petExam-1'>
              <div className='pet-info-1'>Pet Type</div>
              <div className='petE-info'>
                {bookingData?.petDetails[0]?.petType}
              </div>
            </div>
            <div className='form-petExam-1'>
              <div className='pet-info-1'>Pet Weight</div>
              <div className='petE-info'>
                {bookingData?.petDetails[0]?.breed}
              </div>
            </div>
            <div className='form-petExam-1'>
              <div className='pet-info-1'>Pet Name</div>
              <div className='petE-info'>
                {bookingData?.petDetails[0]?.name}
              </div>
            </div>
            <div className='form-petExam-1'>
              <div className='pet-info-1'>Pet Owner</div>
              <div className='petE-info'>
                {bookingData?.customerDetails[0]?.name}
              </div>
            </div>
            <div className='form-petExam-1'>
              <div className='pet-info-1'>Pet Gender</div>
              <div className='petE-info'>
                {bookingData?.petDetails[0]?.gender}
              </div>
            </div>
            <div className='form-petExam-3'>
              <div className='textarea-container'>
                <div className='pet-info-1'>Pet Diagnostic</div>
                <textarea
                  className='petE-control'
                  placeholder='Enter Diagnostic'
                  value={diagnosis}
                  onChange={e => setDiagnosis(e.target.value)}
                ></textarea>
              </div>
              <div className='textarea-container'>
                <div className='pet-info-1'>Pet Symptoms</div>
                <textarea
                  className='petE-control'
                  placeholder='Enter Symptoms'
                  value={treatment}
                  onChange={e => setTreatment(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className='form-petExam-3'>
              <div className='textarea-container'>
                <div className='pet-info-1'>Prescription</div>
                <textarea
                  className='petE-control'
                  placeholder='Enter prescription'
                  value={prescription}
                  onChange={e => setPrescription(e.target.value)}
                ></textarea>
              </div>
              <div className='textarea-container'>
                <div className='pet-info-1'>Note</div>
                <textarea
                  className='petE-control'
                  placeholder='Enter notes'
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className='form-petExam-vaccine'>
              <div className='pet-info-2'>Select Vaccines</div>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#vaccineModal'
              >
                Select Vaccines
              </button>
              <div className={`selected-vaccines-container ${showSelectedVaccines ? 'visible' : ''}`}>
                {selectedVaccines.map((vaccine, index) => (
                  <span key={index} className='selected-vaccine'>
                    {vaccine}
                  </span>
                ))}
              </div>
            </div>
            <div className='final-petE'>
              <button
                type='submit'
                className='btn-save'
              >
                Save
              </button>
              <button
                href='work-schedule'
                className='btn-cancel'
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}
        <div>
        </div>
      </div>

      {/* Vaccine Modal */}
      <div
        className='modal fade'
        id='vaccineModal'
        tabIndex='-1'
        aria-labelledby='vaccineModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='vaccineModalLabel'>Select Vaccines</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body-exam-record'>
              <input
                type='text'
                className='form-control mb-3'
                placeholder='Search Vaccines'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredVaccines.map((vaccine) => (
                <div key={vaccine}>
                  <input
                    type='checkbox'
                    id={vaccine}
                    value={vaccine}
                    checked={tempSelectedVaccines.includes(vaccine)}
                    onChange={(e) => {
                      const selectedVaccine = e.target.value;
                      setTempSelectedVaccines((prev) =>
                        prev.includes(selectedVaccine)
                          ? prev.filter((item) => item !== selectedVaccine)
                          : [...prev, selectedVaccine]
                      );
                    }}
                  />
                  <label htmlFor={vaccine}>{vaccine}</label>
                </div>
              ))}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleVaccineSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetExamRecord;
