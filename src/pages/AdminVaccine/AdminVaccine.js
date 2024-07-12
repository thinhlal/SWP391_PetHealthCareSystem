import './AdminVaccine.css';
// React
import React, { useState, useRef, useEffect } from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

// Img
import icon_search from '../../assets/images/img_AdminVaccine/icon_search.svg';
import Statistic from '../../components/Admin/Statistics/Statistics';

//Components
import Header from '../../components/Admin/Header/Header';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import Pagination from '@mui/material/Pagination';

// MUI
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { blue } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import axiosInstance from '../../utils/axiosInstance';
import { Switch } from '@mui/material';

function AdminVaccine() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [errors, setErrors] = useState({});
  const [cageData, setCageData] = useState([]);

  const [newCage, setNewCage] = useState({
    name: '',
    description: '',
  });

  const [editCage, setEditCage] = useState({
    cageID: '',
    name: '',
    description: '',
  });
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCages = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/cage/getAllCagesByAdmin`,
        );
        console.log(response.data);
        setCageData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCages();
  }, []);

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

  const handleAddCage = async () => {
    const newErrors = {};
    if (!newCage.name) newErrors.name = 'Name is required';
    if (!newCage.description) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/cage/addCage`,
        {
          newCage,
        },
      );
    } catch (error) {
      console.error(error);
    }

    setNewCage({
      name: '',
      description: '',
    });

    setErrors({});
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    if (modal) {
      modal.hide();
    }
  };

  const handleSaveChanges = async () => {
    const newErrors = {};
    if (!editCage.name) newErrors.name = 'Name is required';
    if (!editCage.description)
      newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/cage/updateCageAdmin`,
        {
          editCage,
        },
      );
    } catch (error) {
      console.error(error);
    }

    const updatedCageData = cageData.map(cage => {
      if (cage.cageID === editCage.cageID) {
        return { ...cage, ...editCage };
      }
      return cage;
    });
    setCageData(updatedCageData);
    setErrors({});
    const modal = bootstrap.Modal.getInstance(
      document.getElementById(`exampleModalEdit-${editCage.cageID}`),
    );
    if (modal) {
      modal.hide();
    }
  };

  const openEditModal = cage => {
    setEditCage({
      cageID: cage.cageID,
      name: cage.name,
      description: cage.description,
    });
  };

  const handleStatusChange = async (cageID, status, empty) => {
    if (!empty) {
      return window.confirm('Can not set status while Using');
    }
    try {
      await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/cage/updateStatusCage`,
        { cageID, status: !status },
      );
      setCageData(prevState =>
        prevState.map(cage =>
          cage.cageID === cageID ? { ...cage, status: !status } : cage,
        ),
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStatusFilterChange = event => {
    setStatusFilter(event.target.value);
  };

  const filteredCageData = cageData.filter(cage => {
    const status = cage.isEmpty ? 'Empty' : 'Using';
    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    const matchesSearch =
      search === '' || cage.cageID.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCages = filteredCageData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const totalPages = Math.ceil(filteredCageData.length / itemsPerPage);

  return (
    <div className='Admin-Vaccine container-fluid'>
      <div className='row'>
        <Header />
        <div className='Admin-Vaccine-Content row'>
          <div className='Admin-Vaccine-Navigate col-md-2'>
            <Sidebar />
          </div>
          <div className='Admin-Vaccine-Main col-md-10'>
            <Statistic />
            <div className='Admin-Vaccine-Main-Table-Wrapper'>
              <div className='Admin-Vaccine-Main-Table'>
                <div className='Admin-Vaccine-Main-Table-Title'> Cage List </div>
                <div className='Admin-Vaccine-Main-Table-Title-Text'>
                  Cages Information
                </div>
                <div className='Admin-Vaccine-Main-Filter'>
                  <div className='Admin-Vaccine-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Cage ID'
                      className='Admin-Vaccine-Main-Search-Input'
                      onChange={e => setSearch(e.target.value)}
                    />
                    <button className='Admin-Vaccine-Main-Search-Button'>
                      <img
                        src={icon_search}
                        alt=''
                      />
                    </button>
                  </div>
                  <div className='Admin-Vaccine-Select-Role'>
                    <FilterAltIcon sx={{ fontSize: 20 }} />
                    Select status:
                    <select
                      className='Admin-Vaccine-Select-Filter'
                      name='role'
                      onChange={handleStatusFilterChange}
                      value={statusFilter}
                    >
                      <option>All</option>
                      <option>Using</option>
                      <option>Empty</option>
                    </select>
                  </div>

                  <div className='Admin-Vaccine-Add-Cages'>
                    <button
                      type='button'
                      className='Admin-Vaccine-add-pet-btn'
                      data-bs-toggle='modal'
                      data-bs-target='#Admin-Vaccine-exampleModal'
                    >
                      Add Cage
                    </button>

                    <div
                      className='modal fade'
                      id='Admin-Vaccine-exampleModal'
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
                              Add Cage
                            </h1>
                            <button
                              type='button'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                            ></button>
                          </div>
                          <div className='modal-body'>
                            <div className='Admin-Vaccine-modal-add-account'>
                              <div className='Admin-Vaccine-modal-title-name'>
                                Name
                              </div>
                              <input
                                className='Admin-Vaccine-input'
                                name='name'
                                value={newCage.name}
                                onChange={handleNewCageChange}
                                placeholder='Name'
                              />
                              {errors.name && (
                                <div className='Admin-Vaccine-Error'>
                                  {errors.name}
                                </div>
                              )}
                            </div>
                            <div className='Admin-Vaccine-modal-add-account'>
                              <div className='Admin-Vaccine-modal-title-name'>
                                Description
                              </div>
                              <input
                                className='Admin-Vaccine-input'
                                name='description'
                                value={newCage.description}
                                onChange={handleNewCageChange}
                                placeholder='Description'
                              />
                              {errors.description && (
                                <div className='Admin-Vaccine-Error'>
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
                              Close
                            </button>
                            <button
                              type='button'
                              className='btn btn-success'
                              onClick={handleAddCage}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='Admin-Vaccine-Main-Table-Header'>
                  <div className='Admin-Vaccine-Main-Table-Header-Title'>
                    Cage ID
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title'>
                    Name
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title'>
                    Description
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title'>
                    Status
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title-Btn'>
                    Action
                  </div>
                </div>

                {currentCages.length > 0 ? (
                  currentCages.map(item => (
                    <div
                      className='Admin-Vaccine-Main-Table-Content-Row-Wrapper'
                      key={item.cageID}
                    >
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.cageID}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.name}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.description}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.isEmpty ? (
                          <span className='Admin-Vaccine-Empty'>Empty</span>
                        ) : (
                          <span className='Admin-Vaccine-Using'>Using</span>
                        )}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row-Action'>
                        <span className='Admin-Vaccine-Main-Table-Content-Btn_Wrapper'>
                          <button
                            type='button'
                            className='Admin-Vaccine-Main-Table-Content-Btn'
                            data-bs-toggle='modal'
                            data-bs-target={`#exampleModalEdit-${item.cageID}`}
                            onClick={() => openEditModal(item)}
                          >
                            <BorderColorOutlinedIcon
                              sx={{ color: blue[400] }}
                            />
                          </button>

                          <div
                            className='modal fade'
                            id={`exampleModalEdit-${item.cageID}`}
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
                                    Edit Cage
                                  </h1>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  <div className='Admin-Vaccine-modal-update'>
                                    <div className='Admin-Vaccine-modal-title-name'>
                                      Name
                                    </div>
                                    <label className='Admin-Vaccine-modal-update-new'>
                                      Cage name:
                                    </label>
                                    <input
                                      className='Admin-Vaccine-input'
                                      name='name'
                                      value={editCage.name}
                                      onChange={handleEditCageChange}
                                      placeholder='Name'
                                    />
                                    {errors.name && (
                                      <div className='Admin-Vaccine-Error'>
                                        {errors.name}
                                      </div>
                                    )}
                                  </div>
                                  <div className='Admin-Vaccine-modal-update'>
                                    <div className='Admin-Vaccine-modal-title'>
                                      Description
                                    </div>
                                    <label className='Admin-Vaccine-modal-update-new'>
                                      Cage description:
                                    </label>
                                    <input
                                      className='Admin-Vaccine-input'
                                      name='description'
                                      value={editCage.description}
                                      onChange={handleEditCageChange}
                                      placeholder='Description'
                                    />
                                    {errors.description && (
                                      <div className='Admin-Vaccine-Error'>
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
                        </span>

                        <Switch
                          checked={item.status}
                          onChange={() =>
                            handleStatusChange(
                              item.cageID,
                              item.status,
                              item.isEmpty,
                            )
                          }
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
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='admin-no-content-available'>
                    No data available
                  </div>
                )}

                <div className='Admin-Vaccine-Pagination'>
                  {currentCages.length > 0 && totalPages > 1 && (
                    <Stack
                      spacing={2}
                      alignItems='center'
                    >
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color='primary'
                      />
                    </Stack>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminVaccine;
