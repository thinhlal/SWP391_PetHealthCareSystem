import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PetStatus.css';
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';
import axiosInstance from '../../utils/axiosInstance';

function PetStatus() {
  const location = useLocation();
  const { petData, user } = location.state || {};

  const [statusData, setStatusData] = useState([]);

  const [detailData, setDetailData] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');

  const handleViewDetails = diseaseInfos => {
    setDetailData(diseaseInfos);
  };

  const handleCloseDetails = () => {
    setDetailData([]);
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
                {sortedStatusData.length > 0 ? (
                  sortedStatusData.map((status, index) => (
                    <tr key={index}>
                      <td>{status?.bookingID}</td>
                      <td>{status?.startDate.split('T')[0]}</td>
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
                          ? status.dischargeDate.split('T')[0]
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
          </div>

          {detailData.length > 0 && (
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
                  {detailData.map(detail => (
                    <tr key={detail.diseaseInfoID}>
                      <td>{`${detail.date.split('T')[0]} ${detail.date.split('T')[1].split('.')[0]}`}</td>
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
                  ))}
                </tbody>
              </table>
              <button
                className='close-detail-button'
                onClick={handleCloseDetails}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PetStatus;
