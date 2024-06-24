import React, { useState } from 'react';
import './WorkSchedule.css';
import Header from '../../components/Doctor/Header/Header.js';
import ConfirmationModal from '../../components/Confirm-Cancel/ConfirmationModal.js'; // Adjust the path as needed

function WorkSchedule() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => {});
  const handleSubmit = event => {
    event.preventDefault();
  };
  const [errors, setErrors] = useState({
    selectedDate: '',
    selectedTimeWork: '',
  });
  const availableTimeWork = [
    { startTime: '08:00', endTime: '09:00' },
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '11:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '13:00' },
    { startTime: '13:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '15:00' },
    { startTime: '15:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '17  :00' },

    // thêm các khung giờ khác tại đây
  ];
  const [allTimeWork, setTimeWork] = useState([
    {
      day: '2024-06-17',
      startTime: '9:00',
      endTime: '10:00',
    },
    {
      day: '2024-06-02',
      startTime: '10:00',
      endTime: '11:00',
    },
    {
      day: '2024-06-02',
      startTime: '11:00',
      endTime: '12:00',
    },
    {
      day: '2024-06-03',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      day: '2024-06-03',
      startTime: '13:00',
      endTime: '14:00',
    },
  ]);
  const handleChooseTimeWork = event => {
    event.preventDefault();

    const newTimeWork = {
      day: selectedDate,
      startTime: selectedStartTime.startTime,
      endTime: selectedEndTime.endTime,
    };

    setTimeWork([...allTimeWork, newTimeWork]);
    resetForm();
    document.querySelector('#exampleModal .btn-close').click();
  };

  const resetForm = () => {
    setSelectedDate('');
    setSelectedStartTime({});
    setSelectedEndTime({});
    setErrors({});
  };
  const handleStartTimeChange = event => {
    const [startTime] = event.target.value.split('-');
    setSelectedStartTime({ startTime });
    setErrors(prev => ({ ...prev, selectedTimeWork: '' }));
  };
  const [selectedStartTime, setSelectedStartTime] = useState({});

  const handleEndTimeChange = event => {
    const [endTime] = event.target.value.split('-');
    setSelectedEndTime({ endTime });
    setErrors(prev => ({ ...prev, selectedTimeWork: '' }));
  };
  const [selectedEndTime, setSelectedEndTime] = useState({});
  const dataSchedules = {
    //ngày 17-6
    '2023-06-17': {
      '001': {
        vetName: 'Vet. Minh',
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
      '002': {
        vetName: 'Vet. Phat',
        appointments: [
          {
            id: 1,
            petId: 'PET03',
            petType: 'Cat',
            gender: 'Male',
            registerHour: '10:00 - 11:00',
            petOwner: 'Vini',
            status: 'Pending',
          },
          {
            id: 2,
            petId: 'PET04',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '13:00 - 14:00',
            petOwner: 'De Bruyne',
            status: 'Pending',
          },
          {
            id: 3,
            petId: 'PET07',
            petType: 'Dog',
            gender: 'Female',
            registerHour: '14:00 - 15:00',
            petOwner: 'Saka',
            status: 'Pending',
          },
          {
            id: 4,
            petId: 'PET10',
            petType: 'Dog',
            gender: 'Female',
            registerHour: '15:00 - 16:00',
            petOwner: 'Bruno',
            status: 'Pending',
          },
          {
            id: 5,
            petId: 'PET12',
            petType: 'Cat',
            gender: 'Female',
            registerHour: '17:00 - 18:00',
            petOwner: 'Felix',
            status: 'Pending',
          },
        ],
      },
      '006': {
        vetName: 'Vet. Tung',
        appointments: [
          {
            id: 1,
            petId: 'PET09',
            petType: 'Cat',
            gender: 'Male',
            registerHour: '9:00 - 10:00',
            petOwner: 'Mount',
            status: 'Pending',
          },
          {
            id: 2,
            petId: 'PET11',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '10:00 - 11:00',
            petOwner: 'Havertz',
            status: 'Pending',
          },
          {
            id: 3,
            petId: 'PET13',
            petType: 'Cat',
            gender: 'Female',
            registerHour: '13:00 - 14:00',
            petOwner: 'Reus',
            status: 'Pending',
          },
        ],
      },
    },
    //ngày 18-6
    '2023-06-18': {
      '004': {
        vetName: 'Vet. Thinh',
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
      '003': {
        vetName: 'Vet. Duong',
        appointments: [
          {
            id: 1,
            petId: 'PET03',
            petType: 'Cat',
            gender: 'Male',
            registerHour: '10:00 - 11:00',
            petOwner: 'Vini',
            status: 'Pending',
          },
          {
            id: 2,
            petId: 'PET04',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '13:00 - 14:00',
            petOwner: 'De Bruyne',
            status: 'Pending',
          },
          {
            id: 3,
            petId: 'PET07',
            petType: 'Dog',
            gender: 'Female',
            registerHour: '14:00 - 15:00',
            petOwner: 'Saka',
            status: 'Pending',
          },
          {
            id: 4,
            petId: 'PET10',
            petType: 'Dog',
            gender: 'Female',
            registerHour: '15:00 - 16:00',
            petOwner: 'Bruno',
            status: 'Pending',
          },
        ],
      },
      '005': {
        vetName: 'Vet. Dat',
        appointments: [
          {
            id: 1,
            petId: 'PET08',
            petType: 'Cat',
            gender: 'Male',
            registerHour: '9:00 - 10:00',
            petOwner: 'Mount',
            status: 'Pending',
          },
          {
            id: 2,
            petId: 'PET09',
            petType: 'Dog',
            gender: 'Male',
            registerHour: '10:00 - 11:00',
            petOwner: 'Havertz',
            status: 'Pending',
          },
          {
            id: 3,
            petId: 'PET11',
            petType: 'Cat',
            gender: 'Female',
            registerHour: '13:00 - 14:00',
            petOwner: 'Reus',
            status: 'Pending',
          },
          {
            id: 4,
            petId: 'PET14',
            petType: 'Cat',
            gender: 'Male',
            registerHour: '14:00 - 15:00',
            petOwner: 'Lukaku',
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

  // const handleVetChange = e => {
  //   setSelectedVet(e.target.value);
  // };

  // Handle receive click
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

  // const vetOptions = schedules[selectedDate]
  //   ? Object.keys(schedules[selectedDate]).map(vetId => ({
  //       vetId,
  //       vetName: schedules[selectedDate][vetId]?.vetName,
  //     }))
  //   : [];

  return (
    <div>
      <Header />
      <div>
        <div>
          <p className='tittle'> Today's Work Schedule</p>
        </div>
        <div className='vet-container'>
          <p className='vet-id'>Veterinarian ID: {selectedVet}</p>
          <p className='vet-name'>Vet. {selectedSchedule.vetName}</p>
        </div>
        {/* <div className='vet-select'>
          Select Veterinarian:
          <select
            value={selectedVet}
            onChange={handleVetChange}
          >
            {vetOptions.map(option => (
              <option
                key={option.vetId}
                value={option.vetId}
              >
                {option.vetName}
              </option>
            ))}
          </select>
        </div> */}
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
                      <div>
                        <div className='modal-body-section-doctor-date'>
                          <label>Choose Date:</label>
                          <input
                            type='date'
                            value={selectedDate}
                            onChange={e => {
                              setSelectedDate(e.target.value);
                              setErrors(prev => ({
                                ...prev,
                                selectedDate: '',
                              }));
                            }}
                            required
                          />
                          {errors.selectedDate && (
                            <span className='error'>{errors.selectedDate}</span>
                          )}
                        </div>
                        <div className='modal-body-section-doctor-date'>
                          <label>Choose Time Start Work:</label>
                          <select
                            value={`${selectedStartTime.startTime}`}
                            onChange={e => handleStartTimeChange(e)}
                            required
                          >
                            <option value=''>Select Time Slot</option>
                            {availableTimeWork.map((slot, index) => (
                              <option
                                key={index}
                                value={`${slot.startTime}`}
                              >{`${slot.startTime}`}</option>
                            ))}
                            
                          </select>
                          {errors.selectedTimeWork && (
                            <span className='error'>
                              {errors.selectedTimeWork}
                            </span>
                          )}
                        </div>
                        <div className='modal-body-section-doctor-date'>
                          <label>Choose Time End Work:</label>
                          <select
                            value={`${selectedEndTime.endTime}`}
                            onChange={e => handleEndTimeChange(e)}
                            required
                          >
                            <option value=''>Select Time Slot</option>
                            {availableTimeWork.map((slot, index) => (
                              <option
                                key={index}
                                value={`${slot.endTime}`}
                              >{`${slot.endTime}`}</option>
                            ))}
                            
                          </select>
                          {errors.selectedTimeWork && (
                            <span className='error'>
                              {errors.selectedTimeWork}
                            </span>
                          )}
                        </div>
                      </div>
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
                      onClick={e => handleChooseTimeWork(e)}
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
        ----------Today's working hour start at 9:00 a.m and end at 18:00
        p.m----------
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
