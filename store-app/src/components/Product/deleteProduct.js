import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';

export default function EditProduct() {
    const {productId} = useParams();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:7277/Product/Details', {
            params: {id: productId}
        })
            .then(async response => {
                const product = response.data;

                //convert image to file object
                const decodedData = atob(product.image);

                const arrayBuffer = new ArrayBuffer(decodedData.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for(let i = 0; i< decodedData.length; i++) {
                    uint8Array[i] = decodedData.charCodeAt(i);
                }
                const blob = new Blob([arrayBuffer], {type: 'image/png'});

                const image = new File([blob], product.fileName, {type: blob.type})
                //end of convert

                setName(product.name);
                setPrice(product.price);
                setStock(product.quantity);
                setImage(image);
            })
            .catch(error => {
                console.error(error.response);
            });
        
    }, [productId]);

    const deleteProduct =() => {
        axios.delete('https://localhost:7277/Product/Delete', {
            params: {id: productId}
        })
            .then((response) => {
                console.log(response.data);
                navigate("/Product")
            })
            .catch((error) => {
                //add toast
                alert(error.response.data);
            });
    }

    return(
        <div className="container mt-5 py-4 px-xl-5">
            <div className="card-wrapper">
                <div className="card-inner text-center">
                    <h4>Are you sure you want to delete this product?</h4>

                    <dl className="row">
                        <dt className="col-sm-4">Name</dt>
                        <dd className="col-sm-8 mb-3">{name}</dd>
                        <dt className="col-sm-4">Price</dt>
                        <dd className="col-sm-8 mb-3">{price}</dd>
                        <dt className="col-sm-4">Stock</dt>
                        <dd className="col-sm-8 mb-3">{stock}</dd>
                    </dl>
                    <div className="mb-3">
                        {image &&
                            <img
                                className="card-img-top bd-dark cover"
                                style={{ width: '50%', height: '50%' }}
                                alt=""
                                src={URL.createObjectURL(image)}   
                            />
                        }
                    </div>
                    <div className="row g-3 mb-4">
                        <div className="col d-grid">
                            <button className='btn btn-light' type="button" onClick={deleteProduct}>Yes</button>
                        </div>
                        <div className="col d-grid">
                            <Link className="btn btn-dark" to={"/Product"}>
                                No
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}