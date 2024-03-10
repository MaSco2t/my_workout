import { Link } from "react-router-dom";
import "../styles/notFound.css"

function NotFound(){
    return(
        <div className="notFound">
            <h1>404 Error: Page not found</h1>
            <Link className="notFoundBack" to="/"><button>Travel to The Homepage</button></Link>
        </div>
    )
};
export default NotFound;