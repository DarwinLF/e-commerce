import { useAuth } from "../../provider/authProvider";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Cart() {
    const {profileUserName} = useAuth();
    const [cart, setCart] = useState({});

    useEffect(() => {
        getCart();
    }, []);

    const getCart = () => {
        axios.get('https://localhost:7277/Cart', {params: {userName: profileUserName}})
            .then(response => {
                //show data
                console.log(response.data);

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

    const removeItem = (index) => {
        axios.delete('https://localhost:7277/Cart/DeleteItem', {
            params: {userName: profileUserName, index}
        })
            .then(response => {
                console.log(response.data);
                getCart();
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <>
            {cart && 
                <div>
                    <h1>{profileUserName} - cart:</h1>
                    {cart.products && cart.products.map((item, index) => (
                        <div className="flex flex-row" key={item.name}>
                            <h3>{item.name}</h3>
                            {item.imageUrl && <img src={item.imageUrl} alt="not found" width={"200px"} height={"200px"}/>}
                            <h3>{item.price}</h3> -
                            <h3>{item.quantity}</h3> -
                            <h3>{item.price * item.quantity}</h3>
                            <button className="py-1 px-3 border rounded" onClick={() => removeItem(index)}>Remove</button>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}