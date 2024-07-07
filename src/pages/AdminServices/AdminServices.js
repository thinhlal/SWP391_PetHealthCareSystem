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

  const modalCloseButtonRef = useRef(null);
  const modalEditCloseButtonRef = useRef(null);

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
      if (!value || value === '$') {
        error = 'Please enter your information';
      } else {
        const regex = /^\d+$/;
        if (!regex.test(value)) {
          error = 'Price must be a number';
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
    const error = validateInput(name, value);
    setEditServiceErrors({ ...editServiceErrors, [name]: error });
    setEditService({ ...editService, [name]: value });
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
      name: validateInput('name', editService.name),
      description: validateInput('description', editService.description),
      price: validateInput('price', editService.price),
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

      document.querySelector('#addServiceModal .btn-close').click();
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

  return (
    <div className='Admin-Services container-fluid'>
      <div className='row'>
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
                              <label className='Admin-Services-modal-initials'>
                                Services name:
                              </label>
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
                              <label className='Admin-Services-modal-initials'>
                                Services description:
                              </label>
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
                              <label className='Admin-Services-modal-initials'>
                                Services price:
                              </label>
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

                {searchServicesData.length > 0 ? (
                  searchServicesData.map(item => (
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

export default AdminServices;
