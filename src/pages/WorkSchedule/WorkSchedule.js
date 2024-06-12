import React, { useState } from 'react';
import './WorkSchedule.css';
import Header from '../../components/Doctor/Header/Header.js';

function WorkSchedule() {
  const initialSchedules = {
    //ngày 12-6
    '2023-06-12': {
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
    //ngày 13-6
    '2023-06-13': {
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

  const [schedules, setSchedules] = useState(initialSchedules);
  const [selectedDate, setSelectedDate] = useState('2023-06-12');
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

  const handleVetChange = e => {
    setSelectedVet(e.target.value);
  };

  const handleCancelClick = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setSchedules({
        ...schedules,
        [selectedDate]: {
          ...schedules[selectedDate],
          [selectedVet]: {
            ...schedules[selectedDate][selectedVet],
            appointments: schedules[selectedDate][selectedVet].appointments.map(
              row => (row.id === id ? { ...row, status: 'Canceled' } : row),
            ),
          },
        },
      });
    }
  };

  const handleReceiveClick = (e, status) => {
    e.preventDefault();
    if (
      status !== 'Canceled' &&
      window.confirm('Are you sure you want to receive this pet?')
    ) {
      window.location.href = 'pet-exam-record'; // Redirect to the specified page
    }
  };

  const selectedSchedule =
    schedules[selectedDate] && schedules[selectedDate][selectedVet]
      ? schedules[selectedDate][selectedVet]
      : { vetName: '', appointments: [] };

  const vetOptions = schedules[selectedDate]
    ? Object.keys(schedules[selectedDate]).map(vetId => ({
        vetId,
        vetName: schedules[selectedDate][vetId]?.vetName,
      }))
    : [];

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
        <div className='vet-select'>
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
                        {row.status !== 'Canceled' && (
                          <a
                            href='pet-exam-record'
                            className='cancel-booking-button'
                            onClick={e => handleCancelClick(e, row.id)}
                          >
                            Cancel
                          </a>
                        )}
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
    </div>
  );
}

export default WorkSchedule;
