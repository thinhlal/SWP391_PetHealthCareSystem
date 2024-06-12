//Css
import './ManageDoctorCalender.css';
//Component
import HeaderManager from '../../components/Employee/Header/HeaderManager';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
//images
import search_icon from '../../assets/images/img_ManageBookings/search.svg';
import Sidebar from '../../components/Employee/Sidebar/Sidebar';

function ManageDoctorCalender() {
  return (
    <div className='manage-doctor-calender container-fluid'>
      <div className='row'>
        <HeaderManager></HeaderManager>
        <div className='manage-doctor-calender-title'>
          <div className='manage-doctor-calender-title-text'>
            Pet Health Care - Manage Booking Lists
          </div>
        </div>
        <div className='manage-booking-list-content'>
          <Sidebar></Sidebar>
          <div className='manage-booking-main-content'>
            <div className='main-content-header'>
              <div className='main-content-header-search'>
                <div className='main-content-header-search-title'>
                  List of Booking
                </div>
                <div className='main-content-header-search-input-wrapper'>
                  <button
                    type='button'
                    className='search-input-btn'
                  >
                    <img
                      className='search-input-btn-icon'
                      src={search_icon}
                      alt=''
                    />
                  </button>
                  <input
                    type='text'
                    placeholder='Search'
                    className='main-content-header-search-input'
                  />
                </div>
              </div>
              <div className='main-content-header-add-booking'>
                <button
                  type='button'
                  className='booking-btn-add'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal'
                >
                  Add Booking
                </button>
                <div
                  className='modal fade'
                  id='exampleModal'
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div className='modal-dialog'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h1
                          className='modal-title fs-5'
                          id='exampleModalLabel'
                        >
                          Modal title
                        </h1>
                        <button
                          type='button'
                          className='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        ></button>
                      </div>
                      <div className='modal-body'>sadsadas</div>
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
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-content-list'>
              <div className='main-content-list-title'>
                <div className='main-content-list-title-text'>BookingID</div>
                <div className='main-content-list-title-text'>Booking date</div>
                <div className='main-content-list-title-text'>Name</div>
                <div className='main-content-list-title-text'>Pet Name</div>
                <div className='main-content-list-title-text'>Service</div>
                <div className='main-content-list-title-text'>Doctor</div>
                <div className='main-content-list-title-text'>Check In</div>
                <div className='main-content-list-title-text'>
                  Cancel Booking
                </div>
                <div className='main-content-list-title-text'>View</div>
              </div>
              <div className='main-content-list-body-wrapper'>
                <div className='content-list-body-info'>
                  <div className='content-list-body-value'>SE123456</div>
                  <div className='content-list-body-value'>SE123456</div>
                  <div className='content-list-body-value'>ssss</div>
                  <div className='content-list-body-value'>Dog</div>
                  <div className='content-list-body-value'>Blooming</div>
                  <div className='content-list-body-value'>Chen</div>
                  <div className='content-list-body-value'>
                    <input
                      type='checkbox'
                      className='content-list-body-checkbox'
                    />
                  </div>
                  <div className='content-list-body-value'>
                    <input
                      type='checkbox'
                      className='content-list-body-checkbox'
                      disabled
                      checked='checked'
                    />
                  </div>
                  <div className='content-list-body-value'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      data-bs-toggle='modal'
                      data-bs-target='#more_info'
                    >
                      More info
                    </button>
                  </div>
                  <div
                    className='modal fade'
                    id='more_info'
                    aria-labelledby='exampleModalLabel'
                    aria-hidden='true'
                  >
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h1
                            className='modal-title fs-5'
                            id='exampleModalLabel'
                          >
                            Modal title
                          </h1>
                          <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>
                        <div className='modal-body'>.....</div>
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
                            className='btn btn-primary'
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='content-list-body-info'>
                  <div className='content-list-body-value'>SE123456</div>
                  <div className='content-list-body-value'>SE123456</div>
                  <div className='content-list-body-value'>ssss</div>
                  <div className='content-list-body-value'>Dog</div>
                  <div className='content-list-body-value'>Blooming</div>
                  <div className='content-list-body-value'>Chen</div>
                  <div className='content-list-body-value'>
                    <input
                      type='checkbox'
                      className='content-list-body-checkbox'
                    />
                  </div>
                  <div className='content-list-body-value'>
                    <input
                      type='checkbox'
                      className='content-list-body-checkbox'
                      disabled
                      checked='checked'
                    />
                  </div>
                  <div className='content-list-body-value'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      data-bs-toggle='modal'
                      data-bs-target='#more_info'
                    >
                      More info
                    </button>
                  </div>
                  <div
                    className='modal fade'
                    id='more_info'
                    aria-labelledby='exampleModalLabel'
                    aria-hidden='true'
                  >
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h1
                            className='modal-title fs-5'
                            id='exampleModalLabel'
                          >
                            Modal title
                          </h1>
                          <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>
                        <div className='modal-body'>.....</div>
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
                            className='btn btn-primary'
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='content-list-body-info'>
                  <div className='content-list-body-value'>SE123456</div>
                  <div className='content-list-body-value'>SE123456</div>
                  <div className='content-list-body-value'>ssss</div>
                  <div className='content-list-body-value'>Dog</div>
                  <div className='content-list-body-value'>Blooming</div>
                  <div className='content-list-body-value'>Chen</div>
                  <div className='content-list-body-value'>
                    <input
                      type='checkbox'
                      className='content-list-body-checkbox'
                    />
                  </div>
                  <div className='content-list-body-value'>
                    <input
                      type='checkbox'
                      className='content-list-body-checkbox'
                      disabled
                      checked='checked'
                    />
                  </div>
                  <div className='content-list-body-value'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      data-bs-toggle='modal'
                      data-bs-target='#moreinfo'
                    >
                      More info
                    </button>
                  </div>
                  <div
                    className='modal fade'
                    id='moreinfo'
                    aria-labelledby='exampleModalLabel'
                    aria-hidden='true'
                  >
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h1
                            className='modal-title fs-5'
                            id='exampleModalLabel'
                          >
                            Modal title
                          </h1>
                          <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>
                        <div className='modal-body'>.....</div>
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
                            className='btn btn-primary'
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='content-list-body-info'>
                  <div className='content-list-body-value'>SE123456</div>
                  <div className='content-list-body-value'>SE123456</div>
                  <div className='content-list-body-value'>ssss</div>
                  <div className='content-list-body-value'>Dog</div>
                  <div className='content-list-body-value'>Blooming</div>
                  <div className='content-list-body-value'>Chen</div>
                  <div className='content-list-body-value'>
                    <input
                      type='checkbox'
                      className='content-list-body-checkbox'
                    />
                  </div>
                  <div className='content-list-body-value'>
                    <input
                      type='checkbox'
                      className='content-list-body-checkbox'
                      disabled
                      checked='checked'
                    />
                  </div>
                  <div className='content-list-body-value'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      data-bs-toggle='modal'
                      data-bs-target='#moreinfo'
                    >
                      More info
                    </button>
                  </div>
                  <div
                    className='modal fade'
                    id='moreinfo'
                    aria-labelledby='exampleModalLabel'
                    aria-hidden='true'
                  >
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h1
                            className='modal-title fs-5'
                            id='exampleModalLabel'
                          >
                            Modal title
                          </h1>
                          <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                          ></button>
                        </div>
                        <div className='modal-body'>.....</div>
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
                            className='btn btn-primary'
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pagination_wrapper'>
          <nav aria-label='...'>
            <ul className='pagination'>
              <li className='page-item disabled'>
                <a
                  className='page-link'
                  href='#123'
                >
                  Previous
                </a>
              </li>
              <li
                className='page-item active'
                aria-current='page'
              >
                <a
                  className='page-link'
                  href='#123'
                >
                  1
                </a>
              </li>
              <li className='page-item'>
                <a
                  className='page-link'
                  href='#123'
                >
                  2
                </a>
              </li>
              <li className='page-item'>
                <a
                  className='page-link'
                  href='#123'
                >
                  3
                </a>
              </li>
              <li className='page-item'>
                <a
                  className='page-link'
                  href='#123'
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ManageDoctorCalender;
