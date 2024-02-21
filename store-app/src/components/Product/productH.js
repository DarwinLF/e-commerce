import { Link } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";

export default function ProductH(props) {
    const {userRole} = useAuth();

    return (
        <div className="col">
            <div className="card shadow-sm">
                <div className="row g-0">
                    <div className="col-4">
                        <Link to={"/Product/" + props.product.id}>
                            <img
                                className="card-img-top bd-dark cover"
                                height="200"
                                alt=""
                                src={props.product.imageUrl}   
                            />
                        </Link>
                    </div>
                    <div className="col-8">
                        <div className="card-body h-100">
                            <div className="d-flex flex-column h-100">
                                <h5 className="card-title text-dark text-truncate mb-1">
                                    {props.product.name}
                                </h5>
                                <span className="card-text text-muted mb-2 flex-shrink-0">
                                    {props.product.price} USD
                                </span>
                                {userRole === "Admin" ?
                                    <div className="mt-auto d-flex">
                                        <Link className="btn btn-outline-dark ms-auto" to={"/DeleteProduct/" + props.product.id}>
                                            Delete
                                        </Link>
                                    </div>
                                : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}