import React, { useState } from 'react';
import { format, startOfWeek, addDays, eachDayOfInterval, endOfMonth, eachWeekOfInterval, startOfMonth, endOfWeek, parseISO } from 'date-fns';
import './TimeTableWork.css';

const Calendar = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [scheduleType, setScheduleType] = useState('Day');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [schedule, setSchedule] = useState({});
  const [daySchedule, setDaySchedule] = useState({});

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
    setSelectedMonth(null);
    setSelectedWeek(null);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
    setSelectedWeek(null);
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(parseISO(event.target.value));
    const start = startOfWeek(parseISO(event.target.value), { weekStartsOn: 1 });
    const end = addDays(start, 6);
    const days = eachDayOfInterval({ start, end });

    const newSchedule = { ...schedule };
    days.forEach(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      if (scheduleType === 'Week' || (scheduleType === 'Day' && !newSchedule[dayKey])) {
        newSchedule[dayKey] = '8:00 - 17:00';
      }
    });

    setSchedule(newSchedule);
  };

  const handleDayClick = (day) => {
    if (scheduleType === 'Day') {
      setSelectedDay(day);
      setStartTime(schedule[format(day, 'yyyy-MM-dd')].split(' - ')[0]);
      setEndTime(schedule[format(day, 'yyyy-MM-dd')].split(' - ')[1]);
      // Mở modal
      document.getElementById('timeModalButton').click();
    }
  };

  const handleSave = () => {
    const formattedDay = format(selectedDay, 'yyyy-MM-dd');
    if (startTime && endTime && parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0]) >= 1) {
      const updatedSchedule = { ...schedule, [formattedDay]: `${startTime} - ${endTime}` };
      setSchedule(updatedSchedule);
      setDaySchedule(updatedSchedule);
      // Đóng modal
      document.querySelector('#timeModal .btn-close').click();
    } else {
      alert("Please select valid start and end times. End time must be at least 1 hour after start time.");
    }
  };

  const handleScheduleTypeChange = (type) => {
    if (type === 'Day') {
      setSchedule(daySchedule);
    } else if (type === 'Week') {
      setDaySchedule(schedule); // Lưu lại lịch biểu của chế độ Day trước khi chuyển đổi
      setSchedule({});
    } else if (type === 'Full Day') {
      const updatedSchedule = {};
      Object.keys(schedule).forEach(day => {
        updatedSchedule[day] = '8:00 - 17:00';
      });
      setSchedule(updatedSchedule);
    }
    setScheduleType(type);
  };

  const generateTimeOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={`${i < 10 ? '0' + i : i}:00`}>{`${i < 10 ? '0' + i : i}:00`}</option>
      );
    }
    return options;
  };

  const handleStartTimeChange = (event) => {
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
      <option key={year} value={year}>{year}</option>
    ));
  };

  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    return months.map(month => (
      <option key={month} value={month}>{format(new Date(selectedYear, month - 1), 'MMMM')}</option>
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
        <option key={weekStart} value={weekStart.toISOString()}>
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
      <li key={day.toISOString()} onClick={() => handleDayClick(day)} className={scheduleType === 'Full Day' ? 'disabled' : ''}>
        <time dateTime={day.toISOString()}>{format(day, 'd')}</time> {format(day, 'EEEE')}
        <div className='time-doctor-choose'>{schedule[format(day, 'yyyy-MM-dd')] || 'No schedule'}</div>
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
    <div className="calendar-doctor-container">
      <div className="sidebar-calendar">
        <h2>Work by:</h2>
        <ul>
          <li
            className={scheduleType === 'Day' ? 'active' : ''}
            onClick={() => handleScheduleTypeChange('Day')}
          >
            Part Time
          </li>
          <li
            className={scheduleType === 'Week' ? 'active' : ''}
            onClick={() => handleScheduleTypeChange('Week')}
          >
            Full Time
          </li>
         
        </ul>
      </div>
      <div className="calendar-work-doctor">
        <h1>Hello Doctor !</h1>
        <div className='calender-work-doctor-content-select'>
          <label htmlFor="year">Select Year: </label>
          <select id="year" value={selectedYear} onChange={handleYearChange}>
            {renderYears()}
          </select>
        </div>
        {selectedYear && (
          <div className='calender-work-doctor-content-select'>
            <label htmlFor="month">Select Month: </label>
            <select id="month" value={selectedMonth || ''} onChange={handleMonthChange}>
              <option value="">Select a month</option>
              {renderMonths()}
            </select>
          </div>
        )}
        {selectedMonth && (
          <div className='calender-work-doctor-content-select'>
            <label htmlFor="week">Select Week: </label>
            <select id="week" value={selectedWeek || ''} onChange={handleWeekChange}>
              <option value="">Select a week</option>
              {renderWeeks()}
            </select>
          </div>
        )}
        {selectedWeek && (
          <div className="selected-week">
            <h2 className='calender-work-doctor-content-select-week'>
              Selected Week: <span className="selected-week-content">{renderSelectedWeek()}</span>
            </h2>
            <ul>
              {renderDays()}
            </ul>
          </div>
        )}
      </div>
      {/* Bootstrap Modal Trigger */}
      <button id="timeModalButton" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#timeModal" style={{ display: 'none' }}>
        Open Modal
      </button>
      {/* Bootstrap Modal */}
      <div className="modal fade" id="timeModal" tabIndex="-1" aria-labelledby="timeModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="timeModalLabel">Set Work Hours</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Start Time</label>
                <select className="form-control" value={startTime} onChange={handleStartTimeChange}>
                  <option value="">Select start time</option>
                  {generateTimeOptions(8, 16)} {/* 8:00 AM to 4:00 PM */}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">End Time</label>
                <select className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={!startTime}>
                  <option value="">Select end time</option>
                  {generateTimeOptions(9, 17).filter(time => !startTime || parseInt(time.props.value.split(':')[0]) > parseInt(startTime.split(':')[0]))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSave} disabled={!startTime || !endTime}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
