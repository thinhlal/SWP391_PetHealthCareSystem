//css
import './VeterinarianInfo.css';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
	useEffect(() => {
		AOS.init({ duration: 1000 });
	}, []);

	return (
		<div className="all-vet">
			<Header></Header>
			<div className=" row vet-slider">
				<div className=' col-md-6 vet-header'>
					<h1>Team of Veterinarians</h1>
					<p>Page includes all veterinarians and assistants</p>
				</div>
				<div className=" col-md-6 overlap-vet-slider">
					<img src={logo_petE} alt="" />
				</div>
			</div>

			{/* vet Part */}
			<div className="vet-part" data-aos="fade-left">
				<div className='vet-picture-wrapper'>
					<div className="vet-picture">
						<img className="img-service-vet" src={vet1} alt="vet" />
					</div>
					<div className="vet-picture-content">
						<p>Education and training</p>
						<ul>
							<li><strong>Dental - Maxillofacial System Hanoi Medical University</strong></li>
						</ul>
						<div className='vet-picture-content-main-wrapper'>
							<div className='vet-picture-content-main'>
								<div>
									<span>Main expertise:</span>
									<strong>Implant, porcelain crown, tooth extraction</strong>
								</div>
								<div>
									<span>Main expertise:</span>
									<strong>Implant, porcelain crown, tooth extraction</strong>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="content-vet">
					<div className="list-item-vet">
						<div className="title-services-vet">Veterinarian: Vet. Minh</div>

						<div className="content-list-vet">
							<div className="text-content-vet">
								<div className="title-text-content-vet">Personal Information</div>
								<div className="text-vet">
									<div className="vet-p">Veterinarian ID: Vet001</div>
									<div className="vet-p">Email: minh@gmail.com</div>
									<div className="vet-p">Gender: Male</div>
									<div className="vet-p">Date of Birth:  30-2-1982</div>
									<div className="vet-p">Place of Birth: London, United Kingdom</div>
									<div className="vet-p">Phone Number: 0364564747</div>
									<div className="vet-p">Experience: 15 years</div>
								</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-content-vet">
								<div className="title-text-content-vet">Introduction</div>
								<div className="text-vet">
									<div className="vet-p">
										- Known not only as one of the leading experts in the field of veterinary medicine in Vietnam, Vet. Minh is also loved by everyone for his closeness, dedication and dedication.
									</div>
									<div className="vet-p">
										✓ Vet. Minh is considered the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam
									</div>
									<div className="vet-p">
										✓ The only veterinarian in Vietnam to achieve Black Diamond rank for 2 consecutive years
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


			{/* vet2 Part */}
			<div className="vet-part2" data-aos="fade-right">
				<div className="content-vet2">
					<div className="list-vet2">
						<div className="list-vet2-title">Veterinarian: Vet. Dat</div>
						<div className="list-vet2-item">
							<div className="list-vet2-item-text">
								<div className="vet2-text-name">Personal Information</div>
								<div className="list-vet2-text">
									<div className="vet-p">Veterinarian ID: Vet002</div>
									<div className="vet-p">Email: dat@gmail.com</div>
									<div className="vet-p">Gender: Female</div>
									<div className="vet-p">Date of Birth:  1-1-1990</div>
									<div className="vet-p">Place of Birth: New York, United States</div>
									<div className="vet-p">Phone Number: 0153647587</div>
									<div className="vet-p">Experience: 10 years</div>
								</div>
							</div>
						</div>
						<div className="list-vet2-item">
							<div className="list-vet2-item-text">
								<div className="vet2-text-name">Introduction</div>
								<div className="list-vet2-text">
									<div className="vet-p">
										Vet. Dat graduated from Medical University and has 10 years of experience in treating veterinary diseases.
									</div>
									<div className="vet-p">
										✓ 300 births
									</div>
									<div className="vet-p">
										✓ About 1,500 emergency cases ranging from difficult to complex
									</div>
									<div className="vet-p">
										✓ And thousands of virus treatment cases
									</div>
									<div className="vet-p">
										✓ Vet. Dat said that every pet treatment for him is not just about helping with pain, but rather the desire to bring happiness and health to the pet.
									</div>
								</div>
							</div>
						</div>
						<div className="list-vet2-item">
						</div>
					</div>
				</div>
				<div className="picture-vet2">
					<div className="avatar-vet2">
						<img className="img-service-vet" src={vet2} alt="vet2" />
					</div>
				</div>
			</div>


			{/* vet Part */}
			<div className="vet-part" data-aos="fade-left">
				<div className="vet-picture">
					<img className="img-service-vet" src={vet3} alt="vet" />
				</div>
				<div className="content-vet">
					<div className="list-item-vet">
						<div className="title-services-vet">Veterinarian: Vet. Duong</div>

						<div className="content-list-vet">
							<div className="text-content-vet">
								<div className="title-text-content-vet">Personal Information</div>
								<div className="text-vet">
									<div className="vet-p">Veterinarian ID: Vet003</div>
									<div className="vet-p">Email: duong@gmail.com</div>
									<div className="vet-p">Gender: Male</div>
									<div className="vet-p">Date of Birth:  10-7-1985</div>
									<div className="vet-p">Place of Birth: 	Pretoria, South Africa</div>
									<div className="vet-p">Phone Number: 0255364763</div>
									<div className="vet-p">Experience: 12 years</div>
								</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-content-vet">
								<div className="title-text-content-vet">Introduction</div>
								<div className="text-vet">
									<div className="vet-p">
										- Vet. Duong has more than 12 years of experience and has professional strengths: Surgery - minor tooth extraction, Surgery - hairball removal, Sterilization.
									</div>
									<div className="vet-p">
										✓ In addition, the doctor also participates in many specialized training courses: Occlusion, Implantology, Surgery, Tissue regeneration...
									</div>
									<div className="vet-p">
										✓  Currently, Vet. Duong is a lecturer in the Department of Anatomy and Minor Surgery and the Department of Transplantation, Veterinary Training Institute, University of Medicine.
									</div>
								</div>
							</div>
						</div>

						<div className="content-list-vet">
						</div>
					</div>
				</div>
			</div>


			{/* vet2 Part */}
			<div className="vet-part2" data-aos="fade-right">
				<div className="content-vet2">
					<div className="list-vet2">
						<div className="list-vet2-title">Veterinarian: Vet. Thinh</div>
						<div className="list-vet2-item">
							<div className="list-vet2-item-text">
								<div className="vet2-text-name">Personal Information</div>
								<div className="list-vet2-text">
									<div className="vet-p">Veterinarian ID: Vet004</div>
									<div className="vet-p">Email: thinh@gmail.com</div>
									<div className="vet-p">Gender: Male</div>
									<div className="vet-p">Date of Birth:  23-5-1972</div>
									<div className="vet-p">Place of Birth: Marseille, France</div>
									<div className="vet-p">Phone Number: 0345464723</div>
									<div className="vet-p">Experience: 25 years</div>
								</div>
							</div>
						</div>
						<div className="list-vet2-item">
							<div className="list-vet2-item-text">
								<div className="vet2-text-name">Introduction</div>
								<div className="list-vet2-text">
									<div className="vet-p">
										After graduating from the University of Veterinary Medicine, Vet. Thinh continued to participate in specialized training courses in implantology&nbsp; -
									</div>
									<div className="vet-p">
										✓ Doctor of Veterinary Medicine (DVM)
									</div>
									<div className="vet-p">
										✓ Veterinary Specialist Certificate (Diplomate)
									</div>
									<div className="vet-p">
										✓ Veterinary Technical Certificate
									</div>
									<div className="vet-p">
										✓ Certificate of training program recognized and issued by reputable veterinary organizations AVMA (American Veterinary Medical Association)
									</div>
								</div>
							</div>
						</div>
						<div className="list-vet2-item">
						</div>
					</div>
				</div>
				<div className="picture-vet2">
					<div className="avatar-vet2">
						<img className="img-service-vet" src={vet4} alt="vet2" />
					</div>
				</div>
			</div>

			{/* vet Part */}
			<div className="vet-part" data-aos="fade-left">
				<div className="vet-picture">
					<div className="avatar-vet">
						<img className="img-service-vet" src={vet5} alt="vet" />
					</div>
				</div>
				<div className="content-vet">
					<div className="list-item-vet">
						<div className="title-services-vet">Veterinarian: Vet. Phat</div>

						<div className="content-list-vet">
							<div className="text-content-vet">
								<div className="title-text-content-vet">Personal Information</div>
								<div className="text-vet">
									<div className="vet-p">Veterinarian ID: Vet005</div>
									<div className="vet-p">Email: phat@gmail.com</div>
									<div className="vet-p">Gender: Female</div>
									<div className="vet-p">Date of Birth:  17-4-1993</div>
									<div className="vet-p">Place of Birth: 	Dortmund, Germany</div>
									<div className="vet-p">Phone Number: 0467585734</div>
									<div className="vet-p">Experience: 8 years</div>
								</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-content-vet">
								<div className="title-text-content-vet">Introduction</div>
								<div className="text-vet">
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

						<div className="content-list-vet">
						</div>
					</div>
				</div>
			</div>


			{/* vet2 Part */}
			<div className="vet-part2" data-aos="fade-right">
				<div className="content-vet2">
					<div className="list-vet2">
						<div className="list-vet2-title">Veterinarian: Vet. Tung</div>
						<div className="list-vet2-item">
							<div className="list-vet2-item-text">
								<div className="vet2-text-name">Personal Information</div>
								<div className="list-vet2-text">
									<div className="vet-p">Veterinarian ID: Vet006</div>
									<div className="vet-p">Email: tung@gmail.com</div>
									<div className="vet-p">Gender: Male</div>
									<div className="vet-p">Date of Birth:  13-4-1985</div>
									<div className="vet-p">Place of Birth: 	St. Petersburg, Russia</div>
									<div className="vet-p">Phone Number: 0345647673</div>
									<div className="vet-p">Experience: 16 years</div>
								</div>
							</div>
						</div>
						<div className="list-vet2-item">
							<div className="list-vet2-item-text">
								<div className="vet2-text-name">Introduction</div>
								<div className="list-vet2-text">
									<div className="vet-p">
										Vet. Tung is an expert who has undergone 4 years of intensive training at accredited veterinary schools and 16 experience years, with a curriculum that includes anatomy, physiology, pathology, pharmacology.
									</div>
									<div className="vet-p">
										Vet. Tung not only has extensive professional knowledge, but also possesses special qualities such as love for animals, patience and dedication. They are always full of energy and ready to solve any situation
									</div>
									<div className="vet-p">
										Known not only as one of the leading experts in the field of veterinary medicine in Vietnam.
									</div>
								</div>
							</div>
						</div>
						<div className="list-vet2-item">
						</div>
					</div>
				</div>
				<div className="picture-vet2">
					<div className="avatar-vet2">
						<img className="img-service-vet" src={vet6} alt="vet2" />
					</div>
				</div>
			</div>

			<Footer></Footer>
		</div>
	);
}

export default VeterinarianInfo;
