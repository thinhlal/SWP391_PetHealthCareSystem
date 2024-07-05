import './PetExamRecord.css';
import Header from '../../components/Doctor/Header/Header.js';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { useLocation } from 'react-router-dom';

function PetExamRecord() {
  const location = useLocation();
  const [bookingData, setBookingData] = useState({});
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');

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

  return (
    <div>
      <Header />
      <div className='petExam'>
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
            <div className='form-petExam'>
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
            <div className='form-petExam-2'>
              <div className='pet-info-1'>Pet Weight</div>
              <div className='petE-info'>
                {bookingData?.petDetails[0]?.breed}
              </div>
            </div>
            <div className='form-petExam'>
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
            <div className='form-petExam-2'>
              <div className='pet-info-1'>Pet Gender</div>
              <div className='petE-info'>
                {bookingData?.petDetails[0]?.gender}
              </div>
            </div>
            <div className='form-petExam-3'>
              <div className='pet-info-1'>Pet Diagnostic</div>
              <textarea
                className='petE-control'
                placeholder='Enter Diagnostic'
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
              ></textarea>
            </div>
            <div className='form-petExam-3'>
              <div className='pet-info-1'>Pet Symptoms</div>
              <textarea
                className='petE-control'
                placeholder='Enter Symptoms'
                value={treatment}
                onChange={e => setTreatment(e.target.value)}
              ></textarea>
            </div>
            <div className='form-petExam-3'>
              <div className='pet-info-1'>Prescription</div>
              <textarea
                className='petE-control'
                placeholder='Enter prescription'
                value={prescription}
                onChange={e => setPrescription(e.target.value)}
              ></textarea>
            </div>
            <div className='form-petExam-3'>
              <div className='pet-info-1'>Note</div>
              <textarea
                className='petE-control'
                placeholder='Enter notes'
                value={notes}
                onChange={e => setNotes(e.target.value)}
              ></textarea>
            </div>
            <div className='final-petE'>
              <button
                type='submit'
                className='btn-save'
              >
                Save
              </button>
              <a
                href='work-schedule'
                className='btn-cancel'
                onClick={handleCancelClick}
              >
                Cancel
              </a>
            </div>
          </form>
        ) : null}
        <div>
          <div className='petE-tittle-2'>
            ----------Information Pet----------
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetExamRecord;
