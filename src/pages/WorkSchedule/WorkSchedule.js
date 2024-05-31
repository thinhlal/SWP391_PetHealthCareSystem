//css
import './WorkSchedule.css';
//images
import logo_admin from '../../assets/images/img_WorkSchedule/logo_admin.png';
import logoPet from '../../assets/images/img_WorkSchedule/logoPet.png';
function WorkSchedule() {

    return (
        <div>
            <div className="menu">			
			 <nav className="nav-header">
			  <div className="admin-logo">
					<img src={logo_admin} alt="Admin"/>
			</div>
			</nav>			
		</div>
		<div> 		
			<div>
				<h1 className="brand_pet"><img src={logoPet} alt=""/></h1>
				<p className="tittle"> Today's Work Schedule</p>
			</div>
			<div className="ver-container">
				  <p className="ver-id">Veterinarian ID: 001</p>
				  <p className="ver-name">Vet. MINH</p>
				</div>
			<div className="date-work">
				Date's work schedule: <input type="date" name="date"/>
			</div>
			  </div>		
	<div>	
		<div className="table-schedule" id="tables">
			<form className="form_table-schedule">
				<table className="table_table-schedule">
				  <thead claasName="head_table-schedule">
					<tr>
						<th className="th_table-schedule">Stt</th>
					  <th className="th_table-schedule">Pet ID</th>
					  <th className="th_table-schedule">Pet Type</th>
					  <th className="th_table-schedule">Gender</th>
					  <th className="th_table-schedule">Register hour</th>
					  <th className="th_table-schedule">Pet Owner</th>
					  <th className="th_table-schedule">Status</th>
					</tr>
				  </thead>
				  <tbody>
					<tr>
						<td className="td_table-schedule">1</td>
					  <td className="td_table-schedule">Pet1</td>
					  <td className="td_table-schedule">Dog</td>
					  <td className="td_table-schedule">Male</td>
					  <td className="td_table-schedule">8:00 - 9:00</td>
					  <td className="td_table-schedule">Minh</td>
					  <td className="td_table-schedule"><button type="button" className="button-receive">
						Receive
					  </button>
					</td>
					</tr>
					<tr>
						<td className="td_table-schedule">2</td>
						<td className="td_table-schedule">Pet2</td>
						<td className="td_table-schedule">Dog</td>
						<td className="td_table-schedule">Female</td>
						<td className="td_table-schedule">10:00 - 11:00</td>
						<td className="td_table-schedule">Phat</td>
						<td className="td_table-schedule"><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
					<tr>
						<td className="td_table-schedule">3</td>
						<td className="td_table-schedule">Pet3</td>
						<td className="td_table-schedule">Cat</td>
						<td className="td_table-schedule">Male</td>
						<td className="td_table-schedule">13:00 - 14:00</td>
						<td className="td_table-schedule">Dat</td>
						<td className="td_table-schedule"><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
					<tr>
						<td className="td_table-schedule">4</td>
						<td className="td_table-schedule">Pet4</td>
						<td className="td_table-schedule">Dog</td>
						<td className="td_table-schedule">Male</td>
						<td className="td_table-schedule">15:00 - 16:00</td>
						<td className="td_table-schedule">Thinh</td>
						<td className="td_table-schedule"><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
					<tr>
						<td className="td_table-schedule">5</td>
						<td className="td_table-schedule">Pet5</td>
						<td className="td_table-schedule">Cat</td>
						<td className="td_table-schedule">Female</td>
						<td className="td_table-schedule">16:00 - 17:00</td>
						<td className="td_table-schedule">Tung</td>
						<td className="td_table-schedule"><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
					<tr>
						<td className="td_table-schedule">6</td>
						<td className="td_table-schedule">Pet6</td>
						<td className="td_table-schedule">Dog</td>
						<td className="td_table-schedule">Male</td>
						<td className="td_table-schedule">19:00 - 20:00</td>
						<td className="td_table-schedule">Duong</td>
						<td className="td_table-schedule"><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
				  </tbody>
				</table>
				<div>
					<p className="final_page">----------Schedule----------</p>	
				</div>
			  </form>
		</div>
        </div>
        </div>
    )
}

export default WorkSchedule;
