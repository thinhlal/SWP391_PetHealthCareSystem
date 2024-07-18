//CSS
import './AdminServices.css';
//React
import React, { useState, useEffect, useRef } from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//Components
import Header from '../../components/Admin/Header/Header';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
import Statistic from '../../components/Admin/Statistics/Statistics';

//IMG
import icon_search from '../../assets/images/img_AdminServices/icon_search.svg';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { blue } from '@mui/material/colors';
import axiosInstance from '../../utils/axiosInstance';

function AdminServices() {
  const [search, setSearch] = useState('');
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [editService, setEditService] = useState({
    serviceID: '',
    name: '',
    description: '',
    price: '',
    status: '',
  });
  const [originalEditService, setOriginalEditService] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [addServiceErrors, setAddServiceErrors] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [editServiceErrors, setEditServiceErrors] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [servicesData, setServicesData] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const modalCloseButtonRef = useRef(null);
  const modalEditCloseButtonRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/service/getAllServices`,
        );
        setServicesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllServices();
  }, []);

  const validateInput = (name, value) => {
    let error = '';
    if (name === 'name' || name === 'description') {
      if (!value) {
        error = 'Please enter your information';
      } else {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
          error = 'Only letters and spaces are allowed';
        }
      }
    } else if (name === 'price') {
      if (!value || value === '$' || value.startsWith('0')) {
        error = 'Please enter a valid price';
      } else {
        const regex = /^\d+$/;
        if (!regex.test(value)) {
          error = 'Price must be a number';
        } else if (parseInt(value, 10) <= 0) {
          error = 'Price must be a positive number';
        } else if (parseInt(value, 10) > 1000000) {
          error = 'Price cannot exceed 1000000';
        }
      }
    }
    return error;
  };

  const validateEditInput = (name, value) => {
    let error = '';
    const maxPrice = 1000000; // Giới hạn giá tối đa
    const strValue = String(value); // Chuyển đổi giá trị thành chuỗi

    if (name === 'name') {
      if (!strValue.trim()) {
        error = 'Please enter your information';
      } else if (
        strValue.trim() === originalEditService.name.trim() &&
        editService.serviceID !== originalEditService.serviceID
      ) {
        error = 'New name cannot be the same as the old name';
      } else if (
        servicesData.some(
          service =>
            service.name.trim().toLowerCase() ===
              strValue.trim().toLowerCase() &&
            service.serviceID !== editService.serviceID,
        )
      ) {
        error = 'New name cannot duplicate an existing service name';
      } else {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(strValue)) {
          error = 'Only letters and spaces are allowed';
        }
      }
    } else if (name === 'description') {
      if (!strValue.trim()) {
        error = 'Please enter your information';
      } else {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(strValue)) {
          error = 'Only letters and spaces are allowed';
        }
      }
    } else if (name === 'price') {
      if (!strValue || strValue === '$' || strValue.startsWith('0')) {
        error = 'Price must be a positive number and cannot start with 0';
      } else {
        const regex = /^\d+$/;
        if (!regex.test(strValue)) {
          error = 'Price must be a number';
        } else if (parseInt(strValue, 10) > maxPrice) {
          error = `Price cannot exceed ${maxPrice}`;
        }
      }
    }
    return error;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setAddServiceErrors({ ...addServiceErrors, [name]: error });
    setNewService({ ...newService, [name]: value });
  };

  const handleEditInputChange = e => {
    const { name, value } = e.target;
    const error = validateEditInput(name, value);
    setEditServiceErrors({ ...editServiceErrors, [name]: error });
    setEditService({ ...editService, [name]: value });
  };

  const checkDuplicateServiceName = async serviceName => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/service/checkServiceName`,
        { params: { name: serviceName.trim().toLowerCase() } },
      );
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleFormSubmit = async () => {
    const newErrors = {
      name: validateInput('name', newService.name),
      description: validateInput('description', newService.description),
      price: validateInput('price', newService.price),
    };

    if (
      Object.values(newErrors).every(error => error === '') &&
      newService.name &&
      newService.description
    ) {
      const isDuplicate = await checkDuplicateServiceName(newService.name);
      if (isDuplicate) {
        setAddServiceErrors({
          ...addServiceErrors,
          name: 'Service name already exists',
        });
        return;
      }
      try {
        await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/service/addService`,
          {
            serviceName: newService.name,
            description: newService.description,
            price: newService.price,
          },
        );
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/service/getAllServices`,
        );
        setServicesData(response.data);
      } catch (error) {
        console.error(error);
      }
      setNewService({ name: '', description: '', price: '' });
      setAddServiceErrors({ name: '', description: '', price: '' });
      // Close the modal
      document.querySelector('#addServiceModal .btn-close').click();
    } else {
      setAddServiceErrors(newErrors);
    }
  };

  const handleUpdateFormSubmit = async () => {
    const newErrors = {
      name: validateEditInput('name', editService.name),
      description: validateEditInput('description', editService.description),
      price: validateEditInput('price', editService.price),
    };

    if (
      Object.values(newErrors).every(error => error === '') &&
      editService.name &&
      editService.description
    ) {
      try {
        await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/service/updateServiceInfo`,
          editService,
        );
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/service/getAllServices`,
        );
        setServicesData(response.data);
        setUpdateSuccess(true);
        document.addEventListener('click', handleAlertClickOutside);
      } catch (error) {
        console.error(error);
      }
      setEditService({
        serviceID: '',
        name: '',
        description: '',
        price: '',
        status: '',
      });
      setEditServiceErrors({ name: '', description: '', price: '' });

      document
        .querySelector(`#editServiceModal${editService.serviceID} .btn-close`)
        .click();
    } else {
      setEditServiceErrors(newErrors);
    }
  };

  const handleToggleStatus = async service => {
    try {
      await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/service/updateServiceStatus`,
        {
          service,
        },
      );
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/service/getAllServices`,
      );
      setServicesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = service => {
    setEditService(service);
    setOriginalEditService({
      name: service.name,
      description: service.description,
      price: service.price,
    });
  };

  const searchServicesData = servicesData.filter(services => {
    const matchesSearch =
      search === '' ||
      services.name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = searchServicesData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const totalPages = Math.ceil(searchServicesData.length / itemsPerPage);

  const handleAlertClickOutside = event => {
    const alertBox = document.querySelector('.alert-success');
    if (alertBox && !alertBox.contains(event.target)) {
      setUpdateSuccess(false);
      document.removeEventListener('click', handleAlertClickOutside);
    }
  };

  return (
    <div className='Admin-Services container-fluid'>
      <div className='row'>
        {updateSuccess && (
          <div
            className='alert alert-success alert-dismissible fade show'
            role='alert'
          >
            Service updated successfully!
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
            ></button>
          </div>
        )}
        <Header />

        <div className='Admin-Services-Content row'>
          <div className='Admin-Services-Navigate col-md-2'>
            <Sidebar />
          </div>

          <div className='Admin-Services-Main col-md-10'>
            <Statistic />

            <div className='Admin-Services-Main-Table-Wrapper'>
              <div className='Admin-Services-Main-Table'>
                <div className='Admin-Services-Main-Table-Title'>
                  Services List
                </div>
                <div className='Admin-Services-Main-Table-Title-Text'>
                  Services Information
                </div>
                <div className='Admin-Services-Main-Filter-Add'>
                  <div className='Admin-Services-Main-Search'>
                    <input
                      type='text'
                      placeholder='Search Name'
                      className='Admin-Services-Main-Search-Input'
                      onChange={e => setSearch(e.target.value)}
                    />
                    <button className='Admin-Services-Main-Search-Button'>
                      <img
                        src={icon_search}
                        alt=''
                      />
                    </button>
                  </div>
                  <div className='Admin-Services-Add-Services'>
                    <button
                      type='button'
                      className='Admin-Services-add-services-btn'
                      data-bs-toggle='modal'
                      data-bs-target='#addServiceModal'
                    >
                      Add Services
                    </button>

                    <div
                      className='modal fade'
                      id='addServiceModal'
                      tabIndex='-1'
                      aria-labelledby='addServiceModalLabel'
                      aria-hidden='true'
                      ref={modalCloseButtonRef}
                    >
                      <div className='modal-dialog'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <h1
                              className='modal-title fs-5'
                              id='addServiceModalLabel'
                            >
                              Add Services
                            </h1>
                            <button
                              type='button'
                              className='btn-close'
                              data-bs-dismiss='modal'
                              aria-label='Close'
                            ></button>
                          </div>
                          <div className='modal-body'>
                            <div className='Admin-Services-modal-update-name'>
                              <div className='Admin-Services-modal-title'>
                                Name
                              </div>
                              <input
                                className='Admin-Services-input'
                                name='name'
                                value={newService.name}
                                onChange={handleInputChange}
                                placeholder='Services'
                              />
                              {addServiceErrors.name && (
                                <p className='error-message'>
                                  {addServiceErrors.name}
                                </p>
                              )}
                            </div>
                            <div className='Admin-Services-modal-update-name'>
                              <div className='Admin-Services-modal-title'>
                                Description
                              </div>
                              <input
                                className='Admin-Services-input'
                                name='description'
                                value={newService.description}
                                onChange={handleInputChange}
                                placeholder='Description'
                              />
                              {addServiceErrors.description && (
                                <p className='error-message'>
                                  {addServiceErrors.description}
                                </p>
                              )}
                            </div>
                            <div className='Admin-Services-modal-update-name'>
                              <div className='Admin-Services-modal-title'>
                                Price
                              </div>
                              <input
                                className='Admin-Services-input'
                                name='price'
                                value={newService.price}
                                onChange={handleInputChange}
                                placeholder='Price'
                              />
                              {addServiceErrors.price && (
                                <p className='error-message'>
                                  {addServiceErrors.price}
                                </p>
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
                              onClick={handleFormSubmit}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='Admin-Services-Main-Table-Header'>
                  <div className='Admin-Services-Main-Table-Header-Title'>
                    Services ID
                  </div>
                  <div className='Admin-Services-Main-Table-Header-Title'>
                    Name Services
                  </div>
                  <div className='Admin-Services-Main-Table-Header-Title'>
                    Description
                  </div>
                  <div className='Admin-Services-Main-Table-Header-Title'>
                    Price
                  </div>
                  <div className='Admin-Services-Main-Table-Header-Title'>
                    Status
                  </div>
                  <div className='Admin-Services-Main-Table-Header-Title-Btn'>
                    Action
                  </div>
                </div>

                {currentServices.length > 0 ? (
                  currentServices.map(item => (
                    <div
                      className={`Admin-Services-Main-Table-Content-Row-Wrapper ${item.status ? 'row-enable' : 'row-disable'}`}
                      key={item.serviceID}
                    >
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        {item?.serviceID}
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        {item?.name}
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        {item?.description}
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        {item.price}
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        <label className='switch'>
                          <input
                            type='checkbox'
                            checked={item.status}
                            onChange={() => handleToggleStatus(item)}
                          />
                          <span className='slider round'></span>
                        </label>
                      </div>
                      <div className='Admin-Services-Main-Table-Content-Row'>
                        <span className='Admin-Services-Main-Table-Content-Btn_Wrapper'>
                          <button
                            type='button'
                            className='Admin-Services-Main-Table-Content-Btn'
                            data-bs-toggle='modal'
                            data-bs-target={`#editServiceModal${item.serviceID}`}
                            onClick={() => handleEditClick(item)}
                          >
                            <BorderColorOutlinedIcon
                              sx={{
                                color: blue[400],
                              }}
                            />
                          </button>
                          <div
                            className='modal fade'
                            id={`editServiceModal${item.serviceID}`}
                            tabIndex='-1'
                            aria-labelledby={`editServiceModalLabel${item.serviceID}`}
                            aria-hidden='true'
                            ref={modalEditCloseButtonRef}
                          >
                            <div className='modal-dialog'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <h1
                                    className='modal-title fs-5'
                                    id={`editServiceModalLabel${item.serviceID}`}
                                  >
                                    Edit Service
                                  </h1>
                                  <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                  ></button>
                                </div>
                                <div className='modal-body'>
                                  <div className='Admin-Services-modal-update-name'>
                                    <div className='Admin-Services-modal-title-name'>
                                      Name
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        Old name:
                                      </div>
                                      {originalEditService?.name}
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        New name:
                                      </div>
                                      <input
                                        className='Admin-Services-input'
                                        name='name'
                                        value={editService?.name}
                                        onChange={handleEditInputChange}
                                        placeholder='Name'
                                      />
                                    </div>
                                    {editServiceErrors.name && (
                                      <p className='error-message'>
                                        {editServiceErrors.name}
                                      </p>
                                    )}
                                  </div>
                                  <div className='Admin-Services-modal-update-name'>
                                    <div className='Admin-Services-modal-title'>
                                      Description
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        Old Description:
                                      </div>
                                      {originalEditService.description}
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        New Description:
                                      </div>
                                      <input
                                        className='Admin-Services-input'
                                        name='description'
                                        value={editService?.description}
                                        onChange={handleEditInputChange}
                                        placeholder='Description'
                                      />
                                    </div>
                                    {editServiceErrors.description && (
                                      <p className='error-message'>
                                        {editServiceErrors.description}
                                      </p>
                                    )}
                                  </div>
                                  <div className='Admin-Services-modal-update-name'>
                                    <div className='Admin-Services-modal-title'>
                                      Price
                                    </div>

                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update'>
                                        <div className='Admin-Services-modal-update-title'>
                                          Old price:
                                        </div>
                                        {originalEditService?.price}
                                      </div>
                                    </div>
                                    <div className='Admin-Services-modal-update'>
                                      <div className='Admin-Services-modal-update-title'>
                                        New Price:
                                      </div>
                                      <input
                                        className='Admin-Services-input-phone'
                                        name='price'
                                        value={editService?.price}
                                        onChange={handleEditInputChange}
                                        placeholder='Price'
                                        maxLength={10} // Giới hạn độ dài số tiền
                                        pattern='^[1-9]\d*$' // Không cho phép bắt đầu bằng số 0
                                      />
                                    </div>
                                    {editServiceErrors.price && (
                                      <p className='error-message'>
                                        {editServiceErrors.price}
                                      </p>
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
                                    onClick={handleUpdateFormSubmit}
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
                    No Content Available
                  </div>
                )}
                <div className='Admin-Services-Pagination'>
                  {currentServices.length > 0 && totalPages > 1 && (
                    <Stack
                      spacing={2}
                      marginTop={2}
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

export default AdminServices;
