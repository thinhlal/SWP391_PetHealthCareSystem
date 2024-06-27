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
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Switch from '@mui/joy/Switch';
import { blue, green } from '@mui/material/colors';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../../context/AuthContext';

function AdminCages() {
  const { logOut } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentAccount, setCurrentAccount] = useState(null);
  const [filteredRevenueData, setFilteredRevenueData] = useState(null);
  const [yesterdayRevenueData, setYesterdayRevenueData] = useState(null);
  const [accountData, setAccountData] = useState([
    {
      id: 1,
      account_id: 'A00001',
      status: 'Disable',
      user_name: 'leslie123',
      name: 'Leslie',
      email: 'leslie14@gmail.com',
      phoneNum: '1234567891',
      role: 'Veterinarian',
    },
    {
      id: 2,
      account_id: 'A00002',
      status: 'Enable',
      user_name: 'ronaldo123',
      name: 'Ronal Đỗ',
      email: 'thichpen12@gmail.com',
      phoneNum: '1234567892',
      role: 'Staff',
    },
    {
      id: 3,
      account_id: 'A00003',
      status: 'Enable',
      user_name: 'messi123',
      name: 'Pessi',
      email: 'thichvuotrau2@gmail.com',
      phoneNum: '1234567893',
      role: 'Customer',
    },
    {
      id: 4,
      account_id: 'A00004',
      status: 'Disable',
      user_name: 'victoria123',
      name: 'Victoria',
      email: 'victoriasecret13@gmail.com',
      phoneNum: '1234567894',
      role: 'Customer',
    },
    {
      id: 5,
      account_id: 'A00005',
      status: 'Enable',
      user_name: 'john123',
      name: 'John',
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

  const [newAccount, setNewAccount] = useState({
    user_name: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phoneNum: '',
    role: 'Customer',
  });

  const [editAccount, setEditAccount] = useState({
    id: '',
    name: '',
    email: '',
    phoneNum: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
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

  const handleRoleFilterChange = event => {
    setRoleFilter(event.target.value);
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = password => {
    const re = /^.{6,}$/;
    return re.test(String(password));
  };

  const validatePhone = phone => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
  };

  const handleSaveChanges = () => {
    const newErrors = {};
    if (!editAccount.name) newErrors.name = 'Name is required';
    if (!editAccount.email) newErrors.email = 'Email is required';
    else if (!validateEmail(editAccount.email))
      newErrors.email = 'Invalid email format - Ex: Example@gmail.com';
    if (!editAccount.phoneNum) newErrors.phoneNum = 'Phone number is required';
    else if (!validatePhone(editAccount.phoneNum))
      newErrors.phoneNum = 'Invalid phone number format';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedAccountData = accountData.map(account => {
      if (account.id === editAccount.id) {
        return { ...account, ...editAccount };
      }
      return account;
    });
    setAccountData(updatedAccountData);
    setErrors({});
    const modal = bootstrap.Modal.getInstance(
      document.getElementById(`exampleModalEdit-${editAccount.id}`),
    );
    if (modal) {
      modal.hide();
    }
  };

  const openEditModal = account => {
    setCurrentAccount(account);
    setEditAccount({
      id: account.id,
      name: account.name,
      email: account.email,
      phoneNum: account.phoneNum,
      role: account.role,
    });
  };

  const handleNewAccountChange = e => {
    const { name, value } = e.target;
    setNewAccount(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditAccountChange = e => {
    const { name, value } = e.target;
    setEditAccount(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddAccount = () => {
    const newErrors = {};
    if (!newAccount.user_name) newErrors.user_name = 'User name is required';
    if (!newAccount.password) newErrors.password = 'Password is required';
    else if (!validatePassword(newAccount.password))
      newErrors.password = 'The minimum length is 6 characters';
    if (!newAccount.confirmPassword)
      newErrors.confirmPassword = 'Confirm password is required';
    if (newAccount.password !== newAccount.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!newAccount.name) newErrors.name = 'Name is required';
    if (!newAccount.email) newErrors.email = 'Email is required';
    else if (!validateEmail(newAccount.email))
      newErrors.email = 'Invalid email format - Ex: Example@gmail.com';
    if (!newAccount.phoneNum) newErrors.phoneNum = 'Phone number is required';
    else if (!validatePhone(newAccount.phoneNum))
      newErrors.phoneNum = 'Invalid phone number format';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newId = accountData.length + 1;
    const newAccountData = {
      ...newAccount,
      id: newId,
      account_id: `A0000${newId}`,
      status: 'Enable',
    };
    setAccountData([...accountData, newAccountData]);
    setNewAccount({
      user_name: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
      phoneNum: '',
      role: 'Customer',
    });
    setErrors({});
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    if (modal) {
      modal.hide();
    }
  };

  const handleStatusChange = id => {
    const updatedAccountData = accountData.map(account => {
      if (account.id === id) {
        return {
          ...account,
          status: account.status === 'Enable' ? 'Disable' : 'Enable',
        };
      }
      return account;
    });
    setAccountData(updatedAccountData);
  };

  const filteredAccountData = accountData.filter(account => {
    const matchesRole = roleFilter === 'All' || account.role === roleFilter;
    const matchesSearch =
      search === '' ||
      account.user_name.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
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
                <div className='Admin-Cages-Main-Table-Title'>
                  {' '}
                  Account List{' '}
                </div>
                <div className='Admin-Cages-Main-Table-Title-Text'>
                  {' '}
                  Account Information{' '}
                </div>
                <div className='Admin-Cages-Main-Filter'>
                  <div className='Admin-Cages-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Name'
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
                    Select role:
                    <select
                      className='Admin-Cages-Select-Filter'
                      name='role'
                      onChange={handleRoleFilterChange}
                      value={roleFilter}
                    >
                      <option>All</option>
                      <option>Customer</option>
                      <option>Veterinarian</option>
                      <option>Staff</option>
                      <option>Admin</option>
                    </select>
                  </div>

                  <div className='Admin-Cages-Add-Cages'>
                    <button
                      type='button'
                      className='Admin-Cages-add-pet-btn'
                      data-bs-toggle='modal'
                      data-bs-target='#Admin-Cages-exampleModal'
                    >
                      Add Account
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
                              Add Account{' '}
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
                                User name{' '}
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                {' '}
                                User name:{' '}
                              </label>
                              <input
                                className='Admin-Cages-input'
                                name='user_name'
                                value={newAccount.user_name}
                                onChange={handleNewAccountChange}
                                placeholder='Username'
                              />
                              {errors.user_name && (
                                <div className='Admin-Cages-Error'>
                                  {errors.user_name}
                                </div>
                              )}
                            </div>

                            <div className='Admin-Cages-modal-add-account'>
                              <div className='Admin-Cages-modal-title-name'>
                                {' '}
                                Password{' '}
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                {' '}
                                Password:{' '}
                              </label>
                              <input
                                className='Admin-Cages-input'
                                type='password'
                                name='password'
                                value={newAccount.password}
                                onChange={handleNewAccountChange}
                                placeholder='Password'
                              />
                              {errors.password && (
                                <div className='Admin-Cages-Error'>
                                  {errors.password}
                                </div>
                              )}
                              <div className='Admin-Cages-input-confirm'>
                                <label className='Admin-Cages-modal-add'>
                                  {' '}
                                  Confirm password:{' '}
                                </label>
                                <input
                                  className='Admin-Cages-input'
                                  type='password'
                                  name='confirmPassword'
                                  value={newAccount.confirmPassword}
                                  onChange={handleNewAccountChange}
                                  placeholder='Confirm password'
                                />
                                {errors.confirmPassword && (
                                  <div className='Admin-Cages-Error'>
                                    {errors.confirmPassword}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className='Admin-Cages-modal-add-account'>
                              <div className='Admin-Cages-modal-title-name'>
                                {' '}
                                Name{' '}
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                {' '}
                                Name:{' '}
                              </label>
                              <input
                                className='Admin-Cages-input'
                                name='name'
                                value={newAccount.name}
                                onChange={handleNewAccountChange}
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
                                Email{' '}
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                {' '}
                                Email:{' '}
                              </label>
                              <input
                                className='Admin-Cages-input'
                                type='email'
                                name='email'
                                value={newAccount.email}
                                onChange={handleNewAccountChange}
                                placeholder='Email'
                              />
                              {errors.email && (
                                <div className='Admin-Cages-Error'>
                                  {errors.email}
                                </div>
                              )}
                            </div>

                            <div className='Admin-Cages-modal-add-account'>
                              <div className='Admin-Cages-modal-title-name'>
                                {' '}
                                Phone Number{' '}
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                {' '}
                                Phone Number:{' '}
                              </label>
                              <input
                                className='Admin-Cages-input'
                                name='phoneNum'
                                value={newAccount.phoneNum}
                                onChange={handleNewAccountChange}
                                placeholder='Phone Number'
                              />
                              {errors.phoneNum && (
                                <div className='Admin-Cages-Error'>
                                  {errors.phoneNum}
                                </div>
                              )}
                            </div>

                            <div className='Admin-Cages-modal-add-account'>
                              <div className='Admin-Cages-modal-title-name'>
                                {' '}
                                Role{' '}
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                {' '}
                                Role:{' '}
                              </label>
                              <select
                                className='Admin-Cages-input-role'
                                name='role'
                                value={newAccount.role}
                                onChange={handleNewAccountChange}
                              >
                                <option>Customer</option>
                                <option>Veterinarian</option>
                                <option>Staff</option>
                                <option>Admin</option>
                              </select>
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
                              onClick={handleAddAccount}
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
                    Account ID{' '}
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    {' '}
                    User name{' '}
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    {' '}
                    Role{' '}
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title-Btn'>
                    {' '}
                    Action{' '}
                  </div>
                </div>

                {filteredAccountData.map(item => (
                  <div
                    className='Admin-Cages-Main-Table-Content-Row-Wrapper'
                    key={item.id}
                  >
                    <div className='Admin-Cages-Main-Table-Content-Row'>
                      {' '}
                      {item.account_id}{' '}
                    </div>
                    <div className='Admin-Cages-Main-Table-Content-Row'>
                      {' '}
                      {item.user_name}{' '}
                    </div>
                    <div className='Admin-Cages-Main-Table-Content-Row'>
                      {' '}
                      {item.role}{' '}
                    </div>
                    <div className='Admin-Cages-Main-Table-Content-Row-Action'>
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
                                  Update Information{' '}
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
                                  <div className='Admin-Cages-modal-update-old'>
                                    <div className='Admin-Cages-modal-initials'>
                                      {' '}
                                      Old name:{' '}
                                    </div>
                                    {currentAccount?.name}
                                  </div>
                                  <label className='Admin-Cages-modal-update-new'>
                                    {' '}
                                    New name:{' '}
                                  </label>
                                  <input
                                    className='Admin-Cages-input'
                                    name='name'
                                    value={editAccount.name}
                                    onChange={handleEditAccountChange}
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
                                    Email{' '}
                                  </div>
                                  <div className='Admin-Cages-modal-update-old'>
                                    <div className='Admin-Cages-modal-initials'>
                                      {' '}
                                      Old email:{' '}
                                    </div>
                                    {currentAccount?.email}
                                  </div>
                                  <label className='Admin-Cages-modal-update-new'>
                                    {' '}
                                    New email:{' '}
                                  </label>
                                  <input
                                    className='Admin-Cages-input'
                                    type='email'
                                    name='email'
                                    value={editAccount.email}
                                    onChange={handleEditAccountChange}
                                    placeholder='Email'
                                  />
                                  {errors.email && (
                                    <div className='Admin-Cages-Error'>
                                      {errors.email}
                                    </div>
                                  )}
                                </div>
                                <div className='Admin-Cages-modal-update'>
                                  <div className='Admin-Cages-modal-title'>
                                    {' '}
                                    Phone{' '}
                                  </div>
                                  <div className='Admin-Cages-modal-update-old'>
                                    <div className='Admin-Cages-modal-initials'>
                                      {' '}
                                      Old phone number:{' '}
                                    </div>
                                    {currentAccount?.phoneNum}
                                  </div>
                                  <label className='Admin-Cages-modal-update-new'>
                                    {' '}
                                    New phone number:{' '}
                                  </label>
                                  <input
                                    className='Admin-Cages-input'
                                    name='phoneNum'
                                    value={editAccount.phoneNum}
                                    onChange={handleEditAccountChange}
                                    placeholder='Phone number'
                                  />
                                  {errors.phoneNum && (
                                    <div className='Admin-Cages-Error'>
                                      {errors.phoneNum}
                                    </div>
                                  )}
                                </div>

                                <div className='Admin-Cages-modal-update'>
                                  <div className='Admin-Cages-modal-title'>
                                    {' '}
                                    Role{' '}
                                  </div>
                                  <div className='Admin-Cages-modal-update-old'>
                                    <div className='Admin-Cages-modal-initials'>
                                      {' '}
                                      Old role:{' '}
                                    </div>
                                    {currentAccount?.role}
                                  </div>
                                  <label className='Admin-Cages-modal-initials'>
                                    {' '}
                                    New role:{' '}
                                  </label>
                                  <select
                                    className='Admin-Cages-input-role'
                                    name='role'
                                    value={editAccount.role}
                                    onChange={handleEditAccountChange}
                                  >
                                    <option>Customer</option>
                                    <option>Veterinarian</option>
                                    <option>Staff</option>
                                    <option>Admin</option>
                                  </select>
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
                        <button
                          type='button'
                          className='Admin-Cages-Main-Table-Content-Btn'
                          data-bs-toggle='modal'
                          data-bs-target={`#exampleModalMore-${item.id}`}
                        >
                          <MoreVertOutlinedIcon sx={{ color: green[400] }} />
                        </button>
                        {/* Modal More */}
                        <div
                          className='modal fade'
                          id={`exampleModalMore-${item.id}`}
                          tabIndex='-1'
                          aria-labelledby='exampleModalLabelMore'
                          aria-hidden='true'
                        >
                          <div className='modal-dialog'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <h1
                                  className='modal-title fs-5'
                                  id='exampleModalLabelMore'
                                >
                                  {' '}
                                  Account Information{' '}
                                </h1>
                                <button
                                  type='button'
                                  className='btn-close'
                                  data-bs-dismiss='modal'
                                  aria-label='Close'
                                ></button>
                              </div>
                              <div className='modal-body'>
                                <div className='Admin-Cages-modal-more'>
                                  <div className='Admin-Cages-modal-more-title'>
                                    {' '}
                                    Account ID:{' '}
                                  </div>
                                  {item.account_id}
                                </div>
                                <div className='Admin-Cages-modal-more'>
                                  <div className='Admin-Cages-modal-more-title'>
                                    {' '}
                                    Name:{' '}
                                  </div>
                                  {item.name}
                                </div>
                                <div className='Admin-Cages-modal-more'>
                                  <div className='Admin-Cages-modal-more-title'>
                                    {' '}
                                    User name:{' '}
                                  </div>
                                  {item.user_name}
                                </div>
                                <div className='Admin-Cages-modal-more'>
                                  <div className='Admin-Cages-modal-more-title'>
                                    {' '}
                                    Email:{' '}
                                  </div>
                                  {item.email}
                                </div>
                                <div className='Admin-Cages-modal-more'>
                                  <div className='Admin-Cages-modal-more-title'>
                                    {' '}
                                    Phone number:{' '}
                                  </div>
                                  {item.phoneNum}
                                </div>
                                <div className='Admin-Cages-modal-more'>
                                  <div className='Admin-Cages-modal-more-title'>
                                    {' '}
                                    Role:{' '}
                                  </div>
                                  {item.role}
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                      <span className='Admin-Cages-Main-Table-Content-Btn_Wrapper'>
                        <Switch
                          checked={item.status === 'Enable'}
                          onChange={() => handleStatusChange(item.id)}
                          color={
                            item.status === 'Enable' ? 'success' : 'neutral'
                          }
                          variant={
                            item.status === 'Enable' ? 'solid' : 'outlined'
                          }
                          slotProps={{
                            endDecorator: {
                              sx: {
                                minWidth: 24,
                              },
                            },
                          }}
                        />
                      </span>
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
