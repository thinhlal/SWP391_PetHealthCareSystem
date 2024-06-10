import React, { useState } from 'react';
import './WorkSchedule.css';
import Header from '../../components/Doctor/Header/Header.js';

function WorkSchedule() {
  const initialState = [
    { id: 1, petId: 'PET01', petType: 'Dog', gender: 'Male', registerHour: '9:00 - 10:00', petOwner: 'Minh', status: 'Pending' },
    { id: 2, petId: 'PET02', petType: 'Dog', gender: 'Female', registerHour: '10:00 - 11:00', petOwner: 'Phat', status: 'Pending' },
    { id: 3, petId: 'PET03', petType: 'Cat', gender: 'Male', registerHour: '13:00 - 14:00', petOwner: 'Dat', status: 'Pending' },
    { id: 4, petId: 'PET04', petType: 'Dog', gender: 'Male', registerHour: '15:00 - 16:00', petOwner: 'Thinh', status: 'Pending' },
    { id: 5, petId: 'PET05', petType: 'Cat', gender: 'Female', registerHour: '16:00 - 17:00', petOwner: 'Thinh', status: 'Pending' },
    { id: 6, petId: 'PET06', petType: 'Dog', gender: 'Male', registerHour: '17:00 - 18:00', petOwner: 'Thinh', status: 'Pending' },
  ];

  const [rows, setRows] = useState(initialState);
  const handleCancelClick = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setRows(rows.map(row => 
        row.id === id ? { ...row, status: 'Canceled' } : row
      ));
    }
  };

  const handleReceiveClick = (e, status) => {
    e.preventDefault();
    if (status !== 'Canceled' && window.confirm('Are you sure you want to receive this pet?')) {
      window.location.href = 'pet-exam-record'; // Redirect to the specified page	  
    }
	else if(status ==='Done'){
		
	}
  };

  return (
    <div>
      <Header />
      <div>
        <div>
          <p className='tittle'> Today's Work Schedule</p>
        </div>
        <div className='ver-container'>
          <p className='ver-id'>Veterinarian ID: 001</p>
          <p className='ver-name'>Vet. MINH</p>
        </div>
      </div>
      <div>
        <div className='date-work'>
          Date's work schedule: <input type='date' name='date' />
        </div>
        <div className='table-schedule' id='tables'>
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
                {rows.map(row => (
                  <tr key={row.id}>
                    <td className='td_table-schedule'>{row.id}</td>
                    <td className='td_table-schedule'>{row.petId}</td>
                    <td className='td_table-schedule'>{row.petType}</td>
                    <td className='td_table-schedule'>{row.gender}</td>
                    <td className='td_table-schedule'>{row.registerHour}</td>
                    <td className='td_table-schedule'>{row.petOwner}</td>
                    <td className={`td_table-schedule doctor-status-${row.status.toLowerCase()}`}>{row.status}</td>
                    <td className='td_table-schedule'>
                      <div className='td_table-schedule-btn-center'>
                        <a href='pet-exam-record'
                          className={`click-button ${row.status === 'Canceled' ? 'gray-button' : ''}`}
                          onClick={(e) => handleReceiveClick(e, row.status)}
                          style={{ pointerEvents: row.status === 'Canceled' ? 'none' : 'auto' }}>
                          Receive
                        </a>
                        {row.status !== 'Canceled' && (
                          <a href='pet-exam-record'
                            className='cancel-booking-button'
                            onClick={(e) => handleCancelClick(e, row.id)}>
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
				<p class="final-petExam">----------Today's working hour start at 9:00 a.m and end at 18:00 p.m----------</p>
    </div>
  );
}

export default WorkSchedule;
