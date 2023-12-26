import { useState, useEffect } from "react";
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

export default function EditProduct() {
    const {productId} = useParams();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
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
                setQuantity(product.quantity);
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
        <div className='flex flex-col justify-center items-center gap-y-1'>
            <p>Are you sure you want to delete this product?</p>
            <p>
                Name: {name}
            </p>
            <p>
                Price: {price}
            </p>
            <p>
                Quantity: {quantity}
            </p>
            {image && <img src={URL.createObjectURL(image)} alt="" width={"250px"}/>}
            <button className='button border rounded px-1 py-1' type="button" onClick={deleteProduct}>Yes</button>
            <button className='button border rounded px-1 py-1' type="button" onClick={() => navigate("/Product")}>No</button>
        </div>
    );
}