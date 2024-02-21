import { Link } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

export default function Product(props) {
    const {userRole} = useAuth();

    return (
        <div className="col">
            <div className="card shadow-sm">
                <Link to={"/Product/" + props.product.id}>
                    <img
                        className="card-img-top bd-dark cover"
                        height="200"
                        alt=""
                        src={props.product.imageUrl}   
                    />
                </Link>
                <div className="card-body">
                    <h5 className="card-title text-center text-dark text-truncate">
                        {props.product.name}
                    </h5>
                    <p className="card-text text-center text-muted mb-0">{props.product.price} USD</p>
                    {userRole === "Admin" ?
                        <div className="d-grid d-block">
                            <Link className="btn btn-outline-dark mt-3" to={"/DeleteProduct/" + props.product.id}>
                                Delete
                            </Link>
                        </div>
                    : <></>}
                </div>
            </div>
        </div>
    );
}