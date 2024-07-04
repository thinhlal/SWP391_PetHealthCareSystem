import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PetStatus.css';
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';

function PetStatus() {
  const location = useLocation();
  const { petData, user } = location.state || {}; // Lấy dữ liệu từ state

  const [statusData] = useState([
    {
      bookingID: 'B001',
      entryDate: '2024-07-01',
      status: 'In Cage',
      doctor: 'Dr. John Doe',
      reason: 'Check-up',
      exitDate: '2024-07-05',
    },
    {
      bookingID: 'B002',
      entryDate: '2024-07-02',
      status: 'Exited Cage',
      doctor: 'Dr. Jane Smith',
      reason: 'Vaccination',
      exitDate: '2024-07-06',
    },
    {
      bookingID: 'B003',
      entryDate: '2024-07-03',
      status: 'In Cage',
      doctor: 'Dr. Emily Johnson',
      reason: 'Surgery',
      exitDate: '2024-07-10',
    },
    {
      bookingID: 'B004',
      entryDate: '2024-07-03',
      status: 'In Cage',
      doctor: 'Dr. Michael Brown',
      reason: 'Routine Check-up',
      exitDate: '2024-07-08',
    },
    {
      bookingID: 'B005',
      entryDate: '2024-07-03',
      status: 'In Cage',
      doctor: 'Dr. Linda Davis',
      reason: 'Injury Treatment',
      exitDate: '2024-07-09',
    },
    {
      bookingID: 'B006',
      entryDate: '2024-07-03',
      status: 'In Cage',
      doctor: 'Dr. William Wilson',
      reason: 'Dental Cleaning',
      exitDate: '2024-07-07',
    },
  ]);

  const [detailData, setDetailData] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');

  const handleViewDetails = bookingID => {
    const details = {
      B001: {
        bookingID: 'B001',
        currentStatus: 'Mild',
        doctorNotes: 'Check-up went smoothly, no issues found.',
      },
      B002: {
        bookingID: 'B002',
        currentStatus: 'Moderate',
        doctorNotes: 'Vaccination successful, no side effects.',
      },
      B003: {
        bookingID: 'B003',
        currentStatus: 'Critical',
        doctorNotes: 'Post-surgery monitoring required.',
      },
      B004: {
        bookingID: 'B004',
        currentStatus: 'Severe',
        doctorNotes: 'Routine check-up, minor issues found.',
      },
      B005: {
        bookingID: 'B005',
        currentStatus: 'Healthy',
        doctorNotes: 'Injury treatment ongoing, signs of recovery.',
      },
      B006: {
        bookingID: 'B006',
        currentStatus: 'Healthy',
        doctorNotes: 'Dental cleaning completed successfully.',
      },
    };

    setDetailData(details[bookingID]);
  };

  const handleCloseDetails = () => {
    setDetailData(null);
  };

  const handleSortChange = order => {
    setSortOrder(order);
  };

  const sortedStatusData = [...statusData].sort((a, b) => {
    const dateA = new Date(a.entryDate);
    const dateB = new Date(b.entryDate);
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
                {sortedStatusData.map((status, index) => (
                  <tr key={index}>
                    <td>{status.bookingID}</td>
                    <td>{status.entryDate}</td>
                    <td>{status.doctor}</td>
                    <td>{status.reason}</td>
                    <td
                      className={
                        status.status === 'In Cage'
                          ? 'status-in-cage'
                          : 'status-exited-cage'
                      }
                    >
                      {status.status}
                    </td>
                    <td>
                      {status.status === 'Exited Cage' ? status.exitDate : ''}
                    </td>
                    <td>
                      <button
                        className='view-detail-button'
                        onClick={() => handleViewDetails(status.bookingID)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {detailData && (
            <div className='pet-status-detail-table'>
              <h2 className='sub-title-info-pet-history'>Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Current Status</th>
                    <th>Doctor's Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{detailData.bookingID}</td>
                    <td
                      className={`status-${detailData.currentStatus.toLowerCase()}`}
                    >
                      {detailData.currentStatus}
                    </td>
                    <td>{detailData.doctorNotes}</td>
                  </tr>
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
