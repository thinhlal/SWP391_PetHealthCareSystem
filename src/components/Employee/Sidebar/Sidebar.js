//CSS
import "./Sidebar.css"
//Images
import list_icon from '../../../assets/images/Components/Employee/Sidebar/icon-list.png'
import home_img from '../../../assets/images/Components/Employee/Sidebar/home.svg'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img className="sidebar-header-icon" src={home_img} alt='' />
                <div className="sidebar-header-text">Home</div>
            </div>
            <div className="sidebar-list">
                <div className="sidebar-list-tittle">
                    <img className="sidebar-list-tittle-icon" src={list_icon} alt='' />
                    <div className="sidebar-list-tittle-text">Categories</div>
                </div>
                <div className="sidebar-list-item">
                    <div className="sidebar-list-item-text">Booking List</div>
                </div>
                <div className="sidebar-list-item">
                    <div className="sidebar-list-item-text">Cages</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;