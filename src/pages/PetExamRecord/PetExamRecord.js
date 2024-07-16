import './PetExamRecord.css';
import Header from '../../components/Doctor/Header/Header.js';
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../context/AuthContext.js';

function PetExamRecord() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [bookingData, setBookingData] = useState({});
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [tempSelectedVaccines, setTempSelectedVaccines] = useState([]);
  const [showSelectedVaccines, setShowSelectedVaccines] = useState(false);
  const [listVaccines, setListVaccines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [requireCage, setRequireCage] = useState(false);
  const [reasonForAdmission, setReasonForAdmission] = useState('');
  const [error, setError] = useState(null);

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

  const fetchVaccines = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/vaccine/getAllVaccinesAvailable`,
      );
      setListVaccines(response.data);
    } catch (error) {
      console.error('Error fetching booking data: ', error);
    }
  };

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
        selectedVaccines,
        requireCage,
        reasonForAdmission,
        doctorID: user.doctorDetails[0].doctorID,
      };
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/doctor/savePetExamRecord`,
        payload,
      );
      if (response.data.success) {
        window.location.href = 'work-schedule';
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error saving pet exam record: ', error);
    }
  };

  const handleVaccineSave = () => {
    setSelectedVaccines(tempSelectedVaccines);
    setShowSelectedVaccines(true);
    document.querySelector('.btn-close').click();
  };

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
                  required
                ></textarea>
              </div>
              <div className='textarea-container'>
                <div className='pet-info-1'>Pet Symptoms</div>
                <textarea
                  className='petE-control'
                  placeholder='Enter Symptoms'
                  value={treatment}
                  onChange={e => setTreatment(e.target.value)}
                  required
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
                  required
                ></textarea>
              </div>
              <div className='textarea-container'>
                <div className='pet-info-1'>Note</div>
                <textarea
                  className='petE-control'
                  placeholder='Enter notes'
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            {bookingData.isCheckedVaccinate && (
              <div className='form-petExam-vaccine'>
                <div className='pet-info-2'>Select Vaccines</div>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#vaccineModal'
                  onClick={fetchVaccines}
                >
                  Select Vaccines
                </button>
                <div
                  className={`selected-vaccines-container ${showSelectedVaccines && selectedVaccines.length > 0 ? 'visible' : ''}`}
                >
                  {selectedVaccines.map((vaccine, index) => (
                    <span
                      key={index}
                      className='selected-vaccine'
                    >
                      {vaccine.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className='checkbox-cage'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={requireCage}
                    onChange={e => setRequireCage(e.target.checked)}
                  />
                }
                label='Require Cage'
              />
              {requireCage && (
                <TextField
                  sx={{ width: '100%', mt: 1 }}
                  id='outlined-basic'
                  label='Reason For Admission'
                  variant='outlined'
                  value={reasonForAdmission}
                  onChange={e => setReasonForAdmission(e.target.value)}
                  required
                  error={!!error}
                  helperText={error}
                />
              )}
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
        <div></div>
      </div>

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
              <h5
                className='modal-title'
                id='vaccineModalLabel'
              >
                Select Vaccines
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body-exam-record'>
              <input
                type='text'
                className='form-control mb-3'
                placeholder='Search Vaccines'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {listVaccines
                .filter(vaccine =>
                  vaccine.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                )
                .map(vaccine => (
                  <div key={vaccine.vaccinationID}>
                    <input
                      type='checkbox'
                      id={vaccine.vaccinationID}
                      value={vaccine.vaccinationID}
                      checked={tempSelectedVaccines.some(
                        v => v.vaccinationID === `${vaccine.vaccinationID}`,
                      )}
                      onChange={e => {
                        const selectedVaccine = {
                          vaccinationID: e.target.value,
                          name: vaccine.name,
                        };
                        setTempSelectedVaccines(prev =>
                          prev.some(
                            v =>
                              v.vaccinationID === selectedVaccine.vaccinationID,
                          )
                            ? prev.filter(
                                item =>
                                  item.vaccinationID !==
                                  selectedVaccine.vaccinationID,
                              )
                            : [...prev, selectedVaccine],
                        );
                      }}
                    />
                    <label htmlFor={vaccine.vaccinationID}>
                      {vaccine.name}
                    </label>
                  </div>
                ))}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
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
