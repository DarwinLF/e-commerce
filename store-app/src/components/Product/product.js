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

        // const GetImage = async() => {
        //     try {
        //         const response = await axios.get('https://localhost:7277/Product');
        //         const productsDTO = response.data;

        //         console.log(productsDTO);

        //         const processedProducts = await Promise.all(
        //             productsDTO.map(async (productDTO) => {
        //                 console.log(productDTO.name);
        //                 console.log(productDTO.price);
        //                 console.log(productDTO.quantity);
        //                 const imageUrl = await getImageUrl(productDTO.image);

        //                 return {
        //                     name: productDTO.name,
        //                     price: productDTO.price,
        //                     quantity: productDTO.quantity,
        //                     imageUrl
        //                 }
        //             })
        //         );

        //         setProducts(processedProducts);
        //     } catch(error) {
        //         console.error('Error fetching image list:', error);
        //     }
        // };

        // GetImage();
        
    }, []);

    // const getImageUrl = async (image) => {
    //     try {
    //         const response = await axios.get(image, {responseType: 'arraybuffer'});
    //         const blob = new Blob([response.data], {type: 'image/png'});
    //         return URL.createObjectURL(blob);
    //     }catch(error) {
    //         console.error('Error fetching image:', error.response);
    //         return null;
    //     }
    // };

    return (
        <div>
            {userRole === "Admin" ? 
                <button className="py-1 px-3 border rounded" onClick={() => navigate("/AddProduct")}>Add Product</button>
            : <></>}
            
            <h1>Hola mundo</h1>
            {/* <h1>{URL.createObjectURL(image)}</h1> */}

            <div>
                <h1>Product list</h1>
                {products && products.map((item) => (
                    <div>
                        <h3>{item.name}</h3>
                        {item.imageUrl && <img src={item.imageUrl} alt="not found" width={"200px"} height={"200px"}/>}
                    </div>
                ))}
            </div>
            
        </div>
    );
}