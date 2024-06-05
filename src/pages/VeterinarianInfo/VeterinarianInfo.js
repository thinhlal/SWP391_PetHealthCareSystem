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
								<div className="vet-p">✓ Bác sĩ Đức được hàng Invisalign đánh giá là bác sĩ TOP 1 tại Đông Nam Á và TOP 1 về kinh nghiệm, chuyên môn tại Việt Nam</div>
								<div className="vet-p">✓ Bác sĩ duy nhất tại Việt Nam 2 năm liên tiếp đạt thứ hạng Black Diamond</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
									✓ 1 trong 3 bác sĩ sử dụng hệ thống mắc cài tự động Damon thành công nhất Việt Nam
								</div>
								<div className="vet-p">
									✓ Dịch giả của những cuốn sách chỉnh nha nổi tiếng như 1001 bí kíp lâm sàng trong chỉnh nha (2015), Các ca lâm sàng trong chỉnh nha (2015), Cơ sinh học trong chỉnh nha (2016),…
								</div>
								<div className="vet-p">
									✓ Bác sĩ Đức đã có kinh nghiệm điều trị hơn 6500 ca chỉnh nha, được coi là một trong những bác sĩ có số lượng KH niềng răng lớn nhất Hà Nội.
								</div>
								<div className="vet-p">
									✓ Là người đầu tiên đưa phương pháp Niềng không nhổ răng F.A.C.E từ nước ngoài về ứng dụng tại Việt Nam, giúp hạn chế tối đa việc nhổ răng thậm chí không cần nhổ răng mà vẫn mang lại hiệu quả điều trị cao nhất.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Minh</div>
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
								<div className="vet-p">✓ Bác sĩ Đức được hàng Invisalign đánh giá là bác sĩ TOP 1 tại Đông Nam Á và TOP 1 về kinh nghiệm, chuyên môn tại Việt Nam</div>
								<div className="vet-p">✓ Bác sĩ duy nhất tại Việt Nam 2 năm liên tiếp đạt thứ hạng Black Diamond</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
									✓ 1 trong 3 bác sĩ sử dụng hệ thống mắc cài tự động Damon thành công nhất Việt Nam
								</div>
								<div className="vet-p">
									✓ Dịch giả của những cuốn sách chỉnh nha nổi tiếng như 1001 bí kíp lâm sàng trong chỉnh nha (2015), Các ca lâm sàng trong chỉnh nha (2015), Cơ sinh học trong chỉnh nha (2016),…
								</div>
								<div className="vet-p">
									✓ Bác sĩ Đức đã có kinh nghiệm điều trị hơn 6500 ca chỉnh nha, được coi là một trong những bác sĩ có số lượng KH niềng răng lớn nhất Hà Nội.
								</div>
								<div className="vet-p">
									✓ Là người đầu tiên đưa phương pháp Niềng không nhổ răng F.A.C.E từ nước ngoài về ứng dụng tại Việt Nam, giúp hạn chế tối đa việc nhổ răng thậm chí không cần nhổ răng mà vẫn mang lại hiệu quả điều trị cao nhất.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Minh</div>
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
								<div className="vet-p">✓ Bác sĩ Đức được hàng Invisalign đánh giá là bác sĩ TOP 1 tại Đông Nam Á và TOP 1 về kinh nghiệm, chuyên môn tại Việt Nam</div>
								<div className="vet-p">✓ Bác sĩ duy nhất tại Việt Nam 2 năm liên tiếp đạt thứ hạng Black Diamond</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
									✓ 1 trong 3 bác sĩ sử dụng hệ thống mắc cài tự động Damon thành công nhất Việt Nam
								</div>
								<div className="vet-p">
									✓ Dịch giả của những cuốn sách chỉnh nha nổi tiếng như 1001 bí kíp lâm sàng trong chỉnh nha (2015), Các ca lâm sàng trong chỉnh nha (2015), Cơ sinh học trong chỉnh nha (2016),…
								</div>
								<div className="vet-p">
									✓ Bác sĩ Đức đã có kinh nghiệm điều trị hơn 6500 ca chỉnh nha, được coi là một trong những bác sĩ có số lượng KH niềng răng lớn nhất Hà Nội.
								</div>
								<div className="vet-p">
									✓ Là người đầu tiên đưa phương pháp Niềng không nhổ răng F.A.C.E từ nước ngoài về ứng dụng tại Việt Nam, giúp hạn chế tối đa việc nhổ răng thậm chí không cần nhổ răng mà vẫn mang lại hiệu quả điều trị cao nhất.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Minh</div>
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
								<div className="vet-p">✓ Bác sĩ Đức được hàng Invisalign đánh giá là bác sĩ TOP 1 tại Đông Nam Á và TOP 1 về kinh nghiệm, chuyên môn tại Việt Nam</div>
								<div className="vet-p">✓ Bác sĩ duy nhất tại Việt Nam 2 năm liên tiếp đạt thứ hạng Black Diamond</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
									✓ 1 trong 3 bác sĩ sử dụng hệ thống mắc cài tự động Damon thành công nhất Việt Nam
								</div>
								<div className="vet-p">
									✓ Dịch giả của những cuốn sách chỉnh nha nổi tiếng như 1001 bí kíp lâm sàng trong chỉnh nha (2015), Các ca lâm sàng trong chỉnh nha (2015), Cơ sinh học trong chỉnh nha (2016),…
								</div>
								<div className="vet-p">
									✓ Bác sĩ Đức đã có kinh nghiệm điều trị hơn 6500 ca chỉnh nha, được coi là một trong những bác sĩ có số lượng KH niềng răng lớn nhất Hà Nội.
								</div>
								<div className="vet-p">
									✓ Là người đầu tiên đưa phương pháp Niềng không nhổ răng F.A.C.E từ nước ngoài về ứng dụng tại Việt Nam, giúp hạn chế tối đa việc nhổ răng thậm chí không cần nhổ răng mà vẫn mang lại hiệu quả điều trị cao nhất.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Minh</div>
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
								<div className="vet-p">✓ Bác sĩ Đức được hàng Invisalign đánh giá là bác sĩ TOP 1 tại Đông Nam Á và TOP 1 về kinh nghiệm, chuyên môn tại Việt Nam</div>
								<div className="vet-p">✓ Bác sĩ duy nhất tại Việt Nam 2 năm liên tiếp đạt thứ hạng Black Diamond</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
									✓ 1 trong 3 bác sĩ sử dụng hệ thống mắc cài tự động Damon thành công nhất Việt Nam
								</div>
								<div className="vet-p">
									✓ Dịch giả của những cuốn sách chỉnh nha nổi tiếng như 1001 bí kíp lâm sàng trong chỉnh nha (2015), Các ca lâm sàng trong chỉnh nha (2015), Cơ sinh học trong chỉnh nha (2016),…
								</div>
								<div className="vet-p">
									✓ Bác sĩ Đức đã có kinh nghiệm điều trị hơn 6500 ca chỉnh nha, được coi là một trong những bác sĩ có số lượng KH niềng răng lớn nhất Hà Nội.
								</div>
								<div className="vet-p">
									✓ Là người đầu tiên đưa phương pháp Niềng không nhổ răng F.A.C.E từ nước ngoài về ứng dụng tại Việt Nam, giúp hạn chế tối đa việc nhổ răng thậm chí không cần nhổ răng mà vẫn mang lại hiệu quả điều trị cao nhất.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="vet-part-wrapper" data-aos="fade-left">
				<div className="vet-part">
					<div className="title-services-vet">Vet. Minh</div>
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
								<div className="vet-p">✓ Bác sĩ Đức được hàng Invisalign đánh giá là bác sĩ TOP 1 tại Đông Nam Á và TOP 1 về kinh nghiệm, chuyên môn tại Việt Nam</div>
								<div className="vet-p">✓ Bác sĩ duy nhất tại Việt Nam 2 năm liên tiếp đạt thứ hạng Black Diamond</div>
							</div>
						</div>

						<div className="content-list-vet">
							<div className="text-vet">
								<div className="vet-p">
									✓ 1 trong 3 bác sĩ sử dụng hệ thống mắc cài tự động Damon thành công nhất Việt Nam
								</div>
								<div className="vet-p">
									✓ Dịch giả của những cuốn sách chỉnh nha nổi tiếng như 1001 bí kíp lâm sàng trong chỉnh nha (2015), Các ca lâm sàng trong chỉnh nha (2015), Cơ sinh học trong chỉnh nha (2016),…
								</div>
								<div className="vet-p">
									✓ Bác sĩ Đức đã có kinh nghiệm điều trị hơn 6500 ca chỉnh nha, được coi là một trong những bác sĩ có số lượng KH niềng răng lớn nhất Hà Nội.
								</div>
								<div className="vet-p">
									✓ Là người đầu tiên đưa phương pháp Niềng không nhổ răng F.A.C.E từ nước ngoài về ứng dụng tại Việt Nam, giúp hạn chế tối đa việc nhổ răng thậm chí không cần nhổ răng mà vẫn mang lại hiệu quả điều trị cao nhất.
								</div>
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
