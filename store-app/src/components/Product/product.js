import {useNavigate} from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Product() {
    const {userRole} = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

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

    return (
        <div>
            {userRole === "Admin" ? 
                <button className="py-1 px-3 border rounded" onClick={() => navigate("/AddProduct")}>Add Product</button>
            : <></>}
            <div>
                <h1>Product list</h1>
                {products && products.map((item) => (
                    <div className="flex flex-row">
                        <h3>{item.name}</h3>
                        {item.imageUrl && <img src={item.imageUrl} alt="not found" width={"200px"} height={"200px"}/>}
                    </div>
                ))}
            </div>
            
        </div>
    );
}