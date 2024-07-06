import React, { useState } from 'react';
import './DoctorCare.css';
import Pagination from '../../components/Pagination/Pagination';
import Header from '../../components/Doctor/Header/Header';

const DoctorCare = () => {
  const [statusData, setStatusData] = useState([
    {
      cageID: 'C001',
      cageName: 'Cage 1',
      petID: 'P001',
      entryDate: '2024-07-01',
      reasonForEntry: 'Surgery',
      status: 'In Cage',
      currentStatus: 'Healthy',
      exitDate: '',
      petDetails: {
        name: 'Buddy',
        breed: 'Golden Retriever',
        birthday: '2020-05-01',
        gender: 'Male',
        petType: 'Dog',
      },
      updateHistory: [],
    },
    {
      cageID: 'C002',
      cageName: 'Cage 2',
      petID: 'P002',
      entryDate: '2024-07-02',
      reasonForEntry: 'Vaccination',
      status: 'Exited Cage',
      currentStatus: 'Healthy',
      exitDate: '2024-07-05',
      petDetails: {
        name: 'Mittens',
        breed: 'Siamese Cat',
        birthday: '2019-03-15',
        gender: 'Female',
        petType: 'Cat',
      },
      updateHistory: [],
    },
    {
      cageID: 'C003',
      cageName: 'Cage 3',
      petID: 'P003',
      entryDate: '2024-07-03',
      reasonForEntry: 'Injury Treatment',
      status: 'In Cage',
      currentStatus: 'Mild',
      exitDate: '',
      petDetails: {
        name: 'Charlie',
        breed: 'Bulldog',
        birthday: '2018-11-22',
        gender: 'Male',
        petType: 'Dog',
      },
      updateHistory: [],
    },
    {
      cageID: 'C004',
      cageName: 'Cage 4',
      petID: 'P004',
      entryDate: '2024-07-04',
      reasonForEntry: 'Dental Cleaning',
      status: 'In Cage',
      currentStatus: 'Moderate',
      exitDate: '',
      petDetails: {
        name: 'Luna',
        breed: 'Persian Cat',
        birthday: '2021-01-08',
        gender: 'Female',
        petType: 'Cat',
      },
      updateHistory: [],
    },
    {
      cageID: 'C005',
      cageName: 'Cage 5',
      petID: 'P005',
      entryDate: '2024-07-05',
      reasonForEntry: 'Routine Check-up',
      status: 'In Cage',
      currentStatus: 'Severe',
      exitDate: '',
      petDetails: {
        name: 'Max',
        breed: 'Beagle',
        birthday: '2017-09-10',
        gender: 'Male',
        petType: 'Dog',
      },
      updateHistory: [],
    },
    // Add more data as needed
  ]);

  const [selectedPet, setSelectedPet] = useState(null);
  const [viewHistory, setViewHistory] = useState(false);
  const [filterOrder, setFilterOrder] = useState('newest');

  const handleUpdateStatus = status => {
    setSelectedPet({ ...status, newStatus: status.currentStatus, notes: '' });
    setViewHistory(false);
  };

  const handleSaveUpdate = () => {
    const newStatusData = statusData.map(item =>
      item.cageID === selectedPet.cageID
        ? {
            ...item,
            currentStatus: selectedPet.newStatus,
            updateHistory: [
              ...item.updateHistory,
              { date: new Date().toISOString().split('T')[0], status: selectedPet.newStatus, notes: selectedPet.notes },
            ],
          }
        : item
    );
    setStatusData(newStatusData);
    setSelectedPet(null);
  };

  const handleViewHistory = status => {
    setSelectedPet(status);
    setViewHistory(true);
  };

  const handleCloseHistory = () => {
    setSelectedPet(null);
    setViewHistory(false);
  };

  const handleFilterChange = event => {
    const order = event.target.value;
    setFilterOrder(order);
    const sortedData = [...statusData].sort((a, b) => {
      const dateA = new Date(a.entryDate);
      const dateB = new Date(b.entryDate);
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setStatusData(sortedData);
  };

  const handleDeleteHistory = index => {
    const updatedHistory = selectedPet.updateHistory.filter((_, i) => i !== index);
    const updatedPet = { ...selectedPet, updateHistory: updatedHistory };

    const newStatusData = statusData.map(item =>
      item.cageID === selectedPet.cageID ? updatedPet : item
    );

    setStatusData(newStatusData);
    setSelectedPet(updatedPet);
  };

  return (
    <div className='main-container-doctor-care'>
        <Header />
      <div className='container-cage-status'>
        <div className='filter-bar'>
          <label htmlFor='sort-order'>Sort by:</label>
          <select id='sort-order' value={filterOrder} onChange={handleFilterChange}>
            <option value='newest'>Newest</option>
            <option value='oldest'>Oldest</option>
          </select>
        </div>
        <div className='cage-status-summary-table'>
          <table>
            <thead>
              <tr>
                <th>Cage ID</th>
                <th>Cage Name</th>
                <th>Pet ID</th>
                <th>Entry Date</th>
                <th>Reason for Entry</th>
                <th>Status</th>
                <th>Current Status</th>
                <th>Exit Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {statusData.map((status, index) => (
                <tr key={index}>
                  <td>{status.cageID}</td>
                  <td>{status.cageName}</td>
                  <td>{status.petID}</td>
                  <td>{status.entryDate}</td>
                  <td>{status.reasonForEntry}</td>
                  <td>{status.status}</td>
                  <td>{status.currentStatus}</td>
                  <td>{status.exitDate}</td>
                  <td>
                    <button className='update-button' onClick={() => handleUpdateStatus(status)}>Update</button>
                    <button className='history-button' onClick={() => handleViewHistory(status)}>View Update History</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='pagination-container'>
            <Pagination />
          </div>
        </div>

        {selectedPet && !viewHistory && (
          <div className='update-section'>
            <h2>Pet Details</h2>
            <div className='pet-details'>
              <p><strong>Pet ID:</strong> {selectedPet.petID}</p>
              <p><strong>Name:</strong> {selectedPet.petDetails.name}</p>
              <p><strong>Breed:</strong> {selectedPet.petDetails.breed}</p>
              <p><strong>Birthday:</strong> {selectedPet.petDetails.birthday}</p>
              <p><strong>Gender:</strong> {selectedPet.petDetails.gender}</p>
              <p><strong>Pet Type:</strong> {selectedPet.petDetails.petType}</p>
            </div>

            <h2>Update Status</h2>
            <select
              value={selectedPet.newStatus}
              onChange={e => setSelectedPet({ ...selectedPet, newStatus: e.target.value })}
            >
              <option value=''>Select Status</option>
              <option value='Critical'>Critical</option>
              <option value='Mild'>Mild</option>
              <option value='Moderate'>Moderate</option>
              <option value='Severe'>Severe</option>
              <option value='Healthy'>Healthy</option>
            </select>
            <textarea
              value={selectedPet.notes}
              onChange={e => setSelectedPet({ ...selectedPet, notes: e.target.value })}
              placeholder='Enter notes here'
            ></textarea>
            <button onClick={handleSaveUpdate}>Save</button>
            <button onClick={() => setSelectedPet(null)}>Cancel</button>
          </div>
        )}

        {viewHistory && (
          <div className='history-section'>
            <h2>Update History</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedPet.updateHistory.map((history, index) => (
                  <tr key={index}>
                    <td>{history.date}</td>
                    <td>{history.status}</td>
                    <td>{history.notes}</td>
                    <td>
                      <button className='delete-button' onClick={() => handleDeleteHistory(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className='close-button' onClick={handleCloseHistory}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCare;
