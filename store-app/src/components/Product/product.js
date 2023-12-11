import {useNavigate} from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Product() {
    const {userRole, profileUserName} = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7277/Product')
            .then(response => {
                const processedProducts = response.data.map(product => {
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
                        quantity: product.quantity,
                        imageUrl
                    };
                });

                setProducts(processedProducts);
            })
            .catch(error => {
                console.error(error.response);
            });
        
    }, []);

    const addToCart = (productName, totalQuantity, quantityToBuy) => {
        if(!quantityToBuy) {
            alert("Add a quantity to buy");
        }

        if(quantityToBuy > totalQuantity) {
            //tengo que verificar lo que hay en el carro del cliente actual para que la cantidad en el carro mas la que se desea ingresar actualmente no supere a la cantidad total
            alert("The quantity to buy is more that is in stock");
        }

        axios.post(`https://localhost:7277/Cart/Add`, {productName, quantity: quantityToBuy, userName: profileUserName})
            .then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                //add toast
                alert(error);
            });
    };

    return (
        <div>
            {userRole === "Admin" ? 
                <button className="py-1 px-3 border rounded" onClick={() => navigate("/AddProduct")}>Add Product</button>
            : <></>}
            <div>
                <h1>Product list</h1>
                {products && products.map((item, index) => (
                    <div className="flex flex-row" key={item.name}>
                        <h3>{item.name}</h3>
                        {item.imageUrl && <img src={item.imageUrl} alt="not found" width={"200px"} height={"200px"}/>}
                        <h3>{item.price}</h3>
                        <h3>{item.quantity}</h3>
                        {userRole === "Admin" ?
                            <button className="py-1 px-3 border rounded">Edit</button> 
                            : <div className="flex flex-col">
                                <input
                                    className='inputBox'
                                    type='number'
                                    placeholder='Quantity'
                                    value={quantities[index]}
                                    onChange={(e) => setQuantities(values => ({...values, [index]: e.target.value}))}
                                />
                                <button className="py-1 px-3 border rounded" onClick={() => addToCart(item.name, item.quantity, quantities[index])}>Add to cart</button>
                              </div>}
                    </div>
                ))}
            </div>
            
        </div>
    );
}