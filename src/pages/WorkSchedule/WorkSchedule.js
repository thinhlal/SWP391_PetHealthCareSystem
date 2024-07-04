import React, { useContext, useState, useEffect } from 'react';
import './WorkSchedule.css';
import Header from '../../components/Doctor/Header/Header.js';
import ConfirmationModal from '../../components/Confirm-Cancel/ConfirmationModal.js'; // Adjust the path as needed
import { AuthContext } from '../../context/AuthContext.js';
import axiosInstance from '../../utils/axiosInstance.js'; // Ensure this is configured properly

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
  const [schedules, setSchedules] = useState({});

  const fetchWorkSchedule = async (doctorID, date) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/doctor/schedules`,
        {
          params: {
            doctorID,
            date,
          },
        },
      );
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching work schedule:', error);
    }
  };

  useEffect(() => {
    if (user?.doctorDetails[0]?.doctorID) {
      fetchWorkSchedule(user.doctorDetails[0].doctorID, selectedDate);
    }
  }, [user, selectedDate]);

  const handleDateChange = e => {
    setSelectedDate(e.target.value);
  };

  const handleReceiveClick = (e, status) => {
    e.preventDefault();
    if (status !== 'Canceled') {
      setModalMessage('Are you sure you want to receive this pet?');
      setModalAction(() => () => (window.location.href = 'pet-exam-record'));
      setShowModal(true);
    }
  };
  console.log(schedules);
  const sortedBookings = schedules?.matchingBookings
    ?.filter(
      schedule =>
        !schedule?.isCancel && !schedule?.paymentDetails?.isCancelPayment,
    )
    ?.sort((a, b) => {
      const timeA = a.startTime || '';
      const timeB = b.startTime || '';
      return timeA.localeCompare(timeB);
    });

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
                  <th className='th_table-schedule'>BookingID</th>
                  <th className='th_table-schedule'>Pet ID</th>
                  <th className='th_table-schedule'>Pet Type</th>
                  <th className='th_table-schedule'>Gender</th>
                  <th className='th_table-schedule'>Register hour</th>
                  <th className='th_table-schedule'>Pet Owner</th>
                  <th className='th_table-schedule'>Status</th>
                  <th
                    className='th_table-schedule'
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(schedules).length !== 0 ? (
                  schedules?.workingHoursDetails.length === 0 ? (
                    <tr>
                      <td
                        colSpan='8'
                        className='td_table-schedule select-timeWorking'
                      >
                        No working time data available. Please Select Time to
                        Work
                      </td>
                    </tr>
                  ) : schedules?.workingHoursDetails[0]?.isOff ? (
                    <tr>
                      <td
                        colSpan='8'
                        className='td_table-schedule off-day-red'
                      >
                        Off this day
                      </td>
                    </tr>
                  ) : sortedBookings?.length ? (
                    sortedBookings.map(schedule => (
                      <tr key={schedule.bookingID}>
                        <td className='td_table-schedule'>
                          {schedule.bookingID}
                        </td>
                        <td className='td_table-schedule'>{schedule?.petID}</td>
                        <td className='td_table-schedule'>
                          {schedule?.petDetails?.petType}
                        </td>
                        <td className='td_table-schedule'>
                          {schedule?.petDetails?.gender}
                        </td>
                        <td className='td_table-schedule'>{`${schedule?.startTime} - ${schedule?.endTime}`}</td>
                        <td className='td_table-schedule'>
                          {schedule?.customerDetails?.name}
                        </td>
                        <td
                          className={`td_table-schedule doctor-status-${schedule?.isCheckIn ? 'done' : 'pending'}`}
                        >
                          {schedule?.isCheckIn ? (
                            <span>Check In</span>
                          ) : (
                            <span>Not Check In</span>
                          )}
                        </td>
                        {schedule?.isCheckIn ? (
                          <td className='td_table-schedule'>
                            <div className='td_table-schedule-btn-center'>
                              <a
                                href='pet-exam-record'
                                className={`click-button ${schedule?.status === 'Canceled' ? 'gray-button' : ''}`}
                                onClick={e =>
                                  handleReceiveClick(e, schedule?.status)
                                }
                                style={{
                                  pointerEvents:
                                    schedule?.status === 'Canceled'
                                      ? 'none'
                                      : 'auto',
                                }}
                              >
                                Receive
                              </a>
                            </div>
                          </td>
                        ) : (
                          <td className='td_table-schedule'>
                            <div className='td_table-schedule-btn-center'>
                              Check In first
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan='8'
                        className='td_table-schedule'
                      >
                        No booking this day
                      </td>
                    </tr>
                  )
                ) : null}
              </tbody>
            </table>
          </form>
        </div>
      </div>
      {Object.keys(schedules).length !== 0 ? (
        schedules?.workingHoursDetails.length !== 0 ? (
          schedules?.workingHoursDetails[0].isOff ? (
            <p className='off-day-red final-petExam'>Off This Day</p>
          ) : (
            <p className='final-petExam'>
              --Today's working hour start at{' '}
              {schedules?.workingHoursDetails[0]?.startTime} a.m and end at{' '}
              {schedules?.workingHoursDetails[0]?.endTime} p.m--
            </p>
          )
        ) : (
          <p className='final-petExam select-timeWorking'>
            No working time data available. Please Select Time to Work
          </p>
        )
      ) : null}
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
