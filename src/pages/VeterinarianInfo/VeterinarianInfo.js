//css
import './VeterinarianInfo.css';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
//images
import logo_petE from '../../assets/images/img_VeterinarianInfo/banner.png';
import vet1 from '../../assets/images/img_VeterinarianInfo/pexels-cristian-rojas-8460157.jpg';
import vet2 from '../../assets/images/img_VeterinarianInfo/pexels-thirdman-5327580.jpg';
import vet3 from '../../assets/images/img_VeterinarianInfo/pexels-shkrabaanthony-5215024.jpg';
import vet4 from '../../assets/images/img_VeterinarianInfo/pexels-klaus-nielsen-6303564.jpg';
import vet5 from '../../assets/images/img_VeterinarianInfo/pexels-tima-miroshnichenko-6235666.jpg';
import vet6 from '../../assets/images/img_VeterinarianInfo/pexels-karolina-grabowska-6627919.jpg';
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
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Minh</div>
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
						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">Known not only as one of the leading experts in the field of orthodontics in Vietnam, Dr. Pham Hong Duc is also loved by everyone for his friendliness, dedication and enthusiasm.</div>
								<div className="vet-p">✓ Dr. Minh is rated by Invisalign as the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam.</div>
								<div className="vet-p">✓ The only doctor in Vietnam to achieve Black Diamond rank for 2 consecutive years</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
									✓ 1 of 3 doctors using the Damon automatic braces system most successfully in Vietnam
								</div>
								<div className="vet-p">
								✓ Translator of famous orthodontic books such as 1001 clinical tips in orthodontics (2015), Clinical cases in orthodontics (2015), Biomechanics in orthodontics (2016),...								</div>
								<div className="vet-p">
								✓ Doctor Duc has experience in treating more than 6,500 orthodontic cases, and is considered one of the doctors with the largest number of orthodontic patients in Hanoi.								</div>
								<div className="vet-p">
								✓ Be the first person to bring the F.A.C.E Braces Without Extraction method from abroad to apply in Vietnam, helping to minimize tooth extraction even without tooth extraction while still bringing the highest treatment effectiveness.								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Tung</div>
					<div className='vet-picture-wrapper'>
						<div className="vet-picture">
							<img className="img-service-vet" src={vet6} alt="vet" />
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
						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">Known not only as one of the leading experts in the field of orthodontics in Vietnam, Dr. Pham Hong Duc is also loved by everyone for his friendliness, dedication and enthusiasm.</div>
								<div className="vet-p">✓ Dr. Tung is rated by Invisalign as the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam.</div>
								<div className="vet-p">✓ The only doctor in Vietnam to achieve Black Diamond rank for 2 consecutive years</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
								✓ 1 in 3 doctors using the Damon automatic braces system most successfully in Vietnam								</div>
								<div className="vet-p">
								✓ Translator of famous orthodontic books such as 1001 clinical tips in orthodontics (2015), Clinical cases in orthodontics (2015), Biomechanics in orthodontics (2016),...								</div>
								<div className="vet-p">
								✓ Doctor Duc has experience in treating more than 6,500 orthodontic cases, and is considered one of the doctors with the largest number of orthodontic patients in Hanoi.								</div>
								<div className="vet-p">
								✓ Be the first person to bring the F.A.C.E Braces Without Extraction method from abroad to apply in Vietnam, helping to minimize tooth extraction even without tooth extraction while still bringing the highest treatment effectiveness.								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Dat</div>
					<div className='vet-picture-wrapper'>
						<div className="vet-picture">
							<img className="img-service-vet" src={vet2} alt="vet" />
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
						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">Known not only as one of the leading experts in the field of orthodontics in Vietnam, Dr. Pham Hong Duc is also loved by everyone for his friendliness, dedication and enthusiasm.</div>
								<div className="vet-p">✓ Dr. Dat is rated by Invisalign as the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam.</div>
								<div className="vet-p">✓ The only doctor in Vietnam to achieve Black Diamond rank for 2 consecutive years</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
								✓ 1 in 3 doctors using the Damon automatic braces system most successfully in Vietnam								</div>
								<div className="vet-p">
								✓ Translator of famous orthodontic books such as 1001 clinical tips in orthodontics (2015), Clinical cases in orthodontics (2015), Biomechanics in orthodontics (2016),...								</div>
								<div className="vet-p">
								✓ Doctor Duc has experience in treating more than 6,500 orthodontic cases, and is considered one of the doctors with the largest number of orthodontic patients in Hanoi.								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Duong</div>
					<div className='vet-picture-wrapper'>
						<div className="vet-picture">
							<img className="img-service-vet" src={vet3} alt="vet" />
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
						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">Known not only as one of the leading experts in the field of orthodontics in Vietnam, Dr. Pham Hong Duc is also loved by everyone for his friendliness, dedication and enthusiasm.</div>
								<div className="vet-p">✓ Dr. Duong is rated by Invisalign as the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam.</div>
								<div className="vet-p">✓The only doctor in Vietnam to achieve Black Diamond rank for 2 consecutive years</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
								✓ 1 in 3 doctors using the Damon automatic braces system most successfully in Vietnam								</div>
								<div className="vet-p">
								✓ Translator of famous orthodontic books such as 1001 clinical tips in orthodontics (2015), Clinical cases in orthodontics (2015), Biomechanics in orthodontics (2016),...								</div>
								<div className="vet-p">
								✓ Be the first person to bring the F.A.C.E Braces Without Extraction method from abroad to apply in Vietnam, helping to minimize tooth extraction even without tooth extraction while still bringing the highest treatment effectiveness.								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Thinh</div>
					<div className='vet-picture-wrapper'>
						<div className="vet-picture">
							<img className="img-service-vet" src={vet4} alt="vet" />
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
						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">Known not only as one of the leading experts in the field of orthodontics in Vietnam, Dr. Pham Hong Duc is also loved by everyone for his friendliness, dedication and enthusiasm.</div>
								<div className="vet-p">✓ Dr. Thinh is rated by Invisalign as the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam.</div>
								<div className="vet-p">✓ The only doctor in Vietnam to achieve Black Diamond rank for 2 consecutive years</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
								✓ 1 in 3 doctors using the Damon automatic braces system most successfully in Vietnam								</div>
								<div className="vet-p">
								✓ Translator of famous orthodontic books such as 1001 clinical tips in orthodontics (2015), Clinical cases in orthodontics (2015), Biomechanics in orthodontics (2016),...								</div>
								<div className="vet-p">
								✓ Doctor Duc has experience in treating more than 6,500 orthodontic cases, and is considered one of the doctors with the largest number of orthodontic patients in Hanoi.								</div>
								<div className="vet-p">
								✓ Be the first person to bring the F.A.C.E Braces Without Extraction method from abroad to apply in Vietnam, helping to minimize tooth extraction even without tooth extraction while still bringing the highest treatment effectiveness.								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Phat</div>
					<div className='vet-picture-wrapper'>
						<div className="vet-picture">
							<img className="img-service-vet" src={vet5} alt="vet" />
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
						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">Known not only as one of the leading experts in the field of orthodontics in Vietnam, Dr. Pham Hong Duc is also loved by everyone for his friendliness, dedication and enthusiasm.</div>
								<div className="vet-p">✓ Dr. Phat is rated by Invisalign as the TOP 1 doctor in Southeast Asia and TOP 1 in terms of experience and expertise in Vietnam.</div>
								<div className="vet-p">✓ The only doctor in Vietnam to achieve Black Diamond rank for 2 consecutive years</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
								✓ 1 in 3 doctors using the Damon automatic braces system most successfully in Vietnam								</div>
								<div className="vet-p">
								✓ Translator of famous orthodontic books such as 1001 clinical tips in orthodontics (2015), Clinical cases in orthodontics (2015), Biomechanics in orthodontics (2016),...								</div>
								<div className="vet-p">
								✓ Doctor Duc has experience in treating more than 6,500 orthodontic cases, and is considered one of the doctors with the largest number of orthodontic patients in Hanoi.								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<Footer></Footer>
		</div>
	);
}

export default VeterinarianInfo;
