import './AdminAccount.css';
// React
import React, { useState, useRef, useContext } from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
// Img
import logo_pet_health_care from '../../assets/images/img_AdminAccount/logo_pethealthcare.png';
import icon_search from '../../assets/images/img_AdminAccount/icon_search.svg';
import Statistic from '../../components/Admin/Statistics/Statistics';
// MUI
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Switch from '@mui/joy/Switch';
import { blue, green } from '@mui/material/colors';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../../context/AuthContext';

function AdminAccount() {
  const { logOut } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentAccount, setCurrentAccount] = useState(null);
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



  return (
    <div className='Admin-Account container-fluid'>
      <div className='row'>
        <div className='Admin-Account-Header row'>
          <div className='Admin-Account-Header-Logo col-md-2'>
            <img
              className='Admin-Account-Logo'
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
                <a href='/admin-dashboard'>
                  <div className='Admin-Account-Navigate-Text-Dashboard'>
                    {' '}
                    DashBoard{' '}
                  </div>
                </a>
              </div>
              <div className='Admin-Account-Navigate-Text-Rest'>
                <a href='/admin-dashboard'>
                  <div className='Admin-Account-Navigate-Text-Rest-Menu'>
                    {' '}
                    Booking{' '}
                  </div>
                </a>
                <a href='/admin-account'>
                  <div className='Admin-Account-Navigate-Text-Rest-Menu'>
                    {' '}
                    Account{' '}
                  </div>
                </a>
                <a href='/admin-services'>
                  <div className='Admin-Account-Navigate-Text-Rest-Menu'>
                    {' '}
                    Services{' '}
                  </div>
                </a>
                <a href='/admin-cages'>
                  <div className='Admin-Account-Navigate-Text-Rest-Menu'>
                    {' '}
                    Cages{' '}
                  </div>
                </a>
              </div>
            </div>

            <div onClick={logOut}>
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

          <div className='Admin-Account-Main col-md-10'>
            <Statistic />
            <div className='Admin-Account-Main-Table-Wrapper'>
              <div className='Admin-Account-Main-Table'>
                <div className='Admin-Account-Main-Table-Title'>
                  {' '}
                  Account List{' '}
                </div>
                <div className='Admin-Account-Main-Table-Title-Text'>
                  {' '}
                  Account Information{' '}
                </div>
                <div className='Admin-Account-Main-Filter'>
                  <div className='Admin-Account-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Name'
                      className='Admin-Account-Main-Search-Input'
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

                  <div className='Admin-Account-Add-Account'>
                    <button
                      type='button'
                      className='Admin-Account-add-pet-btn'
                      data-bs-toggle='modal'
                      data-bs-target='#Admin-Account-exampleModal'
                    >
                      Add Account
                    </button>

                    <div
                      className='modal fade'
                      id='Admin-Account-exampleModal'
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
                                name='user_name'
                                value={newAccount.user_name}
                                onChange={handleNewAccountChange}
                                placeholder='Username'
                              />
                              {errors.user_name && (
                                <div className='Admin-Account-Error'>
                                  {errors.user_name}
                                </div>
                              )}
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
                                name='password'
                                value={newAccount.password}
                                onChange={handleNewAccountChange}
                                placeholder='Password'
                              />
                              {errors.password && (
                                <div className='Admin-Account-Error'>
                                  {errors.password}
                                </div>
                              )}
                              <div className='Admin-Account-input-confirm'>
                                <label className='Admin-Account-modal-add'>
                                  {' '}
                                  Confirm password:{' '}
                                </label>
                                <input
                                  className='Admin-Account-input'
                                  type='password'
                                  name='confirmPassword'
                                  value={newAccount.confirmPassword}
                                  onChange={handleNewAccountChange}
                                  placeholder='Confirm password'
                                />
                                {errors.confirmPassword && (
                                  <div className='Admin-Account-Error'>
                                    {errors.confirmPassword}
                                  </div>
                                )}
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
                                name='name'
                                value={newAccount.name}
                                onChange={handleNewAccountChange}
                                placeholder='Name'
                              />
                              {errors.name && (
                                <div className='Admin-Account-Error'>
                                  {errors.name}
                                </div>
                              )}
                            </div>

                            <div className='Admin-Account-modal-add-account'>
                              <div className='Admin-Account-modal-title-name'>
                                {' '}
                                Email{' '}
                              </div>
                              <label className='Admin-Account-modal-add'>
                                {' '}
                                Email:{' '}
                              </label>
                              <input
                                className='Admin-Account-input'
                                type='email'
                                name='email'
                                value={newAccount.email}
                                onChange={handleNewAccountChange}
                                placeholder='Email'
                              />
                              {errors.email && (
                                <div className='Admin-Account-Error'>
                                  {errors.email}
                                </div>
                              )}
                            </div>

                            <div className='Admin-Account-modal-add-account'>
                              <div className='Admin-Account-modal-title-name'>
                                {' '}
                                Phone Number{' '}
                              </div>
                              <label className='Admin-Account-modal-add'>
                                {' '}
                                Phone Number:{' '}
                              </label>
                              <input
                                className='Admin-Account-input'
                                name='phoneNum'
                                value={newAccount.phoneNum}
                                onChange={handleNewAccountChange}
                                placeholder='Phone Number'
                              />
                              {errors.phoneNum && (
                                <div className='Admin-Account-Error'>
                                  {errors.phoneNum}
                                </div>
                              )}
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
                              <select
                                className='Admin-Account-input-role'
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

                <div className='Admin-Account-Main-Table-Header'>
                  <div className='Admin-Account-Main-Table-Header-Title'>
                    {' '}
                    Account ID{' '}
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title'>
                    {' '}
                    User name{' '}
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title'>
                    {' '}
                    Role{' '}
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title-Btn'>
                    {' '}
                    Action{' '}
                  </div>
                </div>

                {filteredAccountData.map(item => (
                  <div
                    className='Admin-Account-Main-Table-Content-Row-Wrapper'
                    key={item.id}
                  >
                    <div className='Admin-Account-Main-Table-Content-Row'>
                      {' '}
                      {item.account_id}{' '}
                    </div>
                    <div className='Admin-Account-Main-Table-Content-Row'>
                      {' '}
                      {item.user_name}{' '}
                    </div>
                    <div className='Admin-Account-Main-Table-Content-Row'>
                      {' '}
                      {item.role}{' '}
                    </div>
                    <div className='Admin-Account-Main-Table-Content-Row-Action'>
                      <span className='Admin-Account-Main-Table-Content-Btn_Wrapper'>
                        <button
                          type='button'
                          className='Admin-Account-Main-Table-Content-Btn'
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
                                <div className='Admin-Account-modal-update'>
                                  <div className='Admin-Account-modal-title-name'>
                                    {' '}
                                    Name{' '}
                                  </div>
                                  <div className='Admin-Account-modal-update-old'>
                                    <div className='Admin-Account-modal-initials'>
                                      {' '}
                                      Old name:{' '}
                                    </div>
                                    {currentAccount?.name}
                                  </div>
                                  <label className='Admin-Account-modal-update-new'>
                                    {' '}
                                    New name:{' '}
                                  </label>
                                  <input
                                    className='Admin-Account-input'
                                    name='name'
                                    value={editAccount.name}
                                    onChange={handleEditAccountChange}
                                    placeholder='Name'
                                  />
                                  {errors.name && (
                                    <div className='Admin-Account-Error'>
                                      {errors.name}
                                    </div>
                                  )}
                                </div>
                                <div className='Admin-Account-modal-update'>
                                  <div className='Admin-Account-modal-title'>
                                    {' '}
                                    Email{' '}
                                  </div>
                                  <div className='Admin-Account-modal-update-old'>
                                    <div className='Admin-Account-modal-initials'>
                                      {' '}
                                      Old email:{' '}
                                    </div>
                                    {currentAccount?.email}
                                  </div>
                                  <label className='Admin-Account-modal-update-new'>
                                    {' '}
                                    New email:{' '}
                                  </label>
                                  <input
                                    className='Admin-Account-input'
                                    type='email'
                                    name='email'
                                    value={editAccount.email}
                                    onChange={handleEditAccountChange}
                                    placeholder='Email'
                                  />
                                  {errors.email && (
                                    <div className='Admin-Account-Error'>
                                      {errors.email}
                                    </div>
                                  )}
                                </div>
                                <div className='Admin-Account-modal-update'>
                                  <div className='Admin-Account-modal-title'>
                                    {' '}
                                    Phone{' '}
                                  </div>
                                  <div className='Admin-Account-modal-update-old'>
                                    <div className='Admin-Account-modal-initials'>
                                      {' '}
                                      Old phone number:{' '}
                                    </div>
                                    {currentAccount?.phoneNum}
                                  </div>
                                  <label className='Admin-Account-modal-update-new'>
                                    {' '}
                                    New phone number:{' '}
                                  </label>
                                  <input
                                    className='Admin-Account-input'
                                    name='phoneNum'
                                    value={editAccount.phoneNum}
                                    onChange={handleEditAccountChange}
                                    placeholder='Phone number'
                                  />
                                  {errors.phoneNum && (
                                    <div className='Admin-Account-Error'>
                                      {errors.phoneNum}
                                    </div>
                                  )}
                                </div>

                                <div className='Admin-Account-modal-update'>
                                  <div className='Admin-Account-modal-title'>
                                    {' '}
                                    Role{' '}
                                  </div>
                                  <div className='Admin-Account-modal-update-old'>
                                    <div className='Admin-Account-modal-initials'>
                                      {' '}
                                      Old role:{' '}
                                    </div>
                                    {currentAccount?.role}
                                  </div>
                                  <label className='Admin-Account-modal-initials'>
                                    {' '}
                                    New role:{' '}
                                  </label>
                                  <select
                                    className='Admin-Account-input-role'
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

                      <span className='Admin-Account-Main-Table-Content-Btn_Wrapper'>
                        <button
                          type='button'
                          className='Admin-Account-Main-Table-Content-Btn'
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
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    {' '}
                                    Account ID:{' '}
                                  </div>
                                  {item.account_id}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    {' '}
                                    Name:{' '}
                                  </div>
                                  {item.name}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    {' '}
                                    User name:{' '}
                                  </div>
                                  {item.user_name}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    {' '}
                                    Email:{' '}
                                  </div>
                                  {item.email}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    {' '}
                                    Phone number:{' '}
                                  </div>
                                  {item.phoneNum}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
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
                      <span className='Admin-Account-Main-Table-Content-Btn_Wrapper'>
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
