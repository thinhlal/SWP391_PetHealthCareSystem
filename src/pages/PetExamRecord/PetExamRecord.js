//css
import './PetExamRecord.css';
//images
import logo_petE from '../../assets/images/img_PetExamRecord/logo_petE.png';
import petExam_success from '../../assets/images/img_PetExamRecord/petExam_success.png';

function PetExamRecord() {

    return (

    <div>
    <div class="petExam-body">
        <div class="petExam-container">
        <div class="logo_petE"><img src={logo_petE}alt=""/></div>
        <div class="success-icon"><img src={petExam_success} alt=""/></div>
        <h1 class="petExam-message">Pet Exam Record Successfully!</h1>
        <div class="petExam-details">
            <p class="petExam-info">Pet ID: PET1</p>
            <p class="petExam-info">Pet Name: Jack</p>
            <p class="petExam-info">Pet Type: Dog</p>
            <p class="petExam-info">Pet Weight: 15 kg</p>
            <p class="petExam-info">Pet Gender: Male</p>
            <p class="petExam-info">Pet Owner: Messi</p>
            <p class="petExam-info">Pet Symptoms: cough, runny nose</p>
        </div>
            <p class="petExam-script">Your request has been received.</p>
            <button type="submit" class="petExam-button">Continue</button>
        </div>

    </div>
    </div>
    )
}

export default PetExamRecord;
