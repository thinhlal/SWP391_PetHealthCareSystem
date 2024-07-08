import './AdminCages.css';
// React
import React, { useState, useRef, useEffect } from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

// Img
import icon_search from '../../assets/images/img_AdminCages/icon_search.svg';
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

function AdminCages() {
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

  const modalRef = useRef(null);

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
    <div className='Admin-Cages container-fluid'>
      <div className='row'>
        <Header />
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
                  Cages Information
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
                      <img
                        src={icon_search}
                        alt=''
                      />
                    </button>
                  </div>
                  <div className='Admin-Cages-Select-Role'>
                    <FilterAltIcon sx={{ fontSize: 20 }} />
                    Select status:
                    <select
                      className='Admin-Cages-Select-Filter'
                      name='role'
                      onChange={handleStatusFilterChange}
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
                            <div className='Admin-Cages-modal-add-account'>
                              <div className='Admin-Cages-modal-title-name'>
                                Name
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                Cage name:
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
                                Description
                              </div>
                              <label className='Admin-Cages-modal-add'>
                                Description:
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

                <div className='Admin-Cages-Main-Table-Header'>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    Cage ID
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    Name
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    Description
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title'>
                    Status
                  </div>
                  <div className='Admin-Cages-Main-Table-Header-Title-Btn'>
                    Action
                  </div>
                </div>

                {currentCages.length > 0 ? (
                  currentCages.map(item => (
                    <div
                      className='Admin-Cages-Main-Table-Content-Row-Wrapper'
                      key={item.cageID}
                    >
                      <div className='Admin-Cages-Main-Table-Content-Row'>
                        {item.cageID}
                      </div>
                      <div className='Admin-Cages-Main-Table-Content-Row'>
                        {item.name}
                      </div>
                      <div className='Admin-Cages-Main-Table-Content-Row'>
                        {item.description}
                      </div>
                      <div className='Admin-Cages-Main-Table-Content-Row'>
                        {item.isEmpty ? (
                          <span className='Admin-Cages-Empty'>Empty</span>
                        ) : (
                          <span className='Admin-Cages-Using'>Using</span>
                        )}
                      </div>
                      <div className='Admin-Cages-Main-Table-Content-Row-Action'>
                        <span className='Admin-Cages-Main-Table-Content-Btn_Wrapper'>
                          <button
                            type='button'
                            className='Admin-Cages-Main-Table-Content-Btn'
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
                                  <div className='Admin-Cages-modal-update'>
                                    <div className='Admin-Cages-modal-title-name'>
                                      Name
                                    </div>
                                    <label className='Admin-Cages-modal-update-new'>
                                      Cage name:
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
                                      Description
                                    </div>
                                    <label className='Admin-Cages-modal-update-new'>
                                      Cage description:
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
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='admin-no-content-available'>
                    No data available
                  </div>
                )}

                <div className='Admin-Cages-Pagination'>
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

export default AdminCages;
