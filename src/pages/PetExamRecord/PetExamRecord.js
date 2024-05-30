//css
import './PetExamRecord.css';
//images
import logo_user from '../../assets/images/img_PetExamRecord/logo_user.png';

function PetExamRecord() {

    return (

        <div>
            <div>
                <div className="menu">
                    <nav className="navbar bg-primary" role="navigation">
                        <div className="container-fluid lemenu">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="logopethealthcare" id="pethealthcaresystem"> <img src={logo_user} />  </div>
                        </div>
                    </nav>
                </div>
                <div>
                    <div>
                        <p className="tittle"> Pet Exam Record </p>
                        <p className="tittle-1"> Create a new examination pool for pet</p>
                    </div>
                </div>
            </div>
            <form>
                <div className="form-group">
                    <label for="petId">Pet ID</label>
                    <input type="text" className="PetExam-form-control" id="petId" placeholder="Enter pet ID"/>
                </div>
                <div className="form-group-1">
                    <label for="petType">Pet Type</label>
                    <input type="text" className="PetExam-form-control" id="petType" placeholder="Enter pet type"/>
                </div>
                <div className="form-group-2">
                    <label for="petSymptoms">Pet Symptoms</label>
                    <input type="text" className="PetExam-form-control" id="petSymptoms" placeholder="Enter pet symptoms"/>
                </div>
                <div className="form-group">
                    <label for="petName">Pet Name</label>
                    <input type="text" className="PetExam-form-control" id="petName" placeholder="Enter pet name"/>
                </div>
                <div className="form-group-1">
                    <label for="petOwner">Pet Owner</label>
                    <input type="text" className="PetExam-form-control" id="petOwner" placeholder="Enter pet owner"/>
                </div>
                <div className="form-group-2">
                    <label for="petDiagnostic">Pet Diagnostic</label>
                    <input type="text" className="PetExam-form-control" id="petDiagnostic" placeholder="Enter pet diagnostic"/>
                </div>
                <div className="form-group">
                    <label for="petGender">Pet Gender</label>
                    <input type="text" className="PetExam-form-control" id="petGender" placeholder="Enter pet gender"/>
                </div>
                <div className="form-group-1">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="text" className="PetExam-form-control" id="phoneNumber" placeholder="Enter phone number"/>
                </div>
                <div className="form-group-2">
                    <label for="petWeight">Pet Weight</label>
                    <input type="text" className="PetExam-form-control" id="petWeight" placeholder="Enter pet weight"/>
                </div>
                <div className="form-group-3">
                    <label for="prescription">Prescription</label>
                    <textarea className="PetExam-form-control" id="prescription" rows="1" cols="30"
                        placeholder="Enter prescription"></textarea>
                </div>
                <div className="form-group-3">
                    <label for="note">Note</label>
                    <textarea className="PetExam-form-control" id="note" rows="1" cols="30" placeholder="Enter note"></textarea>
                </div>
                <div className="button-savecancel">
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
