import React, { useContext, useEffect, useState } from 'react';
import './DoctorCare.css';
import Pagination from '../../components/Pagination/Pagination';
import Header from '../../components/Doctor/Header/Header';
import axiosInstance from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';
import { Slider } from '@mui/material';

const DoctorCare = () => {
  const { user } = useContext(AuthContext);
  const [statusData, setStatusData] = useState([]);

  const [selectedPet, setSelectedPet] = useState(null);
  const [viewHistory, setViewHistory] = useState(false);
  const [diseaseHistory, setDiseaseHistory] = useState([]);
  const [filterOrder, setFilterOrder] = useState('newest');
  const [sliderValue, setSliderValue] = useState(1);
  const [petCondition, setPetCondition] = useState('NotRecover');
  const [petInfoStatus, setPetInfoStatus] = useState('');

  useEffect(() => {
    const fetchCageDisease = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/cage/getDiseaseByDoctorID`,
          {
            params: {
              doctorID: user.doctorDetails[0].doctorID,
            },
          },
        );
        console.log(response.data);
        setStatusData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCageDisease();
  }, [user.doctorDetails]);

  const handleUpdateStatus = status => {
    setSelectedPet(status);
    setViewHistory(false);
  };

  const handleSaveUpdate = async () => {
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/cage/updateCageInfo`,
        {
          cageDiseaseID: selectedPet.cageDiseaseID,
          statusPet: petCondition,
          petCondition: sliderValue,
          textPetInfo: petInfoStatus,
        },
      );
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/cage/getDiseaseByDoctorID`,
        {
          params: {
            doctorID: user.doctorDetails[0].doctorID,
          },
        },
      );
      setStatusData(response.data);
    } catch (error) {
      console.error('Error fetching cage:', error);
    }
    setPetCondition('NotRecover');
    setSliderValue(1);
    setPetInfoStatus('');
    setSelectedPet(null);
  };

  const handleViewHistory = async cageDiseaseID => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/cage/getAllDiseaseInfoByID`,
        {
          params: {
            cageDiseaseID,
          },
        },
      );
      setDiseaseHistory(response.data.diseaseInfoDetails);
    } catch (error) {
      console.error('Error fetching disease info:', error);
    }
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
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setStatusData(sortedData);
  };

  // const handleDeleteHistory = async diseaseInfoID => {
  //   try {
  //     await axiosInstance.post(
  //       `${process.env.REACT_APP_API_URL}/cage/deleteDiseaseInfoByID`,
  //       {
  //         diseaseInfoID
  //       },
  //     );
  //   } catch (error) {
  //     console.error('Error fetching disease info:', error);
  //   }
  //   setViewHistory(false);
  // };

  const handleSliderChange = (event, newValue) => {
    console.log(typeof newValue);
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
      if (newValue === 5) {
        setPetCondition('Recover');
      } else {
        setPetCondition('NotRecover');
      }
    }
  };

  function petStatus(value) {
    switch (value) {
      case 1:
        return 'Critical';
      case 2:
        return 'Severe';
      case 3:
        return 'Moderate';
      case 4:
        return 'Mild';
      case 5:
        return 'Healthy';
      default:
        return '';
    }
  }

  const handleRadioChange = event => {
    if (event.target.value === 'Recover') {
      setSliderValue(5);
    } else if (event.target.value === 'NotRecover') {
      setSliderValue(1);
    }
    setPetCondition(event.target.value);
  };

  return (
    <div className='main-container-doctor-care'>
      <Header />
      <div className='container-cage-status'>
        <div className='filter-bar'>
          <label htmlFor='sort-order'>Sort by:</label>
          <select
            id='sort-order'
            value={filterOrder}
            onChange={handleFilterChange}
          >
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
                <th>Exit Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {statusData.map((status, index) => (
                <tr key={index}>
                  <td>{status.cageID}</td>
                  <td>{status?.cageDetails[0]?.name}</td>
                  <td>{status?.petID}</td>
                  <td>{status?.startDate.split('T')[0]}</td>
                  <td>{status?.reasonForAdmission}</td>
                  <td>
                    {status?.dischargeDate ? (
                      <span>Exited Cage</span>
                    ) : (
                      <span>In Cage</span>
                    )}
                  </td>
                  <td>
                    {status?.dischargeDate
                      ? status?.dischargeDate.split('T')[0]
                      : null}
                  </td>
                  <td>
                    <button
                      className='history-button'
                      onClick={() => handleViewHistory(status.cageDiseaseID)}
                    >
                      View Update History
                    </button>
                    {!status?.dischargeDate ? (
                      <button
                        className='update-button'
                        onClick={() => handleUpdateStatus(status)}
                      >
                        Update
                      </button>
                    ) : null}
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
              <p>
                <strong>Pet ID:</strong> {selectedPet.petID}
              </p>
              <p>
                <strong>Name:</strong> {selectedPet.petDetails[0].name}
              </p>
              <p>
                <strong>Breed:</strong> {selectedPet.petDetails[0].breed}
              </p>
              <p>
                <strong>Birthday:</strong>{' '}
                {selectedPet.petDetails[0].birthday.split('T')[0]}
              </p>
              <p>
                <strong>Gender:</strong> {selectedPet.petDetails[0].gender}
              </p>
              <p>
                <strong>Pet Type:</strong> {selectedPet.petDetails[0].petType}
              </p>
            </div>
            <div>
              <div className='modal-body-update-status-title'>
                Status of pet:
              </div>
              <div className='modal-body-update-status'>
                <div className='modal-body-update-status-empty'>
                  <input
                    type='radio'
                    id='NotRecover'
                    name='status-of-pet'
                    value='NotRecover'
                    checked={petCondition === 'NotRecover'}
                    onChange={handleRadioChange}
                  />
                  <div className='modal-body-update-status-empty-text'>
                    Not Recover
                  </div>
                </div>
                <div className='modal-body-update-status-using'>
                  <input
                    type='radio'
                    id='Recover'
                    name='status-of-pet'
                    value='Recover'
                    checked={petCondition === 'Recover'}
                    onChange={handleRadioChange}
                  />
                  <div className='modal-body-update-status-using-text'>
                    Recover
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-body-update-text'>
              <div className='modal-body-update-text-title'>Pet Condition:</div>
              <div className='slider-update-status'>
                <Slider
                  aria-label='Pet Health Status'
                  value={sliderValue}
                  onChange={handleSliderChange}
                  getAriaValueText={petStatus}
                  valueLabelDisplay='auto'
                  step={1}
                  marks={[
                    { value: 1, label: 'Critical' },
                    { value: 2, label: 'Mild' },
                    { value: 3, label: 'Moderate' },
                    { value: 4, label: 'Severe' },
                    { value: 5, label: 'Healthy' },
                  ]}
                  min={1}
                  max={5}
                />
              </div>
            </div>
            <textarea
              value={petInfoStatus}
              onChange={e => setPetInfoStatus(e.target.value)}
              placeholder='Enter notes here'
              required
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
                {diseaseHistory.length > 0 ? (
                  diseaseHistory.map((history, index) => (
                    <tr key={index}>
                      <td>{history.date.split('T')[0]}</td>
                      <td
                        className={`status-${
                          history.status === 1
                            ? 'critical'
                            : history.status === 2
                              ? 'mild'
                              : history.status === 3
                                ? 'moderate'
                                : history.status === 4
                                  ? 'severe'
                                  : 'healthy'
                        }`}
                      >
                        {history.status === 1
                          ? 'Critical'
                          : history.status === 2
                            ? 'Mild'
                            : history.status === 3
                              ? 'Moderate'
                              : history.status === 4
                                ? 'Severe'
                                : 'Healthy'}
                      </td>
                      <td>{history.notes}</td>
                      <td>
                        <button
                          className='delete-button'
                          // {onClick={() => handleDeleteHistory(history.diseaseInfoID)}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No history disease</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              className='close-button'
              onClick={handleCloseHistory}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCare;