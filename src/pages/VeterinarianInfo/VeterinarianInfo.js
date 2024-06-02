//css
import './VeterinarianInfo.css';
//images
import logo_petE from '../../assets/images/img_VeterinarianInfo/logo_petE.png';
import vet1 from '../../assets/images/img_VeterinarianInfo/vet1.jpg';
import vet2 from '../../assets/images/img_VeterinarianInfo/vet2.jpg';
import vet3 from '../../assets/images/img_VeterinarianInfo/vet3.jpg';
import vet4 from '../../assets/images/img_VeterinarianInfo/vet4.jpg';
import vet5 from '../../assets/images/img_VeterinarianInfo/vet5.jpg';
import vet6 from '../../assets/images/img_VeterinarianInfo/vet6.jpg';
//component
import Header from '../../components/User/Header/Header.js';
import Footer from '../../components/User/Footer/Footer.js';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function VeterinarianInfo() {
    return (

		<div>
			<Header></Header>	
		<div>		
			<div className="logo_petE">
				<img src={logo_petE} alt=""/>
			</div>
			<div className="vet-header">
				<p>Team of Veterinarian</p>
			</div>		
		</div>		
	<div>	
		<div className="Vet">		
			<div className="row vet-info">
				<div className="col-md-5 vet">
					<img src={vet1} alt=""/>
					<p className="vet-name">Veterinarian: Vet. Minh</p>
				</div>
				<div className=" col-md-7 vet-info-1">
					<div>
					<p className="vet-h1">Personal Information</p>
					<p className="vet-p">Veterinarian ID: Vet001</p>
					<p className="vet-p">Email: minh@gmail.com</p>
					<p className="vet-p">Gender: Male</p>
					<p className="vet-p">Date of Birth:  30-2-1982</p>
					<p className="vet-p">Place of Birth: London, United Kingdom</p>
					<p className="vet-p">Phone Number: 0364564747</p>
					<p className="vet-p">Experience: 15 years</p>
			
					<p className="vet-h1">Introduction</p>
					<p className="vet-p">
					- Known not only as one of the leading experts in the field of veterinary medicine in Vietnam, Vet. Minh is also loved by everyone for his closeness, dedication and dedication.
					</p>
					<p className="vet-p">
						✓ Vet. Minh is considered the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam
					</p>
					<p className="vet-p">
						✓ The only veterinarian in Vietnam to achieve Black Diamond rank for 2 consecutive years
					</p>
					<p className="vet-p">
						✓ Vet. Minh has experience in treating more than 6,500 veterinary cases, and is considered one of the doctors with the largest number of veterinary patients in Vietnam.
					</p>
				</div>
				</div>
			</div>					
		</div>	
		
		<div className="Vet">
				
			<div className="row vet-info">
				<div className=" col-md-7 vet-info-1">
					<p className="vet-h1">Personal Information</p>
					<p className="vet-p">Veterinarian ID: Vet002</p>
					<p className="vet-p">Email: dat@gmail.com</p>
					<p className="vet-p">Gender: Female</p>
					<p className="vet-p">Date of Birth:  1-1-1990</p>
					<p className="vet-p">Place of Birth: New York, United States</p>
					<p className="vet-p">Phone Number: 0153647587</p>
					<p className="vet-p">Experience: 10 years</p>
					<p className="vet-h1">Introduction</p>
					<p className="vet-p">
					- Vet. Dat graduated from Medical University and has 10 years of experience in treating veterinary diseases.Each year, Dr. Tuan performs on average:
					</p>
					<p className="vet-p">
						✓ 300 births
					</p>
					<p className="vet-p">
						✓ About 1,500 emergency cases ranging from difficult to complex
					</p>
					<p className="vet-p">
						✓ And thousands of virus treatment cases
					</p>
					<p className="vet-p">
					- Vet. Dat said that every pet treatment for him is not just about helping with pain, but rather the desire to bring happiness and health to the pet.
					</p>
					<p className="vet-p">
						- Vet. Tung not only has extensive professional knowledge, but also possesses special qualities such as love for animals, patience and dedication. They are always full of energy and ready to solve any situation

					</p>
				</div>
				<div className="col-md-5 vet">
					<img src={vet2} alt=""/>
					<p className="vet-name">Veterinarian: Vet. Dat</p>
				</div>
			</div>					
		</div>
		
		<div className="Vet">		
			<div className="row vet-info">
				<div className="col-md-5 vet">
					<img src={vet3} alt=""/>
					<p className="vet-name">Veterinarian: Vet. Duong</p>
				</div>
				<div className=" col-md-7 vet-info-1">
					<p className="vet-h1">Personal Information</p>
					<p className="vet-p">Veterinarian ID: Vet003</p>
					<p className="vet-p">Email: duong@gmail.com</p>
					<p className="vet-p">Gender: Male</p>
					<p className="vet-p">Date of Birth:  10-7-1985</p>
					<p className="vet-p">Place of Birth: 	Pretoria, South Africa</p>
					<p className="vet-p">Phone Number: 0255364763</p>
					<p className="vet-p">Experience: 12 years</p>
					<p className="vet-h1">Introduction</p>
					<p className="vet-p">
					- Vet. Duong has more than 12 years of experience and has professional strengths: Surgery - minor tooth extraction, Surgery - hairball removal, Sterilization.
					</p>
					<p className="vet-p">
					- In addition, the doctor also participates in many specialized training courses: Occlusion, Implantology, Surgery, Tissue regeneration...
					</p>
					<p className="vet-p">
					-  Currently, Vet. Duong is a lecturer in the Department of Anatomy and Minor Surgery and the Department of Transplantation, Veterinary Training Institute, University of Medicine. Surgeon and veterinary surgeon at University of Medicine Hospital.
					</p>
					<p className="vet-p">
						- Known not only as one of the leading experts in the field of veterinary medicine in Vietnam, Vet. Minh is also loved by everyone for his closeness, dedication and dedication.
					</p>
				</div>
			</div>					
		</div>		

		<div className="Vet">		
			<div className="row vet-info">
				<div className=" col-md-7 vet-info-1">
					<p className="vet-h1">Personal Information</p>
					<p className="vet-p">Veterinarian ID: Vet004</p>
					<p className="vet-p">Email: thinh@gmail.com</p>
					<p className="vet-p">Gender: Male</p>
					<p className="vet-p">Date of Birth:  23-5-1972</p>
					<p className="vet-p">Place of Birth: Marseille, France</p>
					<p className="vet-p">Phone Number: 0345464723</p>
					<p className="vet-p">Experience: 25 years</p>
					<p className="vet-h1">Introduction</p>
					<p className="vet-p">
					- After graduating from the University of Veterinary Medicine, Vet. Thinh continued to participate in specialized training courses in implantology, dermatology, and orthopedics to improve his expertise and skills towards the goal: Use your surgical experience to become a professional surgeon, bringing many health and happiness values ​​to pets.
						Training certification:
					</p>
					<p className="vet-p">
						✓ Doctor of Veterinary Medicine (DVM)
					</p>
					<p className="vet-p">
						✓ Veterinary Specialist Certificate (Diplomate)
					</p>
					<p className="vet-p">
						✓ Veterinary Technical Certificate
					</p>
					<p className="vet-p">
						✓ Certificates for each animal species
					</p>
					<p className="vet-p">
						✓ Certificate of training program recognized and issued by reputable veterinary organizations AVMA (American Veterinary Medical Association)
					</p>
				</div>
				<div className="col-md-5 vet">
					<img src={vet4} alt=""/>
					<p className="vet-name">Veterinarian: Vet. Thinh</p>
				</div>
			</div>					
		</div>

		<div className="Vet">		
			<div className="row vet-info">
				<div className="col-md-5 vet">
					<img src={vet5} alt=""/>
					<p className="vet-name">Veterinarian: Vet. Phat</p>
				</div>
				<div className=" col-md-7 vet-info-1">
					<p className="vet-h1">Personal Information</p>
					<p className="vet-p">Veterinarian ID: Vet005</p>
					<p className="vet-p">Email: phat@gmail.com</p>
					<p className="vet-p">Gender: Female</p>
					<p className="vet-p">Date of Birth:  17-4-1993</p>
					<p className="vet-p">Place of Birth: 	Dortmund, Germany</p>
					<p className="vet-p">Phone Number: 0467585734</p>
					<p className="vet-p">Experience: 8 years</p>
					<p className="vet-h1">Introduction</p>
					<p className="vet-p">
					- Working history at Dentistry: Started working in April 2016,
					Vet. Phat became a doctor at the clinic, specializing in testing and diagnostic imaging.
					</p>
					<p className="vet-p">
					- Vet. Phat has directly treated more than 1,000 pets, most of whom have gastrointestinal problems.Training certificates:
					</p>
					<p className="vet-p">
						✓ Veterinary training certificate issued by the Department of Health
					</p>
					<p className="vet-p">
						✓ VET Module 2 pet growth program
					</p>
				</div>
			</div>					
		</div>				
		<div className="Vet">		
			<div className="row vet-info">
				<div className=" col-md-7 vet-info-1">
					<p className="vet-h1">Personal Information</p>
					<p className="vet-p">Veterinarian ID: Vet006</p>
					<p className="vet-p">Email: tung@gmail.com</p>
					<p className="vet-p">Gender: Male</p>
					<p className="vet-p">Date of Birth:  13-4-1985</p>
					<p className="vet-p">Place of Birth: 	St. Petersburg, Russia</p>
					<p className="vet-p">Phone Number: 0345647673</p>
					<p className="vet-p">Experience: 16 years</p>
					<p className="vet-h1">Introduction</p>
					<p className="vet-p">
					- Vet. Tung is an expert who has undergone 4 years of intensive training at accredited veterinary schools and 16 experience years, with a curriculum that includes anatomy, physiology, pathology, pharmacology, and clinical practice. After receiving the degree of Doctor of Veterinary Medicine (DVM), Vet. Tung has specialist certificates such as the Veterinary Specialist Certificate (Diplomate) to become an expert in fields such as internal medicine, surgery, and public veterinary medicine.
					</p>
					<p className="vet-p">
					- Vet. Tung not only has extensive professional knowledge, but also possesses special qualities such as love for animals, patience and dedication. They are always full of energy and ready to solve any situation
					</p>
					<p className="vet-p"> 
						- Known not only as one of the leading experts in the field of veterinary medicine in Vietnam, Vet. Minh is also loved by everyone for his closeness, dedication and dedication.
					</p>
				</div>
				<div className="col-md-5 vet">
					<img src={vet6} alt=""/>
					<p className="vet-name">Veterinarian: Vet. Tung</p>
				</div>
			</div>					
		</div>
		</div>
		
		<div className="Vet">		
			<div className="col-md-12 vet-final">
				<p>----------Veterinarian Information----------</p>
			</div>					
		</div>
		<Footer></Footer>
		</div>
    )
}

export default VeterinarianInfo;
