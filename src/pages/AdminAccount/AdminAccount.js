import './AdminAccount.css';
// React
import React, { useState, useRef, useContext, useEffect } from 'react';
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
import axiosInstance from '../../utils/axiosInstance';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';

function AdminAccount() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentAccount, setCurrentAccount] = useState(null);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/admin/getAllAccounts`,
        );
        const sortDate = response.data.sort((a, b) =>
          b.accountID.localeCompare(a.accountID),
        );
        setAccountData(sortDate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooking();
  }, []);

  const [newAccount, setNewAccount] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
    role: 'Customer',
  });

  const [editAccount, setEditAccount] = useState({
    name: '',
    email: '',
    phone: '',
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
    const re = /^.{8,}$/;
    return re.test(String(password));
  };

  const validatePhone = phone => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phone));
  };

  const handleSaveChanges = async () => {
    const newErrors = {};
    if (!editAccount.name) newErrors.name = 'Name is required';
    if (!editAccount.email) newErrors.email = 'Email is required';
    else if (!validateEmail(editAccount.email))
      newErrors.email = 'Invalid email format - Ex: Example@gmail.com';
    if (!editAccount.phone) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(editAccount.phone))
      newErrors.phone = 'Invalid phone number format';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/admin/updateAccountInfo`,
      editAccount,
    );
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_API_URL}/admin/getAllAccounts`,
    );
    const sortDate = response.data.sort((a, b) =>
      b.accountID.localeCompare(a.accountID),
    );
    setAccountData(sortDate);
    setErrors({});
    const modal = bootstrap.Modal.getInstance(
      document.getElementById(`exampleModalEdit-${editAccount.accountID}`),
    );
    if (modal) {
      modal.hide();
    }
  };

  const openEditModal = account => {
    if (account.role === 'Customer') {
      setCurrentAccount({
        ...account?.customerDetails[0],
        role: account?.role,
      });
      setEditAccount({
        accountID: account?.customerDetails[0]?.accountID,
        name: account?.customerDetails[0]?.name,
        email: account?.customerDetails[0]?.email,
        phone: account?.customerDetails[0]?.phone,
        role: account?.role,
      });
    } else if (account.role === 'Staff') {
      setCurrentAccount({ ...account?.staffDetails[0], role: account?.role });
      setEditAccount({
        accountID: account?.staffDetails[0]?.accountID,
        name: account?.staffDetails[0]?.name,
        email: account?.staffDetails[0]?.email,
        phone: account?.staffDetails[0]?.phone,
        role: account?.role,
      });
    } else if (account.role === 'Doctor') {
      setCurrentAccount({ ...account?.doctorDetails[0], role: account?.role });
      setEditAccount({
        accountID: account?.doctorDetails[0]?.accountID,
        name: account?.doctorDetails[0]?.name,
        email: account?.doctorDetails[0]?.email,
        phone: account?.doctorDetails[0]?.phone,
        role: account?.role,
      });
    } else if (account.role === 'Admin') {
      setCurrentAccount({ ...account?.adminDetails[0], role: account?.role });
      setEditAccount({
        accountID: account?.adminDetails[0]?.accountID,
        name: account?.adminDetails[0]?.name,
        email: account?.adminDetails[0]?.email,
        phone: account?.adminDetails[0]?.phone,
        role: account?.role,
      });
    }
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

  const handleAddAccount = async () => {
    const newErrors = {};
    if (!newAccount.username) newErrors.username = 'User name is required';
    if (!newAccount.password) newErrors.password = 'Password is required';
    else if (!validatePassword(newAccount.password))
      newErrors.password = 'The minimum length is 8 characters';
    if (!newAccount.confirmPassword)
      newErrors.confirmPassword = 'Confirm password is required';
    if (newAccount.password !== newAccount.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!newAccount.name) newErrors.name = 'Name is required';
    if (!newAccount.email) newErrors.email = 'Email is required';
    else if (!validateEmail(newAccount.email))
      newErrors.email = 'Invalid email format - Ex: Example@gmail.com';
    if (!newAccount.phone) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(newAccount.phone))
      newErrors.phone = 'Invalid phone number format';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newAccountData = {
      ...newAccount,
    };
    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/admin/addAccount`,
        newAccountData,
      );
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/admin/getAllAccounts`,
      );
      const sortDate = response.data.sort((a, b) =>
        b.accountID.localeCompare(a.accountID),
      );
      setAccountData(sortDate);
      setErrors({});
      setNewAccount({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        phone: '',
        role: 'Customer',
      });
      const modal = bootstrap.Modal.getInstance(modalRef.current);
      if (modal) {
        modal.hide();
      }
    } catch (error) {
      if (error.response) {
        setErrors({ server: error.response.data.message });
      } else {
        console.error('Error:', error);
      }
    }
  };

  const handleStatusChange = async account => {
    try {
      await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/admin/updateAccount`,
        account,
      );
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/admin/getAllAccounts`,
      );
      const sortDate = response.data.sort((a, b) =>
        b.accountID.localeCompare(a.accountID),
      );
      setAccountData(sortDate);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredAccountData = accountData.filter(account => {
    const matchesRole = roleFilter === 'All' || account.role === roleFilter;
    const matchesSearch =
      search === '' ||
      account.username.toLowerCase().includes(search.toLowerCase());
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
              <div className='Admin-Account-Header-Account-Text'>
                {' '}
                Hi {user.adminDetails[0].name}
              </div>
            </div>
          </div>
        </div>

        <div className='Admin-Account-Content row'>
          <div className='Admin-Account-Navigate col-md-2'>
            <Sidebar />
          </div>

          <div className='Admin-Account-Main col-md-10'>
            <Statistic />
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
                      className='Admin-Account-Main-Search-Input'
                      onChange={e => setSearch(e.target.value)}
                    />
                    <button className='Admin-Account-Main-Search-Button'>
                      <img
                        src={icon_search}
                        alt=''
                      />
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
                      <option>Doctor</option>
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
                                User name
                              </div>
                              <label className='Admin-Account-modal-add'>
                                User name:
                              </label>
                              <input
                                className='Admin-Account-input'
                                name='username'
                                value={newAccount.username}
                                onChange={handleNewAccountChange}
                                placeholder='Username'
                              />
                              {errors.username && (
                                <div className='Admin-Account-Error'>
                                  {errors.username}
                                </div>
                              )}
                              {errors.server && (
                                <div className='error-message'>
                                  {errors.server}
                                </div>
                              )}
                            </div>

                            <div className='Admin-Account-modal-add-account'>
                              <div className='Admin-Account-modal-title-name'>
                                Password
                              </div>
                              <label className='Admin-Account-modal-add'>
                                Password:
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
                                  Confirm password:
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
                                Name
                              </div>
                              <label className='Admin-Account-modal-add'>
                                Name:
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
                                Email
                              </div>
                              <label className='Admin-Account-modal-add'>
                                Email:
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
                                Phone Number
                              </div>
                              <label className='Admin-Account-modal-add'>
                                Phone Number:
                              </label>
                              <input
                                className='Admin-Account-input'
                                name='phone'
                                value={newAccount.phone}
                                onChange={handleNewAccountChange}
                                placeholder='Phone Number'
                              />
                              {errors.phone && (
                                <div className='Admin-Account-Error'>
                                  {errors.phone}
                                </div>
                              )}
                            </div>

                            <div className='Admin-Account-modal-add-account'>
                              <div className='Admin-Account-modal-title-name'>
                                Role
                              </div>
                              <label className='Admin-Account-modal-add'>
                                Role:
                              </label>
                              <select
                                className='Admin-Account-input-role'
                                name='role'
                                value={newAccount.role}
                                onChange={handleNewAccountChange}
                              >
                                <option>Customer</option>
                                <option>Doctor</option>
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
                              onClick={handleAddAccount}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='Admin-Account-Main-Table-Header'>
                  <div className='Admin-Account-Main-Table-Header-Title'>
                    Account ID
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title'>
                    User name
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title'>
                    Role
                  </div>
                  <div className='Admin-Account-Main-Table-Header-Title-Btn'>
                    Action
                  </div>
                </div>

                {filteredAccountData.map(item => (
                  <div
                    className='Admin-Account-Main-Table-Content-Row-Wrapper'
                    key={item.accountID}
                  >
                    <div className='Admin-Account-Main-Table-Content-Row'>
                      {item.accountID}
                    </div>
                    <div className='Admin-Account-Main-Table-Content-Row'>
                      {item.username}
                    </div>
                    <div className='Admin-Account-Main-Table-Content-Row'>
                      {item.role}
                    </div>
                    <div className='Admin-Account-Main-Table-Content-Row-Action'>
                      <span className='Admin-Account-Main-Table-Content-Btn_Wrapper'>
                        <button
                          type='button'
                          className='Admin-Account-Main-Table-Content-Btn'
                          data-bs-toggle='modal'
                          data-bs-target={`#exampleModalEdit-${item.accountID}`}
                          onClick={() => openEditModal(item)}
                        >
                          <BorderColorOutlinedIcon sx={{ color: blue[400] }} />
                        </button>
                        <div
                          className='modal fade'
                          id={`exampleModalEdit-${item.accountID}`}
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
                                    Name
                                  </div>
                                  <div className='Admin-Account-modal-update-old'>
                                    <div className='Admin-Account-modal-initials'>
                                      Old name:
                                    </div>
                                    {currentAccount?.name}
                                  </div>
                                  <label className='Admin-Account-modal-update-new'>
                                    New name:
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
                                    Email
                                  </div>
                                  <div className='Admin-Account-modal-update-old'>
                                    <div className='Admin-Account-modal-initials'>
                                      Old email:
                                    </div>
                                    {currentAccount?.email}
                                  </div>
                                  <label className='Admin-Account-modal-update-new'>
                                    New email:
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
                                    Phone
                                  </div>
                                  <div className='Admin-Account-modal-update-old'>
                                    <div className='Admin-Account-modal-initials'>
                                      Old phone number:
                                    </div>
                                    {currentAccount?.phone}
                                  </div>
                                  <label className='Admin-Account-modal-update-new'>
                                    New phone number:
                                  </label>
                                  <input
                                    className='Admin-Account-input'
                                    name='phone'
                                    value={editAccount.phone}
                                    onChange={handleEditAccountChange}
                                    placeholder='Phone number'
                                  />
                                  {errors.phone && (
                                    <div className='Admin-Account-Error'>
                                      {errors.phone}
                                    </div>
                                  )}
                                </div>

                                <div className='Admin-Account-modal-update'>
                                  <div className='Admin-Account-modal-title'>
                                    Role
                                  </div>
                                  {editAccount.role}
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
                                    onClick={handleSaveChanges}
                                  >
                                    Save changes
                                  </button>
                                </div>
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
                          data-bs-target={`#exampleModalMore-${item.accountID}`}
                        >
                          <MoreVertOutlinedIcon sx={{ color: green[400] }} />
                        </button>
                        <div
                          className='modal fade'
                          id={`exampleModalMore-${item.accountID}`}
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
                                  <div className='Admin-Account-modal-more-title'>
                                    Account ID:
                                  </div>
                                  {item.accountID}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    Name:
                                  </div>
                                  {item.role === 'Customer' ? (
                                    item?.customerDetails[0]?.name
                                  ) : item?.role === 'Staff' ? (
                                    item?.staffDetails[0]?.name
                                  ) : item?.role === 'Admin' ? (
                                    item?.adminDetails[0]?.name
                                  ) : item?.role === 'Doctor' ? (
                                    item?.doctorDetails[0]?.name
                                  ) : (
                                    <span>Nothing</span>
                                  )}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    User name:
                                  </div>
                                  {item.username}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    Email:
                                  </div>
                                  {item?.role === 'Customer' ? (
                                    item?.customerDetails[0]?.email
                                  ) : item?.role === 'Staff' ? (
                                    item?.staffDetails[0]?.email
                                  ) : item?.role === 'Admin' ? (
                                    item?.adminDetails[0]?.email
                                  ) : item?.role === 'Doctor' ? (
                                    item?.doctorDetails[0]?.email
                                  ) : (
                                    <span>Nothing</span>
                                  )}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    Phone number:
                                  </div>
                                  {item?.role === 'Customer' ? (
                                    item?.customerDetails[0]?.phone
                                  ) : item?.role === 'Staff' ? (
                                    item?.staffDetails[0]?.phone
                                  ) : item?.role === 'Admin' ? (
                                    item?.adminDetails[0]?.phone
                                  ) : item?.role === 'Doctor' ? (
                                    item?.doctorDetails[0]?.phone
                                  ) : (
                                    <span>Nothing</span>
                                  )}
                                </div>
                                <div className='Admin-Account-modal-more'>
                                  <div className='Admin-Account-modal-more-title'>
                                    Role:
                                  </div>
                                  {item?.role}
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
                      <span className='Admin-Account-Main-Table-Content-Btn_Wrapper'>
                        <Switch
                          checked={item.status}
                          onChange={() => handleStatusChange(item)}
                          color={item.status ? 'success' : 'neutral'}
                          variant={item.status ? 'solid' : 'outlined'}
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
