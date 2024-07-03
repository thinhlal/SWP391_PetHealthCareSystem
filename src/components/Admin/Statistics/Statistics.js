import './Statistics.css';
import React, { useState, useEffect, useMemo } from 'react';

function Statistic() {
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredRevenueData, setFilteredRevenueData] = useState(null);
  const [yesterdayRevenueData, setYesterdayRevenueData] = useState(null);

  const dailyRevenueData = useMemo(
    () => [
      {
        id: 1,
        date: '2024-06-21',
        money: 1200,
      },
      {
        id: 2,
        date: '2024-06-22',
        money: 1500,
      },
      {
        id: 3,
        date: '2024-06-23',
        money: 1600,
      },
      {
        id: 4,
        date: '2024-06-24',
        money: 1200,
      },
      {
        id: 5,
        date: '2024-06-25',
        money: 1800,
      },
    ],
    [],
  );

  const handleDateChange = event => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setSelectedDate(formattedDate);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filteredData = dailyRevenueData.find(
        daily => daily.date === selectedDate,
      );
      setFilteredRevenueData(filteredData);

      const yesterday = new Date(
        new Date(selectedDate).setDate(new Date(selectedDate).getDate() - 1),
      )
        .toISOString()
        .substr(0, 10);
      const yesterdayData = dailyRevenueData.find(
        daily => daily.date === yesterday,
      );
      setYesterdayRevenueData(yesterdayData);
    }
  }, [selectedDate, dailyRevenueData]);

  const calculatePercentChange = () => {
    if (filteredRevenueData && yesterdayRevenueData) {
      const change =
        ((filteredRevenueData.money - yesterdayRevenueData.money) /
          yesterdayRevenueData.money) *
        100;
      return change.toFixed(2);
    }
    return null;
  };

  return (
    <div className='main-statistic'>
      <div className='Admin-DashBoard-Main_Title'>
        <div className='Admin-DashBoard-Main_Title-Left'>
          <h2 className='Admin-DashBoard-Main_Title-Left-Intro'>
            Hi, welcome back!
          </h2>
          <p className='Admin-DashBoard-Main_Title-Left-text'>
            Pet Health Insurance Services Dashboard.
          </p>
        </div>
        <div className='Admin-DashBoard-Main_Title-Right'>
          <label className='Admin-DashBoard-title-Star'>Customer Ratings</label>
          <div className='Admin-DashBoard-Star'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='16'
              fill='#fbbc0b'
              className='bi bi-star-fill'
              viewBox='0 0 16 16'
            >
              <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='16'
              fill='#fbbc0b'
              className='bi bi-star-fill'
              viewBox='0 0 16 16'
            >
              <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='16'
              fill='#97a3b9'
              className='bi bi-star-fill'
              viewBox='0 0 16 16'
            >
              <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='16'
              fill='#97a3b9'
              className='bi bi-star-fill'
              viewBox='0 0 16 16'
            >
              <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='16'
              fill='#97a3b9'
              className='bi bi-star-fill'
              viewBox='0 0 16 16'
            >
              <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
            </svg>
            <span>(14.000)</span>
          </div>
        </div>
      </div>
      <div className='Admin-DashBoard-Main-ChooseDate'>
        <div className='Admin-DashBoard-Main-ChooseDate_Text'>Choose Date:</div>
        <input
          type='date'
          id='Admin-DashBoard-start'
          name='trip-start'
          onChange={handleDateChange}
          value={selectedDate}
          min='2018-01-01'
          max='2026-12-31'
        />
      </div>

      {filteredRevenueData ? (
        <div className='Admin-DashBoard-Main-Header row'>
          <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
            <div className='Admin-DashBoard-Main-Header-Note'>Daily income</div>
            <div className='Admin-DashBoard-Main-Header-Money'>
              {' '}
              ${filteredRevenueData.money}
            </div>
            <div className='Admin-DashBoard-Main-Header-Percent'>
              {calculatePercentChange()}% to the previous day
            </div>
          </div>
          <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
            <div className='Admin-DashBoard-Main-Header-Note'>
              Weekly income
            </div>
            <div className='Admin-DashBoard-Main-Header-Money'>$45,678.90</div>
            <div className='Admin-DashBoard-Main-Header-Percent'>
              +10% day over week
            </div>
          </div>

          <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
            <div className='Admin-DashBoard-Main-Header-Note'>
              Monthly income
            </div>
            <div className='Admin-DashBoard-Main-Header-Money'>$230,678.90</div>
            <div className='Admin-DashBoard-Main-Header-Percent'>
              +23% day over month
            </div>
          </div>
          <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
            <div className='Admin-DashBoard-Main-Header-Note'> Total </div>
            <div className='Admin-DashBoard-Main-Header-Money'>$5,678.90</div>
            <div className='Admin-DashBoard-Main-Header-Percent'>
              +20% day over day
            </div>
          </div>
        </div>
      ) : (
        <div className='Admin-DashBoard-No-Data'>No data for this date</div>
      )}
    </div>
  );
}

export default Statistic;
