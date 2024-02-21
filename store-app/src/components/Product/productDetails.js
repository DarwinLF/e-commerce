import { useAuth } from "../../provider/authProvider";
import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function ProductDetails(props) {
    const {profileUserName} = useAuth();
    const {productID} = useParams();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [image, setImage] = useState();
    const [quantity, setQuantity] = useState(0);

    const addToCart = () => {
        if(quantity <= 0) {
            alert("Add a quantity to buy");
            return;
        }

        if(quantity > stock) {
            //tengo que verificar lo que hay en el carro del cliente actual para que la cantidad en el carro mas la que se desea ingresar actualmente no supere a la cantidad total
            alert("The quantity to buy is more that is in stock");
        }

        axios.post(`https://localhost:7277/Cart/Add`, {ProductName: name, quantity, userName: profileUserName})
            .then((response) => {
                console.log(response.status);
                alert("Success");
                props.getCartAmount();
            })
            .catch((error) => {
                //add toast
                if(error.response.status === 401) {
                    alert("Need to Login");
                }
                else if(error.response.status === 403) {
                    alert("Need to be a user");
                }
            });
    };

    useEffect(() => {
        axios.get('https://localhost:7277/Product/Details', {
            params: {id: productID}
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

                const imageURl = new File([blob], product.fileName, {type: blob.type})
                //end of convert

                setName(product.name);
                setPrice(product.price);
                setStock(product.quantity);
                setImage(imageURl);
            })
            .catch(error => {
                console.error(error.response);
            });
        
    }, [productID]);

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <div className="row mb-4">
                {/* <div className="col-log-1"></div> */}
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-12 mb-4">
                                <img
                                    className="border rounded ratio ratio-1x1"
                                    alt=""
                                    src={image && URL.createObjectURL(image)}    
                                />
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="d-flex flex-column h-100">
                        <h2 className="mb-1">{name}</h2>
                        <h4 className="text-muted mb-1">Stock: {stock}</h4>
                        <h4 className="text-muted mb-4">{price} USD</h4>

                        <div className="row g-3 mb-1">
                            <input
                                className='inputBox'
                                type='number'
                                placeholder='Quantity'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="row g-3 mb-4">
                            <button className="btn btn-outline-dark py-2 w-100" onClick={addToCart}>
                                Add to cart
                            </button>
                        </div>

                        <h4 className="mb-0">Details</h4>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-4">Code</dt>
                            <dd className="col-sm-8 mb-3">{productID}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}