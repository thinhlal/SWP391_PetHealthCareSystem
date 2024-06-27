import React, { useState } from 'react';
import './WorkSchedule.css';
import Header from '../../components/Doctor/Header/Header.js';
import ConfirmationModal from '../../components/Confirm-Cancel/ConfirmationModal.js'; // Adjust the path as needed
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/green.css';

function WorkSchedule() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => {});
  const [errors, setErrors] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);
  const [shifts, setShifts] = useState({});
  const [selectedDayOff, setSelectedDayOff] = useState('');
  const [allTimeWork, setTimeWork] = useState([]);
  const dataSchedules = {
    '2023-06-17': {
      '001': {
        vetName: 'Minh',
        appointments: [
          {
            id: 1,
            petId: 'PET01',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '9:00 - 10:00',
            petOwner: 'Ronaldo',
            status: 'Pending',
          },
          {
            id: 2,
            petId: 'PET02',
            petType: 'Cat',
            gender: 'Female',
            registerHour: '10:00 - 11:00',
            petOwner: 'Messi',
            status: 'Pending',
          },
          {
            id: 3,
            petId: 'PET06',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '13:00 - 14:00',
            petOwner: 'Neymar',
            status: 'Pending',
          },
          {
            id: 4,
            petId: 'PET08',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '15:00 - 16:00',
            petOwner: 'Mbappe',
            status: 'Pending',
          },
        ],
      },
    },
    '2023-06-18': {
      '004': {
        vetName: 'Thinh',
        appointments: [
          {
            id: 1,
            petId: 'PET01',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '9:00 - 10:00',
            petOwner: 'Ronaldo',
            status: 'Pending',
          },
          {
            id: 2,
            petId: 'PET02',
            petType: 'Cat',
            gender: 'Female',
            registerHour: '10:00 - 11:00',
            petOwner: 'Messi',
            status: 'Pending',
          },
          {
            id: 3,
            petId: 'PET06',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '13:00 - 14:00',
            petOwner: 'Neymar',
            status: 'Pending',
          },
          {
            id: 4,
            petId: 'PET12',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '15:00 - 16:00',
            petOwner: 'Mbappe',
            status: 'Pending',
          },
          {
            id: 5,
            petId: 'PET13',
            petType: 'Cat',
            gender: 'Female',
            registerHour: '16:00 - 17:00',
            petOwner: 'Haaland',
            status: 'Pending',
          },
        ],
      },
    },
  };
  const [schedules, setSchedules] = useState(dataSchedules);
  const [selectedDate, setSelectedDate] = useState('2023-06-17');
  const [selectedVet, setSelectedVet] = useState('001');

  const handleDateChange = e => {
    const newDate = e.target.value;
    if (!schedules[newDate]) {
      setSchedules(prevSchedules => ({
        ...prevSchedules,
        [newDate]: {},
      }));
    }
    setSelectedDate(newDate);
    const firstVetId = Object.keys(schedules[newDate] || {})[0];
    setSelectedVet(firstVetId || '');
  };

  const handleReceiveClick = (e, status) => {
    e.preventDefault();
    if (status !== 'Canceled') {
      setModalMessage('Are you sure you want to receive this pet?');
      setModalAction(() => () => (window.location.href = 'pet-exam-record'));
      setShowModal(true);
    }
  };

  const selectedSchedule =
    schedules[selectedDate] && schedules[selectedDate][selectedVet]
      ? schedules[selectedDate][selectedVet]
      : { vetName: '', appointments: [] };

  const handleSubmit = event => {
    event.preventDefault();

    if (!selectedDates.length) {
      setErrors(prev => ({
        ...prev,
        selectedDates: 'Please select at least one date.',
      }));
    } else if (Object.values(shifts).length !== selectedDates.length) {
      setErrors(prev => ({
        ...prev,
        shifts: 'Please select a shift for each date.',
      }));
    } else if (!selectedDayOff) {
      setErrors(prev => ({
        ...prev,
        selectedDayOff: 'Please select a day off.',
      }));
    } else {
      const newTimeWork = selectedDates.map(date => ({
        date,
        shift: shifts[date],
        dayOff: selectedDayOff,
      }));

      setTimeWork([...allTimeWork, ...newTimeWork]);
      resetForm();
      document.querySelector('#exampleModal .btn-close').click();
    }
  };

  const resetForm = () => {
    setSelectedDates([]);
    setShifts({});
    setSelectedDayOff('');
    setErrors({});
  };

  const handleDateChangeModal = dates => {
    setSelectedDates(dates);
    setErrors(prev => ({ ...prev, selectedDates: '' }));
  };

  const handleShiftChange = (date, shift) => {
    setShifts(prev => ({ ...prev, [date]: shift }));
    setErrors(prev => ({ ...prev, shifts: '' }));
  };

  const handleDayOffChange = event => {
    setSelectedDayOff(event.target.value);
    setErrors(prev => ({ ...prev, selectedDayOff: '' }));
  };

  return (
    <div>
      <Header />
      <div>
        <div>
          <p className='tittle'>Today's Work Schedule</p>
        </div>
        <div className='vet-container'>
          <p className='vet-id'>Veterinarian ID: {selectedVet}</p>
          <p className='vet-name'>
            Veterinarian Name: {selectedSchedule.vetName}
          </p>
        </div>
      </div>
      <div>
        <div className='date-work'>
          Date's work schedule:{' '}
          <input
            type='date'
            name='date'
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className='main-content-header-choose-day-work'>
          <button
            type='button'
            className='bt-choose-time-work'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'
          >
            Choose Time Work
          </button>
          <div
            className='modal fade'
            id='exampleModal'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <form
                id='chooseTimeWork'
                onSubmit={handleSubmit}
              >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1
                      className='modal-title fs-5'
                      id='exampleModalLabel'
                    >
                      Choose Time Work
                    </h1>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <div className='modal-body'>
                    <div className='modal-body-section-wrapper'>
                      <div className='modal-body-section-doctor-date'>
                        <label>Choose Dates:</label>
                        <DatePicker
                          multiple
                          value={selectedDates}
                          onChange={handleDateChangeModal}
                          format='MM/DD'
                          className='ip-date-work'
                          style={{ color: 'green' }}
                        />
                        {errors.selectedDates && (
                          <span className='error'>{errors.selectedDates}</span>
                        )}
                      </div>
                      {selectedDates.map(date => (
                        <div
                          key={date}
                          className='modal-body-section-doctor-date'
                        >
                          <label>{`Choose Shift for ${date}:`}</label>
                          <select
                            className='sl-date-work'
                            value={shifts[date] || ''}
                            onChange={e =>
                              handleShiftChange(date, e.target.value)
                            }
                            required
                          >
                            <option value=''>Select Shift</option>
                            <option value='Morning'>
                              Morning: 8:00 - 16:00
                            </option>
                            <option value='Evening'>
                              Evening: 15:00 - 22:00
                            </option>
                            <option value='Both'>Both</option>
                            <option>Leave(1 day each week)</option>
                          </select>
                          {errors.shifts && (
                            <span className='error'>{errors.shifts}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      onClick={resetForm}
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                    >
                      Close
                    </button>
                    <button
                      type='submit'
                      className='btn btn-success'
                    >
                      Choose
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className='table-schedule'
          id='tables'
        >
          <form className='form_table-schedule'>
            <table className='table_table-schedule'>
              <thead className='head_table-schedule'>
                <tr>
                  <th className='th_table-schedule'>Stt</th>
                  <th className='th_table-schedule'>Pet ID</th>
                  <th className='th_table-schedule'>Pet Type</th>
                  <th className='th_table-schedule'>Gender</th>
                  <th className='th_table-schedule'>Register hour</th>
                  <th className='th_table-schedule'>Pet Owner</th>
                  <th className='th_table-schedule'>Status</th>
                  <th className='th_table-schedule'></th>
                </tr>
              </thead>
              <tbody>
                {selectedSchedule.appointments.map(row => (
                  <tr key={row.id}>
                    <td className='td_table-schedule'>{row.id}</td>
                    <td className='td_table-schedule'>{row.petId}</td>
                    <td className='td_table-schedule'>{row.petType}</td>
                    <td className='td_table-schedule'>{row.gender}</td>
                    <td className='td_table-schedule'>{row.registerHour}</td>
                    <td className='td_table-schedule'>{row.petOwner}</td>
                    <td
                      className={`td_table-schedule doctor-status-${row.status.toLowerCase()}`}
                    >
                      {row.status}
                    </td>
                    <td className='td_table-schedule'>
                      <div className='td_table-schedule-btn-center'>
                        <a
                          href='pet-exam-record'
                          className={`click-button ${row.status === 'Canceled' ? 'gray-button' : ''}`}
                          onClick={e => handleReceiveClick(e, row.status)}
                          style={{
                            pointerEvents:
                              row.status === 'Canceled' ? 'none' : 'auto',
                          }}
                        >
                          Receive
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <p className='final-petExam'>
        --Today's working hour start at 9:00 a.m and end at 18:00 p.m--
      </p>
      <ConfirmationModal
        show={showModal}
        message={modalMessage}
        onConfirm={modalAction}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default WorkSchedule;
