import './ManageDoctorCalender.css';
import HeaderManager from '../../components/Employee/Header/HeaderManager';
import home_img from '../../assets/images/img_Manager/home.svg'
import list_icon from '../../assets/images/img_Manager/icon-list.png'
import vector from '../../assets/images/img_Manager/vector.svg'
import vector_1 from '../../assets/images/img_Manager/vector-1.svg'
import arrow_down from '../../assets/images/img_Manager/arrow-down.svg'
import search_icon from '../../assets/images/img_Manager/search.svg'
function ManageDoctorCalender() {
    return (
        <div className="manage-doctor-calender">
            <div className="div">
                <HeaderManager></HeaderManager>
                <div className="doctor-calender-name">
                    <p className='doctor-calender-title'>Pet Health Care - Manage the doctor&#39;s calendar</p>
                </div>
                <div className="doctor-calender-menu">
                    <div className="doctor-calender-sidebar">
                        <div className="doctor-calender-home">
                            <div className="doctor-calender-home-icon-text">
                                <img className="doctor-calender-home-icon" src={home_img} alt="" />
                                <div className="doctor-calender-text-home">Home</div>
                            </div>
                        </div>
                        <div className="doctor-calender-categories-icon">
                            <img className="doctor-calender-icon-list" src={list_icon} alt="" />
                            <div className="doctor-calender-categories">Categories</div>
                        </div>
                        <div className="doctor-calender-list">
                            <div className="doctor-calender-menu-item"><button className="doctor-calender-menu-item-name">List of Cages</button></div>
                            <div className="doctor-calender-menu-item"><button className="doctor-calender-menu-item-name">Manage Booking</button></div>
                            <div className="doctor-calender-menu-item"><button className="doctor-calender-menu-item-name">Manage Booking Cancel</button></div>
                            <div className="doctor-calender-menu-item"><button className="doctor-calender-menu-item-name">Manage Doctor’s Calendar</button></div>
                        </div>

                    </div>
                    <div className="doctor-calender-table">
                        <div className="card-header">
                            <div className="content">
                                <div className="doctor-calender-search">
                                    <div className="doctor-calender-search-text-badge ">
                                        <div className="doctor-calender-search-text">Doctor’s Calendar</div>
                                        <div className="doctor-calender-search-badge"></div>
                                    </div>
                                    <div className="doctor-calender-input">
                                        <img className="doctor-calender-search-icon" src={search_icon} alt=""/>
                                        <input className="doctor-calender-search-input" placeholder="dd/mm/yyyyy" type="date" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-calender-content">
                            <div className="doctor-calender-row1">
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">Doctor Name</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">8h-9h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">9h-10h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">10h-11h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">11h-12h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">12h-13h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">13h-14h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">14h-15h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div><div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">15h-16h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">16h-17h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell">
                                    <div className="doctor-calender-table-header">
                                        <div className="doctor-calender-content-text">17h-18h</div>
                                        <img className="doctor-calender-content-arrow-down" src={arrow_down} alt="" />
                                    </div>
                                </div>
                                <div className="doctor-calender-table-header-cell-2"></div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>
                            <div className="doctor-calender-row2">
                                <div className="doctor-calender-row2-table-cell">
                                    <div className="doctor-calender-row2-text-and-supporting"><div className="doctor-calender-row2-text">Nguyen Van A</div></div>

                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge-base">
                                            <div className="calender-content-dot"><div className="calender-content-dot-2"></div></div>
                                            <div className="calender-content-active">Active</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <div className="calender-content-badge">
                                        <div className="calender-content-badge">
                                            <div className="calender-content-badge-base-2">
                                                <div className="calender-content-dot"><div className="calender-content-dot-3"></div></div>
                                                <div className="calender-content-inactive">Inactive</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="calender-content-table-cell">
                                    <button className="calender-content-badge-base-3">Scheduled</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="manage-doctor-calender-pagination">
                    <img className="manage-doctor-calender-vector" src={vector} alt="" />
                    <div className="manage-doctor-calender-element">
                        <div className="manage-doctor-calender-pagination-frame">
                            <div className="manage-doctor-calender-pagination-text">1</div>
                            <div className="manage-doctor-calender-pagination-text">2</div>
                            <div className="manage-doctor-calender-pagination-text">3</div>
                            <div className="manage-doctor-calender-pagination-text">4</div>
                            <div className="manage-doctor-calender-pagination-text">5</div>
                            <div className="manage-doctor-calender-pagination-text">6</div>
                            <div className="manage-doctor-calender-pagination-text">7</div>
                            <div className="manage-doctor-calender-pagination-text">8</div>
                        </div>
                    </div>
                    <img className="manage-doctor-calender-vector" src={vector_1} alt="" /></div>
            </div>
        </div>
    );

}
export default ManageDoctorCalender;
