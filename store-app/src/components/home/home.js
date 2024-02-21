import Banner from './banner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
    return (
        <>
         <Banner />
         <div className="d-flex flex-column bg-white py-4">
            <h5 className="text-center mb-3">Follow us on</h5>
            <div className="d-flex justify-content-center">
            <a href="!#" className="me-3">
                <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
            </a>
            <a href="!#">
                <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
            </a>
            <a href="!#" className="ms-3">
                <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
            </a>
            </div>
        </div>
        </>
    );
  };
  
  export default Home;