// Statistic.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance.js';
import StarRate from '../StarRate/StarRate';
import './Statistics.css';
import { useDate } from '../DateContext/DateContext';

function Statistic() {
  const { selectedDate, setSelectedDate } = useDate();
  const [previousTotalIncome, setPreviousTotalIncome] = useState(0);
  const [currentTotalIncome, setCurrentTotalIncome] = useState(0);
  const [previousWeeklyTotalIncome, setPreviousWeeklyTotalIncome] = useState(0);
  const [weeklyTotalIncome, setWeeklyTotalIncome] = useState(0);
  const [previousMonthlyTotalIncome, setPreviousMonthlyTotalIncome] =
    useState(0);
  const [currentMonthlyTotalIncome, setCurrentMonthlyTotalIncome] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  useEffect(() => {
    const updateDate = () => {
      const currentDate = new Date();
      const timezoneOffset = 7 * 60 * 60 * 1000;
      const localDate = new Date(currentDate.getTime() + timezoneOffset);
      const formattedDate = localDate.toISOString().split('T')[0];
      setSelectedDate(formattedDate);
    };

    if (!selectedDate) {
      updateDate();
    }

    const interval = setInterval(updateDate, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedDate, setSelectedDate]);

  const handleDateChange = event => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/admin/getRating`,
        );
        setRating(response.data.averageRate);
        setTotalReviews(response.data.totalReviews);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRating();
  }, []);

  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/admin/getTotalIncome`,
          { params: { date: selectedDate } },
        );
        setPreviousTotalIncome(response.data.previousTotalIncome);
        setCurrentTotalIncome(response.data.currentTotalIncome);
        setWeeklyTotalIncome(response.data.currentWeeklyTotalIncome);
        setPreviousWeeklyTotalIncome(response.data.previousWeeklyTotalIncome);
        setCurrentMonthlyTotalIncome(response.data.currentMonthlyTotalIncome);
        setPreviousMonthlyTotalIncome(response.data.previousMonthlyTotalIncome);
        setTotalIncome(response.data.totalIncome);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedDate) {
      fetchTotalIncome();
    }
  }, [selectedDate]);

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
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
          <StarRate
            rating={rating}
            totalStars={5}
            totalReviews={totalReviews}
          />
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
      <div className='Admin-DashBoard-Main-Header row'>
        <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
          <div className='Admin-DashBoard-Main-Header-Note'>Daily income</div>
          <div className='Admin-DashBoard-Main-Header-Money'>
            ${currentTotalIncome.toFixed(2)}
          </div>
          <div className='Admin-DashBoard-Main-Header-Percent'>
            {calculatePercentageChange(
              currentTotalIncome,
              previousTotalIncome,
            ).toFixed(2) > 0
              ? `+${calculatePercentageChange(currentTotalIncome, previousTotalIncome).toFixed(2)}`
              : calculatePercentageChange(
                  currentTotalIncome,
                  previousTotalIncome,
                ).toFixed(2)}
            % to the previous day
          </div>
        </div>
        <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
          <div className='Admin-DashBoard-Main-Header-Note'>Weekly income</div>
          <div className='Admin-DashBoard-Main-Header-Money'>
            ${weeklyTotalIncome.toFixed(2)}
          </div>
          <div className='Admin-DashBoard-Main-Header-Percent'>
            {calculatePercentageChange(
              weeklyTotalIncome,
              previousWeeklyTotalIncome,
            ).toFixed(2) > 0
              ? `+${calculatePercentageChange(weeklyTotalIncome, previousWeeklyTotalIncome).toFixed(2)}`
              : calculatePercentageChange(
                  weeklyTotalIncome,
                  previousWeeklyTotalIncome,
                ).toFixed(2)}
            % to the previous week
          </div>
        </div>
        <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
          <div className='Admin-DashBoard-Main-Header-Note'>Monthly income</div>
          <div className='Admin-DashBoard-Main-Header-Money'>
            ${currentMonthlyTotalIncome.toFixed(2)}
          </div>
          <div className='Admin-DashBoard-Main-Header-Percent'>
            {calculatePercentageChange(
              currentMonthlyTotalIncome,
              previousMonthlyTotalIncome,
            ).toFixed(2) > 0
              ? `+${calculatePercentageChange(currentMonthlyTotalIncome, previousMonthlyTotalIncome).toFixed(2)}`
              : calculatePercentageChange(
                  currentMonthlyTotalIncome,
                  previousMonthlyTotalIncome,
                ).toFixed(2)}
            % to previous month
          </div>
        </div>
        <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
          <div className='Admin-DashBoard-Main-Header-Note'>Total</div>
          <div className='Admin-DashBoard-Main-Header-Money'>
            ${totalIncome.toFixed(2)}
          </div>
          <div className='Admin-DashBoard-Main-Header-Percent'>
            Total income all time
          </div>
        </div>

        <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
          <div className='Admin-DashBoard-Main-Header-Note'>Total Booking</div>
          <div className='Admin-DashBoard-Main-Header-Money'>
            ${totalIncome.toFixed(2)}
          </div>
          <div className='Admin-DashBoard-Main-Header-Percent'>
            Total income all time
          </div>
        </div>

        <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
          <div className='Admin-DashBoard-Main-Header-Note'>Total</div>
          <div className='Admin-DashBoard-Main-Header-Money'>
            ${totalIncome.toFixed(2)}
          </div>
          <div className='Admin-DashBoard-Main-Header-Percent'>
            Total income all time
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistic;
