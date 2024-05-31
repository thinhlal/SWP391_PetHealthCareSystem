//css
import './VeterinarianInfo.css';
//images
import logo_button from '../../assets/images/img_VeterinarianInfo/logo_button.png';
import logo_Ver from '../../assets/images/img_VeterinarianInfo/logo_Ver.png';
import ver1 from '../../assets/images/img_VeterinarianInfo/ver1.jpg';
import ver2 from '../../assets/images/img_VeterinarianInfo/ver2.jpg';
import ver3 from '../../assets/images/img_VeterinarianInfo/ver3.jpg';
import ver4 from '../../assets/images/img_VeterinarianInfo/ver4.jpg';
import ver5 from '../../assets/images/img_VeterinarianInfo/ver5.jpg';
import ver6 from '../../assets/images/img_VeterinarianInfo/ver6.jpg';
//component
import Header from '../../components/User/Header/Header.js';
import Footer from '../../components/User/Footer/Footer.js';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
function VeterinarianInfo() {

    <script>
        
    </script>
    return (

        <div>
            <div className="menu">			
			 <nav className="nav-Ver">
				<div className="gmail_Ver">
					pethealthcare@gmail.com
				</div>
			</nav>
            <Header></Header>			
		</div>				
		<div> 		
			<div>
				<h1 className="logo_Ver"><img src={logo_Ver} alt=""/></h1>
				<p className="tittle_Ver"> Team of Veterinarian</p>
			</div>
		
		</div>			
	<div>	
		<div className="Ver" id="images_Ver">
		
			<div className="col-md-3 each_Ver" id="ver-1">
				<img src={ver1} alt="veterinarian-1" />
				<p className="veter">Vet. Minh</p>
				<p className="email-ver">minh@gmail.com</p>
				<button className="button-ver" data-index="0">
					<div className="text-ver">View Information</div>
					<img className="img-ver" src={logo_button}  alt=""/>
				  </button>
			</div>
			<div className="col-md-3 each_Ver" id="ver-2">
				<img src={ver2} alt="veterinarian-2"/>
				<p className="veter">Vet. Dat</p>
				<p className="email-ver">dat@gmail.com</p>
				<button className="button-ver" data-index="1">
					<div className="text-ver">View Information</div>
					<img className="img-ver" src={logo_button}  alt=""/>
				  </button>
			</div>			
			<div className="col-md-3 each_Ver" id="ver-3">
				<img src={ver3} alt="veterinarian-3" />
				<p className="veter">Vet. Duong</p>
				<p className="email-ver">duong@gmail.com</p>
				<button className="button-ver" data-index="2">
					<div className="text-ver">View Information</div>
					<img className="img-ver" src={logo_button}  alt=""/>
				  </button>
			</div>					
		</div>
		<div className="Ver" id="images_Ver">
		
			<div className="col-md-3 each_Ver" id="ver-4">
				<img src={ver4} alt="veterinarian-4" />
				<p className="veter">Vet. Thinh</p>
				<p className="email-ver">thinh@gmail.com</p>
				<button className="button-ver" data-index="3">
					<div className="text-ver">View Information</div>
					<img className="img-ver" src={logo_button}  alt=""/>
				  </button>
			</div>
			<div className="col-md-3 each_Ver" id="ver-5">
				<img src={ver5} alt="veterinarian-5"/>
				<p className="veter">Vet. Phat</p>
				<p className="email-ver">phat@gmail.com</p>
				<button className="button-ver"  data-index="4">
					<div className="text-ver">View Information</div>
					<img className="img-ver" src={logo_button}  alt=""/>
				  </button>
			</div>			
			<div className="col-md-3 each_Ver" id="ver-6">
				<img src={ver6} alt="veterinarian-6" />
				<p className="veter">Vet. Tung</p>
				<p className="email-ver">tung@gmail.com</p>
				<button className="button-ver" data-index="5">
					<div className="text-ver">View Information</div>
					<img className="img-ver" src={logo_button}  alt=""/>
				  </button>
			</div>								
		</div>					
	</div>
        <Footer></Footer>
        </div>




    )




}

export default VeterinarianInfo;
