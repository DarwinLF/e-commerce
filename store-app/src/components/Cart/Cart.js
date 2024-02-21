import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../provider/authProvider";
import axios from 'axios';

export default function Cart(props) {
    const {profileUserName} = useAuth();
    const [cart, setCart] = useState({});

    const getCart = () => {
        axios.get('https://localhost:7277/Cart', {params: {userName: profileUserName}})
            .then(response => {
                //show data
                const processedProducts = response.data.products.map(product => {
                    //convert the image base64string to imageUrl
                    const decodedData = atob(product.image);

                    const arrayBuffer = new ArrayBuffer(decodedData.length);
                    const uint8Array = new Uint8Array(arrayBuffer);
                    for(let i = 0; i< decodedData.length; i++) {
                        uint8Array[i] = decodedData.charCodeAt(i);
                    }
                    const blob = new Blob([arrayBuffer], {type: 'image/png'});

                    const imageUrl = URL.createObjectURL(blob);

                    return {
                        name: product.name,
                        price: product.price,
                        quantity: product.productQuantity,
                        imageUrl
                    };
                });

                response.data.products = processedProducts;
                setCart(response.data);
                
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getCart();
    }, []);

    const removeProduct = (index) => {
        axios.delete('https://localhost:7277/Cart/DeleteItem', {
            params: {userName: profileUserName, index}
        })
            .then(response => {
                console.log(response.data);
                getCart();
                props.getCartAmount();
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="container mt-5 py-4 px-xl-5">
            {cart && 
                <section className="vh-100">
                    <div className="container h-100">
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="col">
                                <p>
                                    <span className="h2">Shopping Cart </span>
                                    {cart.products && (
                                        <span className="h4">
                                            ({cart.products.length <= 1 ?
                                                `${cart.products.length} item` :
                                                `${cart.products.length} items`
                                            } in the cart)
                                        </span>
                                    )}
                                </p>
                                
                                <div className="card mb-4">
                                    <div className="card-body p-4">
                                        {cart.products && cart.products.map((product, index) => (
                                            <div className="row align-items-center" key={index}>
                                                <div className="col-md-2">
                                                    <img src={product.imageUrl} alt="not found" width={"120px"}/>
                                                </div>
                                                <div className="col-md-2 d-flex justify-content-center">
                                                    <div>
                                                        <p className="small text-muted mb-4 pb-2">Name</p>
                                                        <p className="lead fw-normal mb-0">{product.name}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 d-flex justify-content-center">
                                                    <div>
                                                        <p className="small text-muted mb-4 pb-2">Quantity</p>
                                                        <p className="lead fw-normal mb-0">{product.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 d-flex justify-content-center">
                                                    <div>
                                                        <p className="small text-muted mb-4 pb-2">Price</p>
                                                        <p className="lead fw-normal mb-0">${product.price}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 d-flex justify-content-center">
                                                    <div>
                                                        <p className="small text-muted mb-4 pb-2">Total</p>
                                                        <p className="lead fw-normal mb-0">${product.quantity * product.price}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 d-flex justify-content-center">
                                                    <Button variant="primary" onClick={() => removeProduct(index)}>
                                                        <FontAwesomeIcon icon={["fas", "trash"]} />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-5">
                                <div className="card-body p-4">
                                    <div className="float-end">
                                        <p className="mb-0 me-5 d-flex align-items-center">
                                            <span className="small text-muted me-2">Order total:</span>
                                            <span className="lead fw-normal">${cart.totalPrice}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </div>
    );
}