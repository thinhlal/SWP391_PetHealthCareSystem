//css
import './WorkSchedule.css';
import Header from '../../components/Doctor/Header/Header.js';
//images

function WorkSchedule() {

	return (
		<div>
			<Header />
			<div>
				<div>
					<p className='tittle'> Today's Work Schedule</p>
				</div>
				<div className='ver-container'>
					<p className='ver-id'>Veterinarian ID: 001</p>
					<p className='ver-name'>Vet. MINH</p>
				</div>
			</div>
			<div>
				<div className='date-work'>
					Date's work schedule: <input type='date' name='date' />
				</div>
				<div className='table-schedule' id='tables'>
					<form className='form_table-schedule'>
						<table className='table_table-schedule'>
							<thead className='head_table-schedule'>
								<tr>
									<th className='th_table-schedule'>Stt</th>
									<th className='th_table-schedule'>Pet ID</th>
									<th className='th_table-schedule'>Pet Type</th>
									<th className='th_table-schedule'>Gender</th>
									<th className='th_table-schedule'>Register hour</th>
									<th className='th_table-schedule'>Pet Owner</th>
									<th className='th_table-schedule'>Status</th>
									<th className='th_table-schedule'></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='td_table-schedule'>1</td>
									<td className='td_table-schedule'>Pet1</td>
									<td className='td_table-schedule'>Dog</td>
									<td className='td_table-schedule'>Male</td>
									<td className='td_table-schedule'>8:00 - 9:00</td>
									<td className='td_table-schedule'>Minh</td>
									<td className='td_table-schedule doctor-status-pending'>Pending</td>
									<td className='td_table-schedule'>
										<div className='td_table-schedule-btn-center'>
											<a href='pet-exam-record' className='click-button'>Receive</a>
											<a href='pet-exam-record' className='cancel-booking-button'>Cancel</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className='td_table-schedule'>2</td>
									<td className='td_table-schedule'>Pet2</td>
									<td className='td_table-schedule'>Dog</td>
									<td className='td_table-schedule'>Female</td>
									<td className='td_table-schedule'>10:00 - 11:00</td>
									<td className='td_table-schedule'>Phat</td>
									<td className='td_table-schedule doctor-status-pending'>Pending</td>
									<td className='td_table-schedule'>
										<div className='td_table-schedule-btn-center'>
											<a href='pet-exam-record' className='click-button'>Receive</a>
											<a href='pet-exam-record' className='cancel-booking-button'>Cancel</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className='td_table-schedule'>3</td>
									<td className='td_table-schedule'>Pet3</td>
									<td className='td_table-schedule'>Cat</td>
									<td className='td_table-schedule'>Male</td>
									<td className='td_table-schedule'>13:00 - 14:00</td>
									<td className='td_table-schedule'>Dat</td>
									<td className='td_table-schedule doctor-status-pending'>Pending</td>
									<td className='td_table-schedule'>
										<div className='td_table-schedule-btn-center'>
											<a href='pet-exam-record' className='click-button'>Receive</a>
											<a href='pet-exam-record' className='cancel-booking-button'>Cancel</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className='td_table-schedule'>4</td>
									<td className='td_table-schedule'>Pet4</td>
									<td className='td_table-schedule'>Dog</td>
									<td className='td_table-schedule'>Male</td>
									<td className='td_table-schedule'>15:00 - 16:00</td>
									<td className='td_table-schedule'>Thinh</td>
									<td className='td_table-schedule doctor-status-pending'>Pending</td>
									<td className='td_table-schedule'>
										<div className='td_table-schedule-btn-center'>
											<a href='pet-exam-record' className='click-button'>Receive</a>
											<a href='pet-exam-record' className='cancel-booking-button'>Cancel</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className='td_table-schedule'>5</td>
									<td className='td_table-schedule'>Pet5</td>
									<td className='td_table-schedule'>Cat</td>
									<td className='td_table-schedule'>Female</td>
									<td className='td_table-schedule'>16:00 - 17:00</td>
									<td className='td_table-schedule'>Thinh</td>
									<td className='td_table-schedule doctor-status-done'>Done</td>
									<td className='td_table-schedule'>
										<div className='td_table-schedule-btn-center'>
											<a href='pet-exam-record' className='doctor-btn-not-receive click-button'>Receive</a>
										</div>
									</td>
								</tr>
								<tr>
									<td className='td_table-schedule'>6</td>
									<td className='td_table-schedule'>Pet6</td>
									<td className='td_table-schedule'>Dog</td>
									<td className='td_table-schedule'>Male</td>
									<td className='td_table-schedule'>19:00 - 20:00</td>
									<td className='td_table-schedule'>Thinh</td>
									<td className='td_table-schedule doctor-status-done'>Done</td>
									<td className='td_table-schedule'>
										<div className='td_table-schedule-btn-center'>
											<a href='pet-exam-record' className='doctor-btn-not-receive click-button'>Receive</a>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
		</div>
	)
}

export default WorkSchedule;
