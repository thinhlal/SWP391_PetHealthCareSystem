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
  const [vaccineData, setVaccineData] = useState([]);

  const [newVaccine, setNewVaccine] = useState({
    name: '',
    notes: '',
    nextDate: 0,
    quantity: 0,
  });

  const [editVaccine, setEditVaccine] = useState({
    vaccinationID: '',
    name: '',
    notes: '',
    nextDate: 0,
    quantity: 0,
    status: false,
  });
  const modalRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/vaccine/getAllVaccines`,
        );
        console.log(response.data);
        setVaccineData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVaccines();
  }, []);

  const handleNewVaccineChange = e => {
    const { name, value } = e.target;
    setNewVaccine(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  const handleEditVaccineChange = e => {
    const { name, value } = e.target;
    setEditVaccine(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddVaccine = async () => {
    const newErrors = {};
    if (!newVaccine.name) newErrors.name = 'Name is required';
    const duplicateVaccineName = await checkDuplicateName(editVaccine.name);
    if (duplicateVaccineName) newErrors.name = 'Cage name already exists';
    if (!newVaccine.notes) newErrors.notes = 'Notes is required';
    if (parseInt(newVaccine.nextDate) < 0)
      newErrors.nextDate = 'NextDate should greater than or equal to zero';
    if (parseInt(newVaccine.quantity) < 0)
      newErrors.quantity = 'Quantity should greater than or equal to zero';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/vaccine/addVaccine`,
        newVaccine,
      );
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/vaccine/getAllVaccines`,
      );
      setVaccineData(response.data);
    } catch (error) {
      console.error(error);
    }

    setNewVaccine({
      name: '',
      notes: '',
      nextDate: 0,
      quantity: 0,
    });

    setErrors({});
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    if (modal) {
      modal.hide();
    }
  };

  const checkDuplicateName = async phone => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/vaccine/checkDuplicateName`,
        { params: { name: newVaccine.name.trim().toLowerCase() } },
      );
      return response.data.exists;
    } catch (error) {
      return false;
    }
  };

  const handleSaveChangesUpdate = async () => {
    const newErrors = {};
    if (!editVaccine.name) newErrors.name = 'Name is required';
    const duplicateVaccineName = await checkDuplicateName(editVaccine.name);
    if (duplicateVaccineName) newErrors.name = 'Cage name already exists';
    if (!editVaccine.notes) newErrors.notes = 'Notes is required';
    if (editVaccine.nextDate < 0)
      newErrors.nextDate = 'NextDate should greater than or equal to zero';
    if (editVaccine.quantity < 0)
      newErrors.quantity = 'Quantity should greater than or equal to zero';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/vaccine/updateVaccineAdmin`,
        editVaccine,
      );
    } catch (error) {
      console.error(error);
    }

    const updatedVaccineData = vaccineData.map(vaccine => {
      if (vaccine.vaccinationID === editVaccine.vaccinationID) {
        return { ...vaccine, ...editVaccine };
      }
      return vaccine;
    });
    setVaccineData(updatedVaccineData);
    setErrors({});
    const modal = bootstrap.Modal.getInstance(
      document.getElementById(`exampleModalEdit-${editVaccine.vaccinationID}`),
    );
    if (modal) {
      modal.hide();
    }
  };

  const openEditModal = vaccine => {
    setEditVaccine({
      vaccinationID: vaccine.vaccinationID,
      name: vaccine.name,
      notes: vaccine.notes,
      nextDate: vaccine.nextDate,
      quantity: vaccine.quantity,
      status: vaccine.status,
    });
  };

  const handleStatusChange = async (vaccinationID, status, quantity) => {
    if (quantity <= 0) {
      alert('Vaccine out of stock!!!');
      return;
    }
    try {
      await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/vaccine/updateStatusVaccine`,
        { vaccinationID, status: !status },
      );
      setVaccineData(prevState =>
        prevState.map(vaccine =>
          vaccine.vaccinationID === vaccinationID
            ? { ...vaccine, status: !status }
            : vaccine,
        ),
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStatusFilterChange = event => {
    setStatusFilter(event.target.value);
  };

  const filteredVaccineData = vaccineData.filter(vaccine => {
    const status = vaccine.quantity > 0 ? 'In stock' : 'Out of stock';
    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    const matchesSearch =
      search === '' ||
      vaccine.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVaccines = filteredVaccineData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const totalPages = Math.ceil(filteredVaccineData.length / itemsPerPage);

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
                <div className='Admin-Vaccine-Main-Table-Title'>
                  VACCINES LIST
                </div>
                <div className='Admin-Vaccine-Main-Table-Title-Text'>
                  Vaccines Information
                </div>
                <div className='Admin-Vaccine-Main-Filter'>
                  <div className='Admin-Vaccine-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Vaccine Name'
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
                      <option>In stock</option>
                      <option>Out of stock</option>
                    </select>
                  </div>

                  <div className='Admin-Vaccine-Add-Cages'>
                    <button
                      type='button'
                      className='Admin-Vaccine-add-pet-btn'
                      data-bs-toggle='modal'
                      data-bs-target='#Admin-Vaccine-exampleModal'
                    >
                      Add Vaccine
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
                              Add Vaccine
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
                                type='text'
                                className='Admin-Vaccine-input'
                                name='name'
                                value={newVaccine.name}
                                onChange={handleNewVaccineChange}
                                placeholder='Name'
                                required
                              />
                              {errors.name && (
                                <div className='Admin-Vaccine-Error'>
                                  {errors.name}
                                </div>
                              )}
                            </div>
                            <div className='Admin-Vaccine-modal-add-account'>
                              <div className='Admin-Vaccine-modal-title-name'>
                                Notes
                              </div>
                              <input
                                type='text'
                                className='Admin-Vaccine-input'
                                name='notes'
                                value={newVaccine.notes}
                                onChange={handleNewVaccineChange}
                                placeholder='Notes'
                                required
                              />
                              {errors.notes && (
                                <div className='Admin-Vaccine-Error'>
                                  {errors.notes}
                                </div>
                              )}
                            </div>
                            <div className='Admin-Vaccine-modal-add-account'>
                              <div className='Admin-Vaccine-modal-title-name'>
                                Quantity
                              </div>
                              <input
                                type='number'
                                className='Admin-Vaccine-input'
                                name='quantity'
                                value={newVaccine.quantity}
                                onChange={handleNewVaccineChange}
                                placeholder='Quantity'
                              />
                              {errors.quantity && (
                                <div className='Admin-Vaccine-Error'>
                                  {errors.quantity}
                                </div>
                              )}
                            </div>
                            <div className='Admin-Vaccine-modal-add-account'>
                              <div className='Admin-Vaccine-modal-title-name'>
                                Years until next vaccination:
                              </div>
                              <input
                                type='number'
                                className='Admin-Vaccine-input'
                                name='nextDate'
                                value={newVaccine.nextDate}
                                onChange={handleNewVaccineChange}
                                placeholder='Next Year'
                              />
                              {errors.nextDate && (
                                <div className='Admin-Vaccine-Error'>
                                  {errors.nextDate}
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
                              onClick={handleAddVaccine}
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
                    Vaccination ID
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title'>
                    Name
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title'>
                    Notes
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title'>
                    Quantity
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title'>
                    Years until next vaccination
                  </div>
                  <div className='Admin-Vaccine-Main-Table-Header-Title-Btn'>
                    Action
                  </div>
                </div>

                {currentVaccines.length > 0 ? (
                  currentVaccines.map(item => (
                    <div
                      className='Admin-Vaccine-Main-Table-Content-Row-Wrapper'
                      key={item.vaccinationID}
                    >
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.vaccinationID}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.name}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.notes}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.quantity}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row'>
                        {item.nextDate}
                      </div>
                      <div className='Admin-Vaccine-Main-Table-Content-Row-Action'>
                        <span className='Admin-Vaccine-Main-Table-Content-Btn_Wrapper'>
                          <button
                            type='button'
                            className='Admin-Vaccine-Main-Table-Content-Btn'
                            data-bs-toggle='modal'
                            data-bs-target={`#exampleModalEdit-${item.vaccinationID}`}
                            onClick={() => openEditModal(item)}
                          >
                            <BorderColorOutlinedIcon
                              sx={{ color: blue[400] }}
                            />
                          </button>

                          <div
                            className='modal fade'
                            id={`exampleModalEdit-${item.vaccinationID}`}
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
                                    Edit Vaccine
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
                                    <input
                                      className='Admin-Vaccine-input'
                                      name='name'
                                      value={editVaccine.name}
                                      onChange={handleEditVaccineChange}
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
                                      Notes
                                    </div>
                                    <input
                                      className='Admin-Vaccine-input'
                                      name='notes'
                                      value={editVaccine.notes}
                                      onChange={handleEditVaccineChange}
                                      placeholder='Notes'
                                    />
                                    {errors.notes && (
                                      <div className='Admin-Vaccine-Error'>
                                        {errors.notes}
                                      </div>
                                    )}
                                  </div>
                                  <div className='Admin-Vaccine-modal-update'>
                                    <div className='Admin-Vaccine-modal-title'>
                                      Quantity
                                    </div>
                                    <input
                                      type='number'
                                      className='Admin-Vaccine-input'
                                      name='quantity'
                                      value={editVaccine.quantity}
                                      onChange={handleEditVaccineChange}
                                    />
                                    {errors.quantity && (
                                      <div className='Admin-Vaccine-Error'>
                                        {errors.quantity}
                                      </div>
                                    )}
                                  </div>
                                  <div className='Admin-Vaccine-modal-update'>
                                    <div className='Admin-Vaccine-modal-title'>
                                      Years until next vaccination
                                    </div>
                                    <input
                                      className='Admin-Vaccine-input'
                                      type='number'
                                      name='nextDate'
                                      value={editVaccine.nextDate}
                                      onChange={handleEditVaccineChange}
                                    />
                                    {errors.nextDate && (
                                      <div className='Admin-Vaccine-Error'>
                                        {errors.nextDate}
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
                                    onClick={handleSaveChangesUpdate}
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>

                        <Switch
                          checked={item.status && item.quantity > 0}
                          onChange={() =>
                            handleStatusChange(
                              item.vaccinationID,
                              item.status,
                              item.quantity,
                            )
                          }
                          color={item.status ? 'success' : 'neutral'}
                          variant={item.status ? 'solid' : 'outlined'}
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
                  {currentVaccines.length > 0 && totalPages > 1 && (
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
