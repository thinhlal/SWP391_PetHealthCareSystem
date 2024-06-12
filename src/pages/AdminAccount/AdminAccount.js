//css
import './AdminAccount.css';
//jsx
import React, { useState, useEffect } from 'react';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
//images
import logo_pet_health_care from '../../assets/images/img_AdminAccount/logo_pethealthcare.png';
import icon_search from '../../assets/images/img_AdminAccount/icon_search.svg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';

function AdminAccount() {
  const [randomValue, setRandomValue] = useState();
  const [randomPercent, setRandomPercent] = useState();
  const [selectedDate, setSelectedDate] = useState('');
  const [search, setSearch] = useState('');

  const data = [
    {
      id: 1,
      account_id: 'A00001',
      user_name: 'Leslie',
      role: 'Veterinarian',
    },
    {
      id: 2,
      account_id: 'A00002',
      user_name: 'Ronaldo',
      role: 'Staff',
    },
    {
      id: 3,
      account_id: 'A00003',
      user_name: 'Messi',
      role: 'Customer',
    },
    {
      id: 4,
      account_id: 'A00004',
      user_name: 'Victoria',
      role: 'Customer',
    },
    {
      id: 5,
      account_id: 'A00005',
      user_name: 'John',
      role: 'Customer',
    },
  ];

  const handleDateChange = event => {
    const randomNum = Math.floor(Math.random() * 100000) + 1;
    setRandomValue(randomNum);
    const randomPercen = Math.floor(Math.random() * 10) + 1;
    setRandomPercent(randomPercen);
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setSelectedDate(formattedDate);
  }, []);

  return (
    <div className='Admin-Account container-fluid'>
      <div className='row'>
        <div className='Admin-Account-Header row'>
          <div className='Admin-Account-Header-Logo col-md-2'>
            <img
              className='Admin-Account-Logo '
              src={logo_pet_health_care}
              alt='logo-pet'
            />
          </div>
          <div className='Admin-Account-Header-Account-Wrapper col-md-10'>
            <div className='Admin-Account-Header-Account'>
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
              <div className='Admin-Account-Header-Account-Text'> Hi Admin</div>
            </div>
          </div>
        </div>

        <div className='Admin-Account-Content row'>
          <div className='Admin-Account-Navigate col-md-2'>
            <div className='Admin-Account-Navigate-Text'>
              <div className='Admin-Account-Navigate-Dashboard'>
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
                <div className=' Admin-Account-Navigate-Text-Dashboard'>
                  {' '}
                  DashBoard{' '}
                </div>
              </div>
              <div className='Admin-Account-Navigate-Text-Rest'>
                <div className='Admin-Account-Navigate-Text-Rest-Menu'>
                  Account
                </div>
                <div className='Admin-Account-Navigate-Text-Rest-Menu'>
                  Booking
                </div>
                <div className='Admin-Account-Navigate-Text-Rest-Menu'>
                  Services
                </div>
                <div className='Admin-Account-Navigate-Text-Rest-Menu'>
                  Settings
                </div>
              </div>
            </div>
            <div className='Admin-Account-Navigate-Logout'>
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
                  d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z'
                />
                <path
                  fillRule='evenodd'
                  d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z'
                />
              </svg>
              <span>Logout</span>
            </div>
          </div>

          <div className='Admin-Account-Main col-md-10'>
            <div className='Admin-Account-Main_Title'>
              <div className='Admin-Account-Main_Title-Left'>
                <h2 className='Admin-Account-Main_Title-Left-Intro'>
                  Hi, welcome back!
                </h2>
                <p className='Admin-Account-Main_Title-Left-text'>
                  Sales monitoring dashboard template.
                </p>
              </div>
              <div className='Admin-Account-Main_Title-Right'>
                <label className='Admin-Account-title-Star'>
                  Customer Ratings
                </label>
                <div className='Admin-Account-Star'>
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

            <div className='Admin-Account-Main-ChooseDate'>
              <div className='Admin-Account-Main-ChooseDate_Text'>
                Choose Date:
              </div>
              <input
                type='date'
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>

            <div className='Admin-Account-Main-Header row'>
              <div className='Admin-Account-Main-Header-Income col-md-3'>
                <div className='Admin-Account-Main-Header-Note'>
                  {' '}
                  Daily income{' '}
                </div>
                <div className='Admin-Account-Main-Header-Money'>
                  ${randomValue}
                </div>
                <div className='Admin-Account-Main-Header-Percent'>
                  {' '}
                  +{randomPercent}% day over day{' '}
                </div>
              </div>

              <div className='Admin-Account-Main-Header-Income col-md-3'>
                <div className='Admin-Account-Main-Header-Note'>
                  Weekly income{' '}
                </div>
                <div className='Admin-Account-Main-Header-Money'>
                  {' '}
                  ${randomValue}{' '}
                </div>
                <div className='Admin-Account-Main-Header-Percent'>
                  {' '}
                  +{randomPercent}% day over week{' '}
                </div>
              </div>

              <div className='Admin-Account-Main-Header-Income col-md-3'>
                <div className='Admin-Account-Main-Header-Note'>
                  {' '}
                  Monthly income{' '}
                </div>
                <div className='Admin-Account-Main-Header-Money'>
                  {' '}
                  ${randomValue}{' '}
                </div>
                <div className='Admin-Account-Main-Header-Percent'>
                  {' '}
                  +{randomPercent}% day over month{' '}
                </div>
              </div>

              <div className='Admin-Account-Main-Header-Income col-md-3'>
                <div className='Admin-Account-Main-Header-Note'> Total </div>
                <div className='Admin-Account-Main-Header-Money'>
                  ${randomValue}
                </div>
                <div className='Admin-Account-Main-Header-Percent'>
                  {' '}
                  +{randomPercent}% day over day{' '}
                </div>
              </div>
            </div>

            <div className='Admin-Account-Main-Table-Wrapper'>
              <div className='Admin-Account-Main-Table'>
                <div className='Admin-Account-Main-Table-Title'>
                  Account List
                </div>
                <div className='Admin-Account-Main-Table-Title-Text'>
                  Account Information
                </div>
                <div className='Admin-Account-Main-Filter'>
                  <div className='Admin-Account-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Name'
                      className='Admin-Account-Main-Search-Input '
                      onChange={e => setSearch(e.target.value)}
                    />
                    <button className='Admin-Account-Main-Search-Button'>
                      {' '}
                      <img
                        src={icon_search}
                        alt=''
                      />{' '}
                    </button>
                  </div>
                  <div className='Admin-Account-Select-Role'>
                    <FilterAltIcon sx={{ fontSize: 20 }} />
                    Select role:
                    <select
                      className='Admin-Account-Select-Filter'
                      name='role'
                    >
                      <option>All</option>
                      <option>Customer</option>
                      <option>Veterinarians</option>
                      <option>Staff</option>
                      <option>Admin</option>
                    </select>
                  </div>

                  <div className='Admin-Account-Add-Services'>
                    <button
                      type='button'
                      className='Admin-Account-add-pet-btn'
                      data-bs-toggle='modal'
                      data-bs-target='#Admin-Account-exampleModal'
                    >
                      Add Account{' '}
                    </button>

                    <div
                      className='modal fade'
                      id='Admin-Account-exampleModal'
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
                              Add Account
                            </h1>
                            <button
                              type='button'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                            ></button>
                          </div>
                          <div className='modal-body'>
                            <div className='Admin-Account-modal-add-account'>
                              <div className='Admin-Account-modal-title-name'>
                                {' '}
                                User name{' '}
                              </div>

                              <label className='Admin-Account-modal-add'>
                                {' '}
                                User name:{' '}
                              </label>
                              <input
                                className='Admin-Account-input'
                                placeholder='Username/Email'
                              />
                            </div>

                            <div className='Admin-Account-modal-add-account'>
                              <div className='Admin-Account-modal-title-name'>
                                {' '}
                                Password{' '}
                              </div>
                              <label className='Admin-Account-modal-add'>
                                {' '}
                                Password:{' '}
                              </label>
                              <input
                                className='Admin-Account-input'
                                type='password'
                                placeholder='Password'
                              />
                              <div className='Admin-Account-input-confirm'>
                                <label className='Admin-Account-modal-add'>
                                  Confirm password:{' '}
                                </label>
                                <input
                                  className='Admin-Account-input'
                                  type='password'
                                  placeholder='Confirm password'
                                />
                              </div>
                            </div>

                            <div className='Admin-Account-modal-add-account'>
                              <div className='Admin-Account-modal-title-name'>
                                {' '}
                                Name{' '}
                              </div>
                              <label className='Admin-Account-modal-add'>
                                {' '}
                                Name:{' '}
                              </label>
                              <input
                                className='Admin-Account-input'
                                placeholder='Name'
                              />
                            </div>
                            <div className='Admin-Account-modal-add-account'>
                              <div className='Admin-Account-modal-title-name'>
                                {' '}
                                Role{' '}
                              </div>

                              <label className='Admin-Account-modal-add'>
                                {' '}
                                Role:{' '}
                              </label>
                              <select className='Admin-Account-input-role'>
                                <option>Customer</option>
                                <option>Veterinarians</option>
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
                              Close
                            </button>
                            <button
                              type='button'
                              className='btn btn-success'
                            >
                              Add{' '}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='Admin-Account-Main-Table-Header'>
                  <div className='Admin-Account-Main-Table-Header-Title '>
                    {' '}
                    Account ID{' '}
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title '>
                    {' '}
                    User name{' '}
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title '>
                    {' '}
                    Role{' '}
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title-Btn '>
                    {' '}
                    Action{' '}
                  </div>
                </div>

                {data
                  .filter(item => {
                    return search.toLowerCase() === ''
                      ? item
                      : item.user_name.toLowerCase().includes(search);
                  })
                  .map(item => (
                    <div
                      className='Admin-Account-Main-Table-Content-Row-Wrapper'
                      key={item.id}
                    >
                      <div className='Admin-Account-Main-Table-Content-Row '>
                        {' '}
                        {item.account_id}{' '}
                      </div>
                      <div className='Admin-Account-Main-Table-Content-Row '>
                        {' '}
                        {item.user_name}{' '}
                      </div>
                      <div className='Admin-Account-Main-Table-Content-Row '>
                        {' '}
                        {item.role}{' '}
                      </div>
                      <div className='Admin-Account-Main-Table-Content-Row '>
                        <span className='Admin-Account-Main-Table-Content-Btn_Wrapper '>
                          <button
                            type='button'
                            className='Admin-Account-Main-Table-Content-Btn'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModalEdit'
                          >
                            <BorderColorOutlinedIcon
                              sx={{
                                color: blue[400],
                              }}
                            />
                          </button>

                          <div
                            className='modal fade'
                            id='exampleModalEdit'
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
                                    Update Information
                                  </h1>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  <div className='Admin-Account-modal-update'>
                                    <div className='Admin-Account-modal-title-name'>
                                      {' '}
                                      Name{' '}
                                    </div>
                                    <div className='Admin-Account-modal-update-old'>
                                      <div className='Admin-Account-modal-initials'>
                                        Old name:{' '}
                                      </div>{' '}
                                      Leslie{' '}
                                    </div>
                                    <label className='Admin-Account-modal-update-new'>
                                      {' '}
                                      New name:{' '}
                                    </label>
                                    <input
                                      className='Admin-Account-input'
                                      placeholder='Username/Email'
                                    />
                                  </div>
                                  <div className='Admin-Account-modal-update'>
                                    <div className='Admin-Account-modal-title'>
                                      {' '}
                                      Email{' '}
                                    </div>
                                    <div className='Admin-Account-modal-update-old'>
                                      <div className='Admin-Account-modal-initials'>
                                        Old email:{' '}
                                      </div>{' '}
                                      Leslie23@gmail.com{' '}
                                    </div>
                                    <label className='Admin-Account-modal-update-new'>
                                      New email:{' '}
                                    </label>
                                    <input
                                      className='Admin-Account-input'
                                      type='email'
                                      placeholder='Example@gmail.com'
                                    />
                                  </div>
                                  <div className='Admin-Account-modal-update'>
                                    <div className='Admin-Account-modal-title'>
                                      {' '}
                                      Phone{' '}
                                    </div>
                                    <div className='Admin-Account-modal-update-old'>
                                      <div className='Admin-Account-modal-initials'>
                                        Old phone number:{' '}
                                      </div>{' '}
                                      0777123456
                                    </div>
                                    <label className='Admin-Account-modal-update-new'>
                                      New phone number:{' '}
                                    </label>
                                    <input
                                      className='Admin-Account-input'
                                      placeholder='Phone number'
                                    />
                                  </div>

                                  <div className='Admin-Account-modal-update'>
                                    <div className='Admin-Account-modal-title'>
                                      {' '}
                                      Role{' '}
                                    </div>
                                    <div className='Admin-Account-modal-update-old'>
                                      {' '}
                                      <div className='Admin-Account-modal-initials'>
                                        Old role:{' '}
                                      </div>{' '}
                                      Veterinarians{' '}
                                    </div>
                                    <label className='Admin-Account-modal-initials'>
                                      New role:{' '}
                                    </label>
                                    <select className='Admin-Account-input-role'>
                                      <option>Customer</option>
                                      <option>Veterinarians</option>
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
                                    Close
                                  </button>
                                  <button
                                    type='button'
                                    className='btn btn-success'
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>

                        <span className='Admin-Account-Main-Table-Content-Btn_Wrapper '>
                          <button
                            type='button'
                            className='Admin-Account-Main-Table-Content-Btn'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModalDelete'
                          >
                            <DeleteOutlineIcon
                              sx={{
                                color: red[400],
                              }}
                            />
                          </button>

                          <div
                            className='modal fade'
                            id='exampleModalDelete'
                            tabIndex='-1'
                            aria-labelledby='exampleModalLabelDelete'
                            aria-hidden='true'
                          >
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <h1
                                    className='modal-title fs-5'
                                    id='exampleModalLabelDelete'
                                  >
                                    Delete Account
                                  </h1>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  <div className='Admin-Account-modal-delete'>
                                    {' '}
                                    <div className='Admin-Account-modal-delete-title'>
                                      Account ID:{' '}
                                    </div>{' '}
                                    A00001{' '}
                                  </div>
                                  <div className='Admin-Account-modal-delete'>
                                    {' '}
                                    <div className='Admin-Account-modal-delete-title'>
                                      Name:{' '}
                                    </div>{' '}
                                    Leslie{' '}
                                  </div>
                                  <div className='Admin-Account-modal-delete'>
                                    {' '}
                                    <div className='Admin-Account-modal-delete-title'>
                                      User name:{' '}
                                    </div>{' '}
                                    leslie123{' '}
                                  </div>
                                  <div className='Admin-Account-modal-delete'>
                                    <div className='Admin-Account-modal-delete-title'>
                                      Email:{' '}
                                    </div>{' '}
                                    Leslie23@gmail.com{' '}
                                  </div>
                                  <div className='Admin-Account-modal-delete'>
                                    <div className='Admin-Account-modal-delete-title'>
                                      Phone number:{' '}
                                    </div>{' '}
                                    0777123456{' '}
                                  </div>
                                  <div className='Admin-Account-modal-delete'>
                                    <div className='Admin-Account-modal-delete-title'>
                                      Role:{' '}
                                    </div>{' '}
                                    Veterinarians{' '}
                                  </div>
                                </div>
                                <div className='modal-footer'>
                                  <button
                                    type='button'
                                    className='btn btn-secondary'
                                    data-bs-dismiss='modal'
                                  >
                                    Close
                                  </button>
                                  <button
                                    type='button'
                                    className='btn btn-danger'
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>

                        <span className='Admin-Account-Main-Table-Content-Btn_Wrapper '>
                          <button
                            type='button'
                            className='Admin-Account-Main-Table-Content-Btn'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModalMore'
                          >
                            <MoreVertOutlinedIcon
                              sx={{
                                color: green[400],
                              }}
                            />
                          </button>

                          <div
                            className='modal fade'
                            id='exampleModalMore'
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
                                    Account Information
                                  </h1>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  <div className='Admin-Account-modal-more'>
                                    {' '}
                                    <div className='Admin-Account-modal-more-title'>
                                      Account ID:{' '}
                                    </div>{' '}
                                    A00001{' '}
                                  </div>
                                  <div className='Admin-Account-modal-more'>
                                    {' '}
                                    <div className='Admin-Account-modal-more-title'>
                                      Name:{' '}
                                    </div>{' '}
                                    Leslie{' '}
                                  </div>
                                  <div className='Admin-Account-modal-more'>
                                    {' '}
                                    <div className='Admin-Account-modal-more-title'>
                                      User name:{' '}
                                    </div>{' '}
                                    leslie123{' '}
                                  </div>
                                  <div className='Admin-Account-modal-more'>
                                    <div className='Admin-Account-modal-more-title'>
                                      Email:{' '}
                                    </div>{' '}
                                    Leslie23@gmail.com{' '}
                                  </div>
                                  <div className='Admin-Account-modal-more'>
                                    <div className='Admin-Account-modal-more-title'>
                                      Phone number:{' '}
                                    </div>{' '}
                                    0777123456{' '}
                                  </div>
                                  <div className='Admin-Account-modal-more'>
                                    <div className='Admin-Account-modal-more-title'>
                                      Role:{' '}
                                    </div>{' '}
                                    Veterinarians{' '}
                                  </div>
                                </div>
                                <div className='modal-footer'>
                                  <button
                                    type='button'
                                    className='btn btn-secondary'
                                    data-bs-dismiss='modal'
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  ))}

                <div className='Admin-Account-Pagination'>
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

export default AdminAccount;
