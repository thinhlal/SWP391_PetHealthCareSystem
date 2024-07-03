import React, { useContext, useState } from 'react';
import './WorkSchedule.css';
import Header from '../../components/Doctor/Header/Header.js';
import ConfirmationModal from '../../components/Confirm-Cancel/ConfirmationModal.js'; // Adjust the path as needed
import { AuthContext } from '../../context/AuthContext.js';

function WorkSchedule() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => {});
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().setHours(new Date().getHours() + 7))
      .toISOString()
      .split('T')[0],
  );
  const [selectedVet, setSelectedVet] = useState('001');
  console.log(selectedDate);
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

  return (
    <div>
      <Header />
      <div>
        <div>
          <p className='tittle'>Today's Work Schedule</p>
        </div>
        <div className='vet-container'>
          <p className='vet-id'>
            Veterinarian ID: {user?.doctorDetails[0]?.doctorID}
          </p>
          <p className='vet-name'>
            Veterinarian Name: {user?.doctorDetails[0]?.name}
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
            onClick={() => (window.location.href = '/time-table')}
          >
            Choose Time Work
          </button>
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
