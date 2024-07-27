import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PetStatus.css';
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';
import axiosInstance from '../../utils/axiosInstance';
import { Pagination, Stack } from '@mui/material';

function PetStatus() {
  const location = useLocation();
  const { petData, user } = location.state || {};

  const [statusData, setStatusData] = useState([]);

  const [detailData, setDetailData] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [isViewDetails, setIsViewDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [currentPageDetails, setCurrentPageDetails] = useState(1);
  const itemsPerPageDetails = 5;

  const handleViewDetails = diseaseInfos => {
    setIsViewDetails(true);
    setDetailData(diseaseInfos);
  };

  const handleCloseDetails = () => {
    setDetailData([]);
    setIsViewDetails(false);
  };

  useEffect(() => {
    const fetchDiseaseOfPet = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/pet/getAllCageDiseases/`,
        {
          params: {
            petID: petData.petID,
          },
        },
      );
      setStatusData(response.data);
    };
    fetchDiseaseOfPet();
  }, [petData.petID]);

  const handleSortChange = order => {
    setSortOrder(order);
  };

  const sortedStatusData = [...statusData].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handlePageChangeDetails = (event, value) => {
    setCurrentPageDetails(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDisease = sortedStatusData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(sortedStatusData.length / itemsPerPage);

  const startIndexDetails = (currentPageDetails - 1) * itemsPerPageDetails;
  const currentDiseaseDetails = detailData.slice(
    startIndexDetails,
    startIndexDetails + itemsPerPageDetails,
  );
  const totalPagesDetails = Math.ceil(detailData.length / itemsPerPageDetails);

  return (
    <div className='main-container-pet-status-history'>
      <Header />
      <div className='container-pet-status-history'>
        <div className='sidebar-pet-status'>
          <div className='pet-avatar'>
            <img
              src={petData?.image}
              alt='Pet Avatar'
            />
          </div>
          <div className='pet-parent'>
            <div className='sub-title-info-pet'>
              <strong>Pet Parent</strong>{' '}
            </div>
            <div className='customer-name-title'>
              {user?.customerDetails[0].name}
            </div>
            <div className='sub-title-info-pet'>
              <strong>ID:&nbsp;</strong>{' '}
              <span className='ID-pet-profile'>{petData?.petID}</span>
            </div>
          </div>
        </div>
        <div className='pet-status-details-history'>
          <h2 className='sub-title-info-pet-history'>Cage Entry History</h2>
          <div className='filter-container'>
            <label>Sort by: </label>
            <select
              onChange={e => handleSortChange(e.target.value)}
              value={sortOrder}
            >
              <option value='newest'>Newest</option>
              <option value='oldest'>Oldest</option>
            </select>
          </div>
          <div className='pet-status-summary-table'>
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Entry Date</th>
                  <th>Doctor</th>
                  <th>Reason for Entry</th>
                  <th>Status</th>
                  <th>Exit Date</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {currentDisease.length > 0 ? (
                  currentDisease.map((status, index) => (
                    <tr key={index}>
                      <td>{status?.bookingID}</td>
                      <td>{new Date(status?.startDate).toLocaleString()}</td>
                      <td>{status?.doctorDetails[0]?.name}</td>
                      <td>{status?.reasonForAdmission}</td>
                      <td
                        className={
                          status?.isRecover === false
                            ? 'status-in-cage'
                            : 'status-exited-cage'
                        }
                      >
                        {status.isRecover ? 'Exited' : 'In cage'}
                      </td>
                      <td>
                        {status.isRecover
                          ? new Date(status.dischargeDate).toLocaleString()
                          : ''}
                      </td>
                      <td>
                        <button
                          className='view-detail-button'
                          onClick={() => handleViewDetails(status.diseaseInfos)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
            {currentDisease.length > 0 && totalPages > 1 && (
              <Stack
                spacing={2}
                alignItems='center'
                marginTop={3}
                marginBottom={1}
                padding={0}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color='primary'
                  size='small'
                />
              </Stack>
            )}
          </div>

          {isViewDetails ? (
            <div className='pet-status-detail-table'>
              <h2 className='sub-title-info-pet-history'>Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Current Status</th>
                    <th>Doctor's Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDiseaseDetails.length > 0 ? (
                    currentDiseaseDetails.map(detail => (
                      <tr key={detail.diseaseInfoID}>
                        <td>{new Date(detail.date).toLocaleString()}</td>
                        <td
                          className={`status-${
                            detail.status === 1
                              ? 'critical'
                              : detail.status === 2
                                ? 'mild'
                                : detail.status === 3
                                  ? 'moderate'
                                  : detail.status === 4
                                    ? 'severe'
                                    : 'healthy'
                          }`}
                        >
                          {detail.status === 1
                            ? 'Critical'
                            : detail.status === 2
                              ? 'Mild'
                              : detail.status === 3
                                ? 'Moderate'
                                : detail.status === 4
                                  ? 'Severe'
                                  : 'Healthy'}
                        </td>
                        <td>{detail.notes}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {currentDisease.length > 0 && totalPagesDetails > 1 && (
                <Stack
                  spacing={2}
                  alignItems='center'
                  marginTop={2}
                  padding={0}
                >
                  <Pagination
                    count={totalPagesDetails}
                    page={currentPageDetails}
                    onChange={handlePageChangeDetails}
                    color='primary'
                    size='small'
                  />
                </Stack>
              )}
              <button
                className='close-detail-button'
                onClick={handleCloseDetails}
              >
                Close
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PetStatus;
