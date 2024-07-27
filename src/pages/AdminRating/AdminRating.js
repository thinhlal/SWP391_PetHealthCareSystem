//css
import './AdminRating.css';
//React
import React, { useEffect, useState } from 'react';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
//Components
import Header from '../../components/Admin/Header/Header';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//images
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import icon_search from '../../assets/images/img_AdminCages/icon_search.svg';

import Statistic from '../../components/Admin/Statistics/Statistics';
import axiosInstance from '../../utils/axiosInstance';
import StarRate from '../../components/Admin/StarRate/StarRate';
function AdminRating() {
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [ratingData, setRatingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/admin/getAllRates`,
        );
        const sortDate = response.data.sort((a, b) =>
          b.date.localeCompare(a.date),
        );
        console.log(sortDate);
        setRatingData(sortDate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRate();
  }, []);

  const handleRatingFilterChange = event => {
    setRatingFilter(event.target.value);
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const filteredRateData = ratingData.filter(rating => {
    const matchesStatus =
      ratingFilter === 'All' || rating.rate.toString() === ratingFilter;
    const matchesSearch =
      search === '' ||
      rating.bookingID.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRates = filteredRateData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(filteredRateData.length / itemsPerPage);

  return (
    <div className='Admin-Rating container-fluid'>
      <div className='row'>
        <Header />
        <div className='Admin-Rating-Content row'>
          <div className='Admin-Rating-Navigate col-md-2'>
            <Sidebar />
          </div>
          <div className='Admin-Rating-Main col-md-10'>
            <Statistic />
            <div className='Admin-Rating-Main-Table-Wrapper'>
              <div className='Admin-Rating-Main-Table'>
                <div className='Admin-Rating-Main-Table-Title'>Rating List</div>
                <div className='Admin-Rating-Main-Table-Title-Text'>
                  Rating Information
                </div>
                <div className='Admin-Rating-Main-Filter'>
                  <div className='Admin-Rating-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Booking ID'
                      className='Admin-Rating-Main-Search-Input'
                      value={search}
                      onChange={handleSearchChange}
                    />
                    <button className='Admin-Rating-Main-Search-Button'>
                      {' '}
                      <img
                        src={icon_search}
                        alt=''
                      />{' '}
                    </button>
                  </div>
                  <div className='Admin-Rating-Select-rate'>
                    <FilterAltIcon sx={{ fontSize: 20 }} />
                    Select rating:
                    <select
                      className='Admin-Rating-Select-Filter'
                      name='rate'
                      value={ratingFilter}
                      onChange={handleRatingFilterChange}
                    >
                      <option>All</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>

                <div className='Admin-Rating-Main-Table-Header'>
                  <div className='Admin-Rating-Main-Table-Header-Title '>
                    BookingID
                  </div>
                  <div className='Admin-Rating-Main-Table-Header-Title '>
                    Date
                  </div>
                  <div className='Admin-Rating-Main-Table-Header-Title '>
                    Rating star
                  </div>
                  <div className='Admin-Rating-Main-Table-Header-Title '>
                    Comment
                  </div>
                </div>
                {currentRates.length > 0 ? (
                  currentRates.map(item => (
                    <div
                      className='Admin-Rating-Main-Table-Content-Row-Wrapper'
                      key={item.rateID}
                    >
                      <div className='Admin-Rating-Main-Table-Content-Row '>
                        {item.bookingID}
                      </div>
                      <div className='Admin-Rating-Main-Table-Content-Row '>
                        {new Date(item.date).toLocaleString()}
                      </div>
                      <div className='Admin-Rating-Main-Table-Content-Row '>
                        <StarRate
                          rating={item.rate}
                          totalStars={5}
                        />
                      </div>
                      <div className='Admin-Rating-Main-Table-Content-Row '>
                        {item.comment}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='admin-no-content-available'>
                    No Content Available
                  </div>
                )}

                <div className='Admin-Rating-Pagination'>
                  {currentRates.length > 0 && totalPages > 1 && (
                    <Stack
                      spacing={2}
                      marginTop={2}
                      alignItems='center'
                    >
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color='primary'
                      />
                    </Stack>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRating;
