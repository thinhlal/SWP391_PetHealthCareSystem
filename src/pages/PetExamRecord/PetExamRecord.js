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
		  <div class="pet-info-1">Pet ID</div>
		  <p className="petE-info">PET01</p>
		</div>
		<div className="form-petExam-1">
		  <div class="pet-info-1">Pet Type</div>
		  <p className="petE-info">Dog</p>
		</div>
		<div className="form-petExam-2">
			<div class="pet-info-1">Pet Weight</div>
			<p className="petE-info">10 kg</p>
		  </div>
		<div className="form-petExam">
		  <div class="pet-info-1">Pet Name</div>
		  <p className="petE-info">Jack</p>
		</div>
		<div className="form-petExam-1">
		  <div class="pet-info-1">Pet Owner</div>
		  <p className="petE-info">Messi</p>
		</div>
		<div className="form-petExam-2">
		  <div class="pet-info-1">Pet Gender</div>
		  <p className="petE-info">Male</p>
		</div>
		<div className="form-petExam-3">
			<div class="pet-info-1">Pet Diagnostic</div>
			<textarea className="petE-control" rows="1" cols="30" placeholder="Enter Diagnostic"></textarea>
		  </div>
		  <div className="form-petExam-3">
			<div class="pet-info-1">Pet Symptoms</div>
			<textarea className="petE-control" rows="1" cols="30" placeholder="Enter Symptoms"></textarea>
		  </div>
		<div className="form-petExam-3">
  			<div class="pet-info-1">Prescription</div>
  			<textarea className="petE-control" rows="1" cols="30" placeholder="Enter prescription"></textarea>
		</div>
		<div className="form-petExam-3">
  			<div class="pet-info-1">Note</div>
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
