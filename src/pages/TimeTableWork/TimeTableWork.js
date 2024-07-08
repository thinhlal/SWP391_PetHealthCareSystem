import React, { useContext, useEffect, useState } from 'react';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import {
  format,
  startOfWeek,
  addDays,
  eachDayOfInterval,
  endOfMonth,
  eachWeekOfInterval,
  startOfMonth,
  endOfWeek,
  parseISO,
} from 'date-fns';
import './TimeTableWork.css';
import axiosInstance from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Doctor/Header/Header';

const Calendar = () => {
  const { user } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [showWeekSelected, setShowWeekSelected] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [schedule, setSchedule] = useState({});
  const [isHoliday, setIsHoliday] = useState(false);

  const reRenderSchedule = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/doctor/getTimeWork`,
        {
          params: { doctorID: user.doctorDetails[0].doctorID },
        },
      );
      const scheduleData = response.data.reduce((acc, cur) => {
        const dayKey = format(new Date(cur.date), 'yyyy-MM-dd');
        if (cur.isOff) {
          acc[dayKey] = 'Holiday';
        } else {
          acc[dayKey] = `${cur.startTime} - ${cur.endTime}`;
        }
        return acc;
      }, {});
      setSchedule(scheduleData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/doctor/getTimeWork`,
          {
            params: { doctorID: user.doctorDetails[0].doctorID },
          },
        );
        const scheduleData = response.data.reduce((acc, cur) => {
          const dayKey = format(new Date(cur.date), 'yyyy-MM-dd');
          if (cur.isOff) {
            acc[dayKey] = 'Holiday';
          } else {
            acc[dayKey] = `${cur.startTime} - ${cur.endTime}`;
          }
          return acc;
        }, {});
        setSchedule(scheduleData);
      } catch (error) {
        console.error(error);
      }
    };
    loadSchedule();
  }, [user.doctorDetails]);

  const handleYearChange = event => {
    setSelectedYear(parseInt(event.target.value));
    setSelectedMonth(null);
    setSelectedWeek(null);
  };

  const handleMonthChange = event => {
    setSelectedMonth(parseInt(event.target.value));
    setSelectedWeek(null);
  };

  const handleWeekChange = event => {
    const [startStr, endStr] = event.target.value.split(' - ');
    const weekStart = parseISO(startStr);
    const weekEnd = parseISO(endStr);
    setSelectedWeek(weekStart);
    setShowWeekSelected(event.target.value);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    const newSchedule = { ...schedule };

    days.forEach(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      if (!newSchedule[dayKey]) {
        newSchedule[dayKey] = 'Select Time';
      }
    });

    setSchedule(newSchedule);
  };

  const handleDayClick = day => {
    setSelectedDay(day);
    const dayKey = format(day, 'yyyy-MM-dd');
    if (schedule[dayKey] && schedule[dayKey] !== 'Holiday') {
      const [start, end] = schedule[dayKey].split(' - ');
      setStartTime(start);
      setEndTime(end);
    } else {
      setStartTime('08:00');
      setEndTime('17:00');
    }
    setIsHoliday(schedule[dayKey] === 'Holiday');
    document.getElementById('timeModalButton').click();
  };

  const handleSave = async () => {
    const formattedDay = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : null;
    if (
      formattedDay &&
      (isHoliday ||
        (startTime &&
          endTime &&
          parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0]) >=
            1))
    ) {
      try {
        await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/doctor/addTimeWork`,
          {
            doctorID: user.doctorDetails[0].doctorID,
            date: formattedDay,
            startTime: isHoliday ? null : startTime,
            endTime: isHoliday ? null : endTime,
            isOff: isHoliday,
          },
        );
        reRenderSchedule();
      } catch (error) {
        console.error(error);
      }
    }
    document.querySelector('#timeModal .btn-close').click();
  };

  const handleHolidayToggle = () => {
    setIsHoliday(!isHoliday);
  };

  const generateTimeOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option
          key={i}
          value={`${i < 10 ? '0' + i : i}:00`}
        >{`${i < 10 ? '0' + i : i}:00`}</option>,
      );
    }
    return options;
  };

  const handleStartTimeChange = event => {
    const newStartTime = event.target.value;
    setStartTime(newStartTime);
    const endHour = parseInt(newStartTime.split(':')[0]) + 1;
    setEndTime(`${endHour < 10 ? '0' + endHour : endHour}:00`);
  };

  const renderYears = () => {
    const years = [];
    for (let i = selectedYear - 10; i <= selectedYear + 10; i++) {
      years.push(i);
    }
    return years.map(year => (
      <option
        key={year}
        value={year}
      >
        {year}
      </option>
    ));
  };

  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    return months.map(month => (
      <option
        key={month}
        value={month}
      >
        {format(new Date(selectedYear, month - 1), 'MMMM')}
      </option>
    ));
  };

  const renderWeeks = () => {
    if (selectedMonth === null) return null;
    const start = startOfMonth(new Date(selectedYear, selectedMonth - 1));
    const end = endOfMonth(start);
    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
    return weeks.map(weekStart => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      return (
        <option
          key={weekStart}
          value={`${format(weekStart, 'yyyy-MM-dd')} - ${format(weekEnd, 'yyyy-MM-dd')}`}
        >
          {`${format(weekStart, 'dd/MM/yyyy')} - ${format(weekEnd, 'dd/MM/yyyy')}`}
        </option>
      );
    });
  };
  const renderDays = () => {
    if (selectedWeek === null) return null;
    const start = startOfWeek(selectedWeek, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    const days = eachDayOfInterval({ start, end });
    return days.map(day => (
      <li
        key={day.toISOString()}
        onClick={() => handleDayClick(day)}
        className={'Full Day'}
      >
        <time dateTime={day.toISOString()}>{format(day, 'd')}</time>{' '}
        {format(day, 'EEEE')}
        <div
          className={`${
            schedule[format(day, 'yyyy-MM-dd')] === 'Holiday'
              ? 'time-doctor-choose-holiday'
              : schedule[format(day, 'yyyy-MM-dd')] !== 'Select Time'
                ? 'time-doctor-choose'
                : 'time-doctor-choose-selectTime'
          }`}
        >
          {schedule[format(day, 'yyyy-MM-dd')] === 'Holiday'
            ? 'Holiday'
            : schedule[format(day, 'yyyy-MM-dd')] || 'Select Time'}
          {schedule[format(day, 'yyyy-MM-dd')] === 'Holiday' ? (
            <WorkOffIcon sx={{ fontSize: 18 }} />
          ) : null}
        </div>
      </li>
    ));
  };

  const renderSelectedWeek = () => {
    if (selectedWeek === null) return null;
    const start = startOfWeek(selectedWeek, { weekStartsOn: 1 });
    const end = endOfWeek(start, { weekStartsOn: 1 });
    return `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`;
  };
  return (
    <div className='calendar-doctor-container'>
      <Header />
      <div className='calendar-doctor-main-content'>
        <div className='calendar-work-doctor'>
          <h1>Welcome {user.doctorDetails[0].name}!</h1>
          <div className='calender-work-doctor-content-select'>
            <label htmlFor='year'>Select Year: </label>
            <select
              id='year'
              value={selectedYear}
              onChange={handleYearChange}
            >
              {renderYears()}
            </select>
          </div>
          {selectedYear && (
            <div className='calender-work-doctor-content-select'>
              <label htmlFor='month'>Select Month: </label>
              <select
                id='month'
                value={selectedMonth || ''}
                onChange={handleMonthChange}
              >
                <option value=''>Select a month</option>
                {renderMonths()}
              </select>
            </div>
          )}
          {selectedMonth && (
            <div className='calender-work-doctor-content-select'>
              <label htmlFor='week'>Select Week: </label>
              <select
                id='week'
                value={showWeekSelected || ''}
                onChange={handleWeekChange}
              >
                <option
                  value=''
                  hidden
                >
                  Select a week
                </option>
                {renderWeeks()}
              </select>
            </div>
          )}
          {selectedWeek && (
            <div className='selected-week'>
              <h2 className='calender-work-doctor-content-select-week'>
                <span>Selected Week: </span>
                <span className='selected-week-content'>
                  {renderSelectedWeek()}
                </span>
              </h2>
              <ul>{renderDays()}</ul>
            </div>
          )}
        </div>
        <button
          id='timeModalButton'
          type='button'
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#timeModal'
          style={{ display: 'none' }}
        >
          Open Modal
        </button>
        <div
          className='modal fade'
          id='timeModal'
          tabIndex='-1'
          aria-labelledby='timeModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5
                  className='modal-title'
                  id='timeModalLabel'
                >
                  Set Work Hours
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                {!isHoliday && (
                  <>
                    <div className='mb-3'>
                      <label className='form-label'>Start Time</label>
                      <select
                        className='form-control'
                        value={startTime}
                        onChange={handleStartTimeChange}
                      >
                        <option value=''>Select start time</option>
                        {generateTimeOptions(8, 16)}
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>End Time</label>
                      <select
                        className='form-control'
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        disabled={!startTime}
                      >
                        <option value=''>Select end time</option>
                        {generateTimeOptions(9, 17).filter(
                          time =>
                            !startTime ||
                            parseInt(time.props.value.split(':')[0]) >
                              parseInt(startTime.split(':')[0]),
                        )}
                      </select>
                    </div>
                  </>
                )}
                <div className='mb-3'>
                  <label className='form-label'>Holiday</label>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      checked={isHoliday}
                      onChange={handleHolidayToggle}
                    />
                    <label className='form-check-label'>Mark as Holiday</label>
                  </div>
                </div>
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
                  data-bs-dismiss='modal'
                  onClick={handleSave}
                  disabled={!startTime || !endTime}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
