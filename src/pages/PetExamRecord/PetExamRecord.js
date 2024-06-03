//css
import './PetExamRecord.css';
//images
import logo_petE from '../../assets/images/img_PetExamRecord/logo_petE.png';
import icon_user from '../../assets/images/img_PetExamRecord/icon_user.png';

function PetExamRecord() {

    return (

    <div>
    <div className="petExam">
	<div> 	
		<div className="menu">			
			 <nav className="nav-head">
				<div className="logo_ad">
				<img src={icon_user} alt=''/>
			  </div>
			</nav>			
		</div>				
		<div> 		
			<div className="petE-head">
                <img src={logo_petE} alt=""/>
				<p className="petE-tittle"> Pet Exam Record </p>
				<p className="petE-tittle-1"> Create a new examination pool for pet</p>
			</div>
		</div>		
	</div>	
	<form className="form-petE">
		<div className="form-petExam">
		  <label for="petId">Pet ID</label>
		  <p className="petE-info">PET01</p>
		</div>
		<div className="form-petExam-1">
		  <label for="petType">Pet Type</label>
		  <p className="petE-info">Dog</p>
		</div>
		<div className="form-petExam-2">
			<label for="petWeight">Pet Weight</label>
			<p className="petE-info">10 kg</p>
		  </div>
		<div className="form-petExam">
		  <label for="petName">Pet Name</label>
		  <p className="petE-info">Jack</p>
		</div>
		<div className="form-petExam-1">
		  <label for="petOwner">Pet Owner</label>
		  <p className="petE-info">Messi</p>
		</div>
		<div className="form-petExam-2">
		  <label for="petGender">Pet Gender</label>
		  <p className="petE-info">Male</p>
		</div>
		<div className="form-petExam-3">
			<label for="prescription">Pet Diagnostic</label>
			<textarea className="petE-control" rows="1" cols="30" placeholder="Enter Diagnostic"></textarea>
		  </div>
		  <div className="form-petExam-3">
			<label for="prescription">Pet Symptoms</label>
			<textarea className="petE-control" rows="1" cols="30" placeholder="Enter Symptoms"></textarea>
		  </div>
		<div className="form-petExam-3">
  			<label for="prescription">Prescription</label>
  			<textarea className="petE-control" rows="1" cols="30" placeholder="Enter prescription"></textarea>
		</div>
		<div className="form-petExam-3">
  			<label for="note-petE">Note</label>
  			<textarea className="petE-control" rows="1" cols="30" placeholder="Enter note"></textarea>
		</div>
		<div className="final-petE">
		<button type="submit" className="btn-save">Save</button>
		<button type="button" className="btn-cancel">Cancel</button>
		</div>
	  </form>
		<div>
			<p className="petE-tittle-2"> ----------Information Pet----------</p>
		</div>
	</div>
	
    </div>
    )
}

export default PetExamRecord;
