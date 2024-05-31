//css
import './WorkSchedule.css';
//images
import logo_admin from '../../assets/images/img_WorkSchedule/logo_admin.png';
import logoPet from '../../assets/images/img_WorkSchedule/logoPet.png';
function WorkSchedule() {

    return (
        <div>
            <div className="menu">			
			 <nav className="navbar bg-primary"  role="navigation">
			  <div className="container-fluid lemenu">
				<div className="navbar-header">
				  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">   
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				  </button>
				</div>
			  </div>
			  <div className="admin-logo">
					<img src={logo_admin} alt="Admin"/>Hi Admin
			</div>
			</nav>			
		</div>
		<div> 		
			<div>
				<h1 classNameName="logopethealthcare"><img src={logoPet} alt=""/></h1>
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
		<div className=" table-schedule" id="tables">
			<form>
				<table>
				  <thead>
					<tr>
						<th>Stt</th>
					  <th>Pet ID</th>
					  <th>Pet Type</th>
					  <th>Gender</th>
					  <th>Register hour</th>
					  <th>Pet Owner</th>
					  <th>Status</th>
					</tr>
				  </thead>
				  <tbody>
					<tr>
						<td>1</td>
					  <td>Pet1</td>
					  <td>Dog</td>
					  <td>Male</td>
					  <td>8:00 - 9:00</td>
					  <td>Minh</td>
					  <td><button type="button" className="button-receive">
						Receive
					  </button>
					</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Pet2</td>
						<td>Dog</td>
						<td>Female</td>
						<td>10:00 - 11:00</td>
						<td>Phat</td>
						<td><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
					<tr>
						<td>3</td>
						<td>Pet3</td>
						<td>Cat</td>
						<td>Male</td>
						<td>13:00 - 14:00</td>
						<td>Dat</td>
						<td><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
					<tr>
						<td>4</td>
						<td>Pet4</td>
						<td>Dog</td>
						<td>Male</td>
						<td>15:00 - 16:00</td>
						<td>Thinh</td>
						<td><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
					<tr>
						<td>5</td>
						<td>Pet5</td>
						<td>Cat</td>
						<td>Female</td>
						<td>16:00 - 17:00</td>
						<td>Tung</td>
						<td><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
					<tr>
						<td>6</td>
						<td>Pet6</td>
						<td>Dog</td>
						<td>Male</td>
						<td>19:00 - 20:00</td>
						<td>Duong</td>
						<td><button type="button" className="button-receive">
						  Receive
						</button></td>
					</tr>
				  </tbody>
				</table>
			  </form>
		</div>

		<p className="final">----------Schedule----------</p>	
        </div>
        </div>
    )
}

export default WorkSchedule;
