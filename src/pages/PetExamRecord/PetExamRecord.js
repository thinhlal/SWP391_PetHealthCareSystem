//css
import './PetExamRecord.css';
//images
import logo_user from '../../assets/images/img_PetExamRecord/logo_user.png';
import logo_petE from '../../assets/images/img_PetExamRecord/logo_petE.png';

function PetExamRecord() {

    return (

        <div>
            <div>
                <div className="menu">
                    <nav className="nav-head">
                        <div>
                            <div className="logo_petE"> <img src={logo_user} alt=""/>  </div>
                        </div>
                    </nav>
                </div>
                <div>
                    <div>
                       <div className="images_petE"> <img src={logo_petE} alt=""/></div>
                        <p className="tittle_petE"> Pet Exam Record </p>
                        <p className="tittle-1_petE"> Create a new examination pool for pet</p>
                    </div>
                </div>
            </div>
            <form className="form_petE">
                <div className="form-group_petE">
                    <label for="petId">Pet ID</label>
                    <input type="text" className="PetExam-form-control" id="petId" placeholder="Enter pet ID"/>
                </div>
                <div className="form-group-1_petE">
                    <label for="petType">Pet Type</label>
                    <input type="text" className="PetExam-form-control" id="petType" placeholder="Enter pet type"/>
                </div>
                <div className="form-group-2_petE">
                    <label for="petSymptoms">Pet Symptoms</label>
                    <input type="text" className="PetExam-form-control" id="petSymptoms" placeholder="Enter pet symptoms"/>
                </div>
                <div className="form-group_petE">
                    <label for="petName">Pet Name</label>
                    <input type="text" className="PetExam-form-control" id="petName" placeholder="Enter pet name"/>
                </div>
                <div className="form-group-1_petE">
                    <label for="petOwner">Pet Owner</label>
                    <input type="text" className="PetExam-form-control" id="petOwner" placeholder="Enter pet owner"/>
                </div>
                <div className="form-group-2_petE">
                    <label for="petDiagnostic">Pet Diagnostic</label>
                    <input type="text" className="PetExam-form-control" id="petDiagnostic" placeholder="Enter pet diagnostic"/>
                </div>
                <div className="form-group_petE">
                    <label for="petGender">Pet Gender</label>
                    <input type="text" className="PetExam-form-control" id="petGender" placeholder="Enter pet gender"/>
                </div>
                <div className="form-group-1_petE">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="text" className="PetExam-form-control" id="phoneNumber" placeholder="Enter phone number"/>
                </div>
                <div className="form-group-2_petE">
                    <label for="petWeight">Pet Weight</label>
                    <input type="text" className="PetExam-form-control" id="petWeight" placeholder="Enter pet weight"/>
                </div>
                <div className="form-group-3_petE">
                    <label for="prescription">Prescription</label>
                    <textarea className="PetExam-form-control" id="prescription" rows="1" cols="30"
                        placeholder="Enter prescription"></textarea>
                </div>
                <div className="form-group-3_petE">
                    <label for="note">Note</label>
                    <textarea className="PetExam-form-control" id="note" rows="1" cols="30" placeholder="Enter note"></textarea>
                </div>
                <div className="button-sc">
                    <button type="submit" className="btn btn-save">Save</button>
                    <button type="button" className="btn btn-cancel">Cancel</button>
                </div>
            </form>
            <footer>
                <div>
                    <p className="PetExam-final"> ----------Information Pet----------</p>
                </div>
            </footer>



        </div>




    )




}

export default PetExamRecord;
