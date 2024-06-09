//css
import './PetExamRecord.css';
import logo from '../../assets/images/img_PetExamRecord/logo.png';

//images
import icon_user from '../../assets/images/img_PetExamRecord/icon_user.png';

function PetExamRecord() {
    // render
    const renderPetData = [
        { id: 'PET01', type: 'Dog', weight: '10 kg', name: 'Jack', owner: 'Messi', gender: 'Male' },
        { id: 'PET02', type: 'Cat', weight: '5 kg', name: 'Luna', owner: 'Ronaldo', gender: 'Female' },
        { id: 'PET03', type: 'Bird', weight: '0.5 kg', name: 'Tweety', owner: 'Neymar', gender: 'Male' },
        { id: 'PET04', type: 'Rabbit', weight: '2 kg', name: 'Bunny', owner: 'Mbappe', gender: 'Female' },
        { id: 'PET05', type: 'Cat', weight: '0.2 kg', name: 'Nemo', owner: 'Salah', gender: 'Unknown' }
    ];

    // Chọn thú cưng theo index (Ví dụ: 0 để chọn pet đầu tiên)
    const selectedPetIndex = 0; 
    const selectedPet = renderPetData[selectedPetIndex];

    return (
        <div>
            <div className="petExam">
                <div>
                    <div className="menu">
                        <nav className="nav-head">
                            <div className="logo_ad">
                                <img src={logo} alt="Pet Health Logo" className="nav-logo" />
                            </div>
                            <div className="icon_user">
                                <img src={icon_user} alt="User Icon" />
                            </div>
                        </nav>
                    </div>
                    <div>
                        <div className="petE-head">
                            <div className="petE-tittle">Pet Exam Record</div>
                            <div className="petE-tittle-1">Create a new examination pool for pet</div>
                        </div>
                    </div>
                </div>
                <form className="form-petE">
                    <div className="form-petExam">
                        <div className="pet-info-1">Pet ID</div>
                        <div className="petE-info">{selectedPet.id}</div>
                    </div>
                    <div className="form-petExam-1">
                        <div className="pet-info-1">Pet Type</div>
                        <div className="petE-info">{selectedPet.type}</div>
                    </div>
                    <div className="form-petExam-2">
                        <div className="pet-info-1">Pet Weight</div>
                        <div className="petE-info">{selectedPet.weight}</div>
                    </div>
                    <div className="form-petExam">
                        <div className="pet-info-1">Pet Name</div>
                        <div className="petE-info">{selectedPet.name}</div>
                    </div>
                    <div className="form-petExam-1">
                        <div className="pet-info-1">Pet Owner</div>
                        <div className="petE-info">{selectedPet.owner}</div>
                    </div>
                    <div className="form-petExam-2">
                        <div className="pet-info-1">Pet Gender</div>
                        <div className="petE-info">{selectedPet.gender}</div>
                    </div>
                    <div className="form-petExam-3">
                        <div className="pet-info-1">Pet Diagnostic</div>
                        <textarea className="petE-control" placeholder="Enter Diagnostic"></textarea>
                    </div>
                    <div className="form-petExam-3">
                        <div className="pet-info-1">Pet Symptoms</div>
                        <textarea className="petE-control" placeholder="Enter Symptoms"></textarea>
                    </div>
                    <div className="form-petExam-3">
                        <div className="pet-info-1">Prescription</div>
                        <textarea className="petE-control" placeholder="Enter prescription"></textarea>
                    </div>
                    <div className="form-petExam-3">
                        <div className="pet-info-1">Note</div>
                        <textarea className="petE-control" placeholder="Enter note"></textarea>
                    </div>
                    <div className="final-petE">
                        <a href="work-schedule" className="btn-save">Save</a>
                        <a href="work-schedule" className="btn-cancel">Cancel</a>
                    </div>
                </form>
                <div>
                    <div className="petE-tittle-2">----------Information Pet----------</div>
                </div>
            </div>
        </div>
    );
}

export default PetExamRecord;

