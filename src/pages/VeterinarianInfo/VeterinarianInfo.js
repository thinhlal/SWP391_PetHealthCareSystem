//css
import './VeterinarianInfo.css';
//images
import logo_petE from '../../assets/images/img_VeterinarianInfo/banner.png';
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
		<div className='doctor-info'>
			<Header></Header>
			<div className='doctor-info-slider'>
				<div className="vet-header">
					<h1>Team of Veterinarians</h1>
					<p>Page includes all veterinarians and assistants</p>
				</div>
				<div className="logo_petE">
					<img src={logo_petE} alt="" />
				</div>
			</div>
			<div>

				{/* vet 1 */}
				<div className="vet-information-1">
				    <div className="vet-name">Veterinarian: Vet. Minh</div>
					<div className="row vet-info">
						<div className="col-md-6 vet-info-img">
							<img src={vet1} className='image-vet' alt="" />
						</div>
						<div className=" col-md-6 vet-info-1">
								<div className="vet-h1">Personal Information</div>
								<div className="vet-p">Veterinarian ID: Vet001</div>
								<div className="vet-p">Email: minh@gmail.com</div>
								<div className="vet-p">Gender: Male</div>
								<div className="vet-p">Date of Birth:  30-2-1982</div>
								<div className="vet-p">Place of Birth: London, United Kingdom</div>
								<div className="vet-p">Phone Number: 0364564747</div>
								<div className="vet-p">Experience: 15 years</div>                         							
						</div>
						<div className='introduction-vet-info'>
								<div className="vet-h1">Introduction</div>
								<div className="vet-p">
									- &nbsp;Known not only as one of the leading experts in the field of veterinary medicine in Vietnam, Vet. Minh is also loved by everyone for his closeness, dedication and dedication.
								</div>
								<div className="vet-p">
									✓ Vet. Minh is considered the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam
								</div>
								<div className="vet-p">
									✓ The only veterinarian in Vietnam to achieve Black Diamond rank for 2 consecutive years
								</div>
								<div className="vet-p">
									✓ Vet. Minh has experience in treating more than 6,500 veterinary cases, and is considered one of the doctors with the largest number of veterinary patients in Vietnam.
								</div>
								</div>
					</div>
				</div>
                
				{/* vet 2 */}
				<div className="vet-information-2">
				<div className="vet-name">Veterinarian: Vet. Dat</div>
					<div className="row vet-info-right">
					    
					 <div className=" col-md-6 vet-info-2">
							<div className="vet-h1">Personal Information</div>
							<div className="vet-p">Veterinarian ID: Vet002</div>
							<div className="vet-p">Email: dat@gmail.com</div>
							<div className="vet-p">Gender: Female</div>
							<div className="vet-p">Date of Birth:  1-1-1990</div>
							<div className="vet-p">Place of Birth: New York, United States</div>
							<div className="vet-p">Phone Number: 0153647587</div>
							<div className="vet-p">Experience: 10 years</div>
					 </div>	
					 <div className="col-md-6 vet-info-img"> 
							<img src={vet2} className='image-vet' alt="" />	
						</div>	
						
						<div className='introduction-vet-info-right'>
							<div className="vet-h1">Introduction</div>
							<div className="vet-p">
								Vet. Dat graduated from Medical University and has 10 years of experience in treating veterinary diseases&nbsp;-
							</div>
							<div className="vet-p">
								 300 births ✓
							</div>
							<div className="vet-p">
								 About 1,500 emergency cases ranging from difficult to complex ✓
							</div>
							<div className="vet-p">
								 And thousands of virus treatment cases ✓
							</div>
							<div className="vet-p">
								Vet. Dat said that every pet treatment for him is not just about helping with pain, but rather the desire to bring happiness and health to the pet. ✓
							</div>
							<div className="vet-p">
								Vet. Tung not only has extensive professional knowledge, but also possesses special qualities such as love for animals, patience and dedication. They are always full of energy and ready to solve any situation ✓
							</div>											
				        </div>                 
					  </div>
				 </div>
                
				{/* vet 3 */}
				<div className="vet-information-3">
				<div className="vet-name">Veterinarian: Vet. Duong</div>
					<div className="row vet-info">
						<div className="col-md-6 vet-info-img">
							<img src={vet3} className='image-vet' alt="" />							
						</div>
						<div className=" col-md-6 vet-info-1">
							<div className="vet-h1">Personal Information</div>
							<div className="vet-p">Veterinarian ID: Vet003</div>
							<div className="vet-p">Email: duong@gmail.com</div>
							<div className="vet-p">Gender: Male</div>
							<div className="vet-p">Date of Birth:  10-7-1985</div>
							<div className="vet-p">Place of Birth: 	Pretoria, South Africa</div>
							<div className="vet-p">Phone Number: 0255364763</div>
							<div className="vet-p">Experience: 12 years</div>
						</div>
						<div className='introduction-vet-info'>
							<div className="vet-h1">Introduction</div>
							<div className="vet-p">
								- Vet. Duong has more than 12 years of experience and has professional strengths: Surgery - minor tooth extraction, Surgery - hairball removal, Sterilization.
							</div>
							<div className="vet-p">
								✓ In addition, the doctor also participates in many specialized training courses: Occlusion, Implantology, Surgery, Tissue regeneration...
							</div>
							<div className="vet-p">
								✓  Currently, Vet. Duong is a lecturer in the Department of Anatomy and Minor Surgery and the Department of Transplantation, Veterinary Training Institute, University of Medicine. Surgeon and veterinary surgeon at University of Medicine Hospital.
							</div>
							<div className="vet-p">
								✓ Known not only as one of the leading experts in the field of veterinary medicine in Vietnam, Vet. Minh is also loved by everyone for his closeness, dedication and dedication.
							</div>
				    </div>
					</div>
				</div>
                
				{/* vet 4 */}
				<div className="vet-information-4">
				<p className="vet-name">Veterinarian: Vet. Thinh</p>
				<div className="row vet-info-right">
					
						<div className=" col-md-6 vet-info-2">
							<div className="vet-h1">Personal Information</div>
							<div className="vet-p">Veterinarian ID: Vet004</div>
							<div className="vet-p">Email: thinh@gmail.com</div>
							<div className="vet-p">Gender: Male</div>
							<div className="vet-p">Date of Birth:  23-5-1972</div>
							<div className="vet-p">Place of Birth: Marseille, France</div>
							<div className="vet-p">Phone Number: 0345464723</div>
							<div className="vet-p">Experience: 25 years</div>
						</div>
						<div className="col-md-6 vet-info-img">
							<img src={vet4} className='image-vet' alt="" />
					    </div>
						<div className='introduction-vet-info-right'>
							<div className="vet-h1">Introduction</div>
							<div className="vet-p">
								After graduating from the University of Veterinary Medicine, Vet. Thinh continued to participate in specialized training courses in implantology&nbsp; -
							</div>
							<div className="vet-p">
								 Doctor of Veterinary Medicine (DVM) ✓
							</div>
							<div className="vet-p">
								 Veterinary Specialist Certificate (Diplomate) ✓
							</div>
							<div className="vet-p">
								 Veterinary Technical Certificate ✓
							</div>
							<div className="vet-p">
								 Certificates for each animal species ✓
							</div>
							<div className="vet-p">
								Certificate of training program recognized and issued by reputable veterinary organizations AVMA (American Veterinary Medical Association) ✓ 
							</div>
					</div>
					</div>
				</div>
                
				{/* vet 5 */}
				<div className="vet-information-5">
				<div className="vet-name">Veterinarian: Vet. Phat</div>
					<div className="row vet-info">
						<div className="col-md-6 vet-info-img">
							<img src={vet5} className='image-vet' alt="" />
						</div>
						<div className=" col-md-6 vet-info-1">
							<div className="vet-h1">Personal Information</div>
							<div className="vet-p">Veterinarian ID: Vet005</div>
							<div className="vet-p">Email: phat@gmail.com</div>
							<div className="vet-p">Gender: Female</div>
							<div className="vet-p">Date of Birth:  17-4-1993</div>
							<div className="vet-p">Place of Birth: 	Dortmund, Germany</div>
							<div className="vet-p">Phone Number: 0467585734</div>
							<div className="vet-p">Experience: 8 years</div>
						</div>
						<div className='introduction-vet-info'>
							<div className="vet-h1">Introduction</div>
							<div className="vet-p">
								- Working history at Dentistry: Started working in April 2016,
								Vet. Phat became a doctor at the clinic, specializing in testing and diagnostic imaging.
							</div>
							<div className="vet-p">
								- Vet. Phat has directly treated more than 1,000 pets, most of whom have gastrointestinal problems.Training certificates:
							</div>
							<div className="vet-p">
								✓ Veterinary training certificate issued by the Department of Health
							</div>
							<div className="vet-p">
								✓ VET Module 2 pet growth program
							</div>
					</div>
					</div>
				</div>

				{/* vet 6 */}
				<div className="vet-information-6">
				<div className="vet-name">Veterinarian: Vet. Tung</div>
					<div className="row vet-info-right">
					
						<div className=" col-md-6 vet-info-2">
							<div className="vet-h1">Personal Information</div>
							<div className="vet-p">Veterinarian ID: Vet006</div>
							<div className="vet-p">Email: tung@gmail.com</div>
							<div className="vet-p">Gender: Male</div>
							<div className="vet-p">Date of Birth:  13-4-1985</div>
							<div className="vet-p">Place of Birth: 	St. Petersburg, Russia</div>
							<div className="vet-p">Phone Number: 0345647673</div>
							<div className="vet-p">Experience: 16 years</div>
						</div>
						<div className="col-md-6 vet-info-img">
							<img src={vet6} className='image-vet' alt="" />
							
					    </div>
						<div className='introduction-vet-info-right'>
							<div className="vet-h1">Introduction</div>
							<div className="vet-p">
								Vet. Tung is an expert who has undergone 4 years of intensive training at accredited veterinary schools and 16 experience years, with a curriculum that includes anatomy, physiology, pathology, pharmacology &nbsp; -			
								</div>
							<div className="vet-p">
								 Vet. Tung not only has extensive professional knowledge, but also possesses special qualities such as love for animals, patience and dedication. They are always full of energy and ready to solve any situation ✓
							</div>
							<div className="vet-p">
								 Known not only as one of the leading experts in the field of veterinary medicine in Vietnam, Vet. Minh is also loved by everyone for his closeness, dedication and dedication ✓ 
							</div>
					</div>
					</div>
				</div>
			</div>
			<Footer></Footer>
		</div>
	)
}

export default VeterinarianInfo;
