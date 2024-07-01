import './AdminCages.css';
// React
import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

// Img
import logo_pet_health_care from '../../assets/images/img_AdminCages/logo_pethealthcare.png';
import icon_search from '../../assets/images/img_AdminCages/icon_search.svg';
// MUI
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// import Switch from '@mui/joy/Switch';
import { blue } from '@mui/material/colors';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Switch from '@mui/joy/Switch';

import { AuthContext } from '../../context/AuthContext';

function AdminCages() {
  const { logOut } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredRevenueData, setFilteredRevenueData] = useState(null);
  const [yesterdayRevenueData, setYesterdayRevenueData] = useState(null);
  const [errors, setErrors] = useState({});
  const [cageData, setCageData] = useState([
    {
      id: 1,
      cage_number_id: 'C00001',
      name: 'Cage1',
      description: 'Cage1 description',
      account_id: 'A00001',
      status: 'Using',
      condition: 'Enable',
      user_name: 'leslie123',
      email: 'leslie14@gmail.com',
      phoneNum: '1234567891',
      role: 'Veterinarian',
    },
    {
      id: 2,
      cage_number_id: 'C00002',
      name: 'Cage2',
      description: 'Cage2 description',
      account_id: 'A00002',
      status: 'Empty',
      condition: 'Disable',
      user_name: 'ronaldo123',
      email: 'thichpen12@gmail.com',
      phoneNum: '1234567892',
      role: 'Staff',
    },
    {
      id: 3,
      cage_number_id: 'C00003',
      name: 'Cage3',
      description: 'Cage3 description',
      account_id: 'A00003',
      status: 'Empty',
      condition: 'Disable',
      user_name: 'messi123',
      email: 'thichvuotrau2@gmail.com',
      phoneNum: '1234567893',
      role: 'Customer',
    },
    {
      id: 4,
      cage_number_id: 'C00004',
      name: 'Cage4',
      description: 'Cage4 description',
      account_id: 'A00004',
      status: 'Using',
      condition: 'Enable',
      user_name: 'victoria123',
      email: 'victoriasecret13@gmail.com',
      phoneNum: '1234567894',
      role: 'Customer',
    },
    {
      id: 5,
      cage_number_id: 'C00005',
      name: 'Cage5',
      description: 'Cage5 description',
      condition: 'Enable',
      account_id: 'A00005',
      status: 'Using',
      user_name: 'john123',
      email: 'johnydog143@gmail.com',
      phoneNum: '1234567895',
      role: 'Admin',
    },
  ]);

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

  const [newCage, setNewCage] = useState({
    name: '',
    description: '',
    condition: 'Enable',
    status: 'Empty',
  });

  const [editCage, setEditCage] = useState({
    id: '',
    name: '',
    description: '',
  });

  const handleNewCageChange = e => {
    const { name, value } = e.target;
    setNewCage(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditCageChange = e => {
    const { name, value } = e.target;
    setEditCage(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCage = () => {
    const newErrors = {};
    if (!newCage.name) newErrors.name = 'Name is required';
    if (!newCage.description) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newId = cageData.length + 1;
    const newCageData = {
      ...newCage,
      id: newId,
      cage_number_id: `C0000${newId}`,
      condition: 'Enable',
    };
    setCageData([...cageData, newCageData]);
    setNewCage({
      name: '',
      description: '',
      condition: 'Enable',
      status: 'Empty',
    });
    setErrors({});
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    if (modal) {
      modal.hide();
    }
  };

  const handleSaveChanges = () => {
    const newErrors = {};
    if (!editCage.name) newErrors.name = 'Name is required';
    if (!editCage.description)
      newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedCageData = cageData.map(cage => {
      if (cage.id === editCage.id) {
        return { ...cage, ...editCage };
      }
      return cage;
    });
    setCageData(updatedCageData);
    setErrors({});
    const modal = bootstrap.Modal.getInstance(
      document.getElementById(`exampleModalEdit-${editCage.id}`),
    );
    if (modal) {
      modal.hide();
    }
  };

  const openEditModal = cage => {
    setEditCage({
      id: cage.id,
      name: cage.name,
      description: cage.description,
    });
  };

  const modalRef = useRef(null);

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

  const handlestatusFilterChange = event => {
    setStatusFilter(event.target.value);
  };

  const handleStatusChange = id => {
    const updatedcageData = cageData.map(cage => {
      if (cage.id === id) {
        return {
          ...cage,
          condition: cage.condition === 'Enable' ? 'Disable' : 'Enable',
        };
      }
      return cage;
    });
    setCageData(updatedcageData);
  };

  const filteredcageData = cageData.filter(cage => {
    const matchesStatus =
      statusFilter === 'All' || cage.status === statusFilter;
    const matchesSearch =
      search === '' ||
      cage.cage_number_id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
    <div className='Admin-Cages container-fluid'>
      <div className='row'>
        <div className='Admin-Cages-Header row'>
          <div className='Admin-Cages-Header-Logo col-md-2'>
            <img
              className='Admin-Cages-Logo'
              src={logo_pet_health_care}
              alt='logo-pet'
            />
          </div>
          <div className='Admin-Cages-Header-Account-Wrapper col-md-10'>
            <div className='Admin-Cages-Header-Account'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='#000'
                className='bi bi-person'
                viewBox='0 0 16 16'
              >
                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
              </svg>
              <div className='Admin-Cages-Header-Account-Text'> Hi Admin</div>
            </div>
          </div>
        </div>

        <div className='Admin-Cages-Content row'>
          <div className='Admin-Cages-Navigate col-md-2'>
            <div className='Admin-Cages-Navigate-Text'>
              <div className='Admin-Cages-Navigate-Dashboard'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-house-door'
                  viewBox='0 0 16 16'
                >
                  <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z' />
                </svg>
                <a href='/admin-dashboard'>
                  <div className='Admin-Cages-Navigate-Text-Dashboard'>
                    {' '}
                    DashBoard{' '}
                  </div>
                </a>
              </div>
              <div className='Admin-Cages-Navigate-Text-Rest'>
                <a href='/admin-dashboard'>
                  <div className='Admin-Cages-Navigate-Text-Rest-Menu'>
                    {' '}
                    Booking{' '}
                  </div>
                </a>
                <a href='/Admin-Cages'>
                  <div className='Admin-Cages-Navigate-Text-Rest-Menu'>
                    {' '}
                    Account{' '}
                  </div>
                </a>
                <a href='/admin-services'>
                  <div className='Admin-Cages-Navigate-Text-Rest-Menu'>
                    {' '}
                    Services{' '}
                  </div>
                </a>
                <a href='/admin-cages'>
                  <div className='Admin-Cages-Navigate-Text-Rest-Menu'>
                    {' '}
                    Cages{' '}
                  </div>
                </a>
              </div>
            </div>

            <div onClick={logOut}>
              <div className='Admin-Cages-Navigate-Logout'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='42'
                  fill='currentColor'
                  className='bi bi-box-arrow-left'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
                  />
                  <path
                    fillRule='evenodd'
                    d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z'
                  />
                </svg>
                <span>Logout</span>
              </div>
            </div>
          </div>

          <div className='Admin-Cages-Main col-md-10'>
            <div className='Admin-Cages-Main_Title'>
              <div className='Admin-Cages-Main_Title-Left'>
                <h2 className='Admin-Cages-Main_Title-Left-Intro'>
                  {' '}
                  Hi, welcome back!{' '}
                </h2>
                <p className='Admin-Cages-Main_Title-Left-text'>
                  {' '}
                  Sales monitoring dashboard template.{' '}
                </p>
              </div>
              <div className='Admin-Cages-Main_Title-Right'>
                <label className='Admin-Cages-title-Star'>
                  {' '}
                  Customer Ratings{' '}
                </label>
                <div className='Admin-Cages-Star'>
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

            <div className='Admin-Cages-Main-ChooseDate'>
              <div className='Admin-Cages-Main-ChooseDate_Text'>
                {' '}
                Choose Date:{' '}
              </div>
              <input
                type='date'
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>

            {filteredRevenueData && (
              <div className='Admin-Cages-Main-Header row'>
                <div className='Admin-Cages-Main-Header-Income col-md-3'>
                  <div className='Admin-Cages-Main-Header-Note'>
                    {' '}
                    Daily income{' '}
                  </div>
                  <div className='Admin-Cages-Main-Header-Money'>
                    {' '}
                    ${filteredRevenueData.money}{' '}
                  </div>
                  <div className='Admin-Cages-Main-Header-Percent'>
                    {' '}
                    {calculatePercentChange()}% to the previous day{' '}
                  </div>
                </div>

                <div className='Admin-Cages-Main-Header-Income col-md-3'>
                  <div className='Admin-Cages-Main-Header-Note'>
                    {' '}
                    Weekly income{' '}
                  </div>
                  <div className='Admin-Cages-Main-Header-Money'> $0000 </div>
                  <div className='Admin-Cages-Main-Header-Percent'>
                    {' '}
                    6% day over week{' '}
                  </div>
                </div>

                <div className='Admin-Cages-Main-Header-Income col-md-3'>
                  <div className='Admin-Cages-Main-Header-Note'>
                    {' '}
                    Monthly income{' '}
                  </div>
                  <div className='Admin-Cages-Main-Header-Money'> $0000 </div>
                  <div className='Admin-Cages-Main-Header-Percent'>
                    {' '}
                    3% day over month{' '}
                  </div>
                </div>

                <div className='Admin-Cages-Main-Header-Income col-md-3'>
                  <div className='Admin-Cages-Main-Header-Note'> Total </div>
                  <div className='Admin-Cages-Main-Header-Money'> $0000 </div>
                  <div className='Admin-Cages-Main-Header-Percent'>
                    {' '}
                    10% day over day{' '}
                  </div>
                </div>
              </div>
            )}

            <div className='Admin-Cages-Main-Table-Wrapper'>
              <div className='Admin-Cages-Main-Table'>
                <div className='Admin-Cages-Main-Table-Title'> Cage List </div>
                <div className='Admin-Cages-Main-Table-Title-Text'>
                  {' '}
                  Cages Information{' '}
                </div>
                <div className='Admin-Cages-Main-Filter'>
                  <div className='Admin-Cages-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Cage ID'
                      className='Admin-Cages-Main-Search-Input'
                      onChange={e => setSearch(e.target.value)}
                    />
                    <button className='Admin-Cages-Main-Search-Button'>
                      {' '}
                      <img
                        src={icon_search}
                        alt=''
                      />{' '}
                    </button>
                  </div>
                  <div className='Admin-Cages-Select-Role'>
                    <FilterAltIcon sx={{ fontSize: 20 }} />
                    Select status:
                    <select
                      className='Admin-Cages-Select-Filter'
                      name='role'
                      onChange={handlestatusFilterChange}
                      value={statusFilter}
                    >
                      <option>All</option>
                      <option>Using</option>
                      <option>Empty</option>
                    </select>
                  </div>

                  <div className='Admin-Cages-Add-Cages'>
                    <button
                      type='button'
                      className='Admin-Cages-add-pet-btn'
                      data-bs-toggle='modal'
                      data-bs-target='#Admin-Cages-exampleModal'
                    >
                      Add Cage
                    </button>

                    <div
                      className='modal fade'
                      id='Admin-Cages-exampleModal'
                      tabIndex='-1'
                      aria-labelledby='exampleModalLabelEdit'
                      aria-hidden='true'
                      ref={modalRef}
                    >
                      <div className='modal-dialog'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <h1
                              className='modal-title fs-5'
                              id='exampleModalLabelEdit'
                            >
                              {' '}
                              Add Cage{' '}
                            </h1>
                            <button
                              type='button'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                            ></button>
                          </div>
                          <div className='modal-body'>
                            <div className='Admin-Cages-modal-add-account'>
                              <div className='Admin-Cages-modal-title-name'>
                                {' '}
                                Name{' '}
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                {' '}
                                Cage name:{' '}
                              </label>
                              <input
                                className='Admin-Cages-input'
                                name='name'
                                value={newCage.name}
                                onChange={handleNewCageChange}
                                placeholder='Name'
                              />
                              {errors.name && (
                                <div className='Admin-Cages-Error'>
                                  {errors.name}
                                </div>
                              )}
                            </div>

                            <div className='Admin-Cages-modal-add-account'>
                              <div className='Admin-Cages-modal-title-name'>
                                {' '}
                                Description{' '}
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                {' '}
                                Description:{' '}
                              </label>
                              <input
                                className='Admin-Cages-input'
                                name='description'
                                value={newCage.description}
                                onChange={handleNewCageChange}
                                placeholder='Description'
                              />
                              {errors.description && (
                                <div className='Admin-Cages-Error'>
                                  {errors.description}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='modal-footer'>
                            <button
                              type='button'
                              className='btn btn-secondary'
                              data-bs-dismiss='modal'
                            >
                              {' '}
                              Close{' '}
                            </button>
                            <button
                              type='button'
                              className='btn btn-success'
                              onClick={handleAddCage}
                            >
                              {' '}
                              Add{' '}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='Admin-Cages-Main-Table-Header'>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    {' '}
                    Cage number ID{' '}
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    {' '}
                    Name{' '}
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    {' '}
                    Description{' '}
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    {' '}
                    Status{' '}
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title-Btn'>
                    {' '}
                    Action{' '}
                  </div>
                </div>

                {filteredcageData.map(item => (
                  <div
                    className='Admin-Cages-Main-Table-Content-Row-Wrapper'
                    key={item.id}
                  >
                    <div className='Admin-Cages-Main-Table-Content-Row'>
                      {' '}
                      {item.cage_number_id}{' '}
                    </div>
                    <div className='Admin-Cages-Main-Table-Content-Row'>
                      {' '}
                      {item.name}{' '}
                    </div>
                    <div className='Admin-Cages-Main-Table-Content-Row'>
                      {' '}
                      {item.description}{' '}
                    </div>
                    <div className='Admin-Cages-Main-Table-Content-Row'>
                      {' '}
                      {item.status}{' '}
                    </div>
                    <div className='Admin-Cages-Main-Table-Content-Row-Action'>
                      {' '}
                      <span className='Admin-Cages-Main-Table-Content-Btn_Wrapper'>
                        <button
                          type='button'
                          className='Admin-Cages-Main-Table-Content-Btn'
                          data-bs-toggle='modal'
                          data-bs-target={`#exampleModalEdit-${item.id}`}
                          onClick={() => openEditModal(item)}
                        >
                          <BorderColorOutlinedIcon sx={{ color: blue[400] }} />
                        </button>
                        {/* Modal Edit */}
                        <div
                          className='modal fade'
                          id={`exampleModalEdit-${item.id}`}
                          tabIndex='-1'
                          aria-labelledby='exampleModalLabelEdit'
                          aria-hidden='true'
                        >
                          <div className='modal-dialog'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <h1
                                  className='modal-title fs-5'
                                  id='exampleModalLabelEdit'
                                >
                                  {' '}
                                  Edit Cage{' '}
                                </h1>
                                <button
                                  type='button'
                                  className='btn-close'
                                  data-bs-dismiss='modal'
                                  aria-label='Close'
                                ></button>
                              </div>
                              <div className='modal-body'>
                                <div className='Admin-Cages-modal-update'>
                                  <div className='Admin-Cages-modal-title-name'>
                                    {' '}
                                    Name{' '}
                                  </div>
                                  <label className='Admin-Cages-modal-update-new'>
                                    {' '}
                                    Cage name:{' '}
                                  </label>
                                  <input
                                    className='Admin-Cages-input'
                                    name='name'
                                    value={editCage.name}
                                    onChange={handleEditCageChange}
                                    placeholder='Name'
                                  />
                                  {errors.name && (
                                    <div className='Admin-Cages-Error'>
                                      {errors.name}
                                    </div>
                                  )}
                                </div>
                                <div className='Admin-Cages-modal-update'>
                                  <div className='Admin-Cages-modal-title'>
                                    {' '}
                                    Description{' '}
                                  </div>
                                  <label className='Admin-Cages-modal-update-new'>
                                    {' '}
                                    Cage description:{' '}
                                  </label>
                                  <input
                                    className='Admin-Cages-input'
                                    name='description'
                                    value={editCage.description}
                                    onChange={handleEditCageChange}
                                    placeholder='Description'
                                  />
                                  {errors.description && (
                                    <div className='Admin-Cages-Error'>
                                      {errors.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className='modal-footer'>
                                <button
                                  type='button'
                                  className='btn btn-secondary'
                                  data-bs-dismiss='modal'
                                >
                                  {' '}
                                  Close{' '}
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-success'
                                  onClick={handleSaveChanges}
                                >
                                  {' '}
                                  Save changes{' '}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <span className='Admin-Cages-Main-Table-Content-Btn_Wrapper'>
                        <Switch
                          checked={item.condition === 'Enable'}
                          onChange={() => handleStatusChange(item.id)}
                          color={
                            item.condition === 'Enable' ? 'success' : 'neutral'
                          }
                          variant={
                            item.condition === 'Enable' ? 'solid' : 'outlined'
                          }
                          slotProps={{
                            endDecorator: {
                              sx: {
                                minWidth: 24,
                              },
                            },
                          }}
                        />
                      </span>{' '}
                    </div>
                  </div>
                ))}

                <div className='Admin-Cages-Pagination'>
                  <Stack spacing={2}>
                    <Pagination count={10} />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCages;
