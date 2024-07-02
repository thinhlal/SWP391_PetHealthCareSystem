import './AdminCages.css';
// React
import React, { useState, useRef } from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

// Img
import logo_pet_health_care from '../../assets/images/img_AdminCages/logo_pethealthcare.png';
import icon_search from '../../assets/images/img_AdminCages/icon_search.svg';
import Statistic from '../../components/Admin/Statistics/Statistics';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';

// MUI
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// import Switch from '@mui/joy/Switch';
import { blue } from '@mui/material/colors';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Switch from '@mui/joy/Switch';


function AdminCages() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
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
            <Sidebar />
          </div>

          <div className='Admin-Cages-Main col-md-10'>
            <Statistic />
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
