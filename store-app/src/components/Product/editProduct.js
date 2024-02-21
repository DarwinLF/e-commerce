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

    const editProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('image', image, image.name);

        axios.put('https://localhost:7277/Product/edit', formData, {
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
        <form onSubmit={editProduct}>
            <div className='flex flex-col justify-center items-center gap-y-1'>
                <input
                    className='inputBox'
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className='inputBox'
                    type='number'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    className='inputBox'
                    type='number'
                    placeholder='Quantity'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <div>
                    {image && 
                    <div>
                        <label htmlFor="filePicker" style={{ background:"grey", padding:"5px 10px" }}>
                            {image.name}
                        </label>
                        <input id="filePicker" style={{visibility:"hidden"}} type={"file"} onChange={(e) => setImage(e.target.files[0])}/>
                        <img src={URL.createObjectURL(image)} alt="" width={"250px"}/>
                    </div>}
                </div>
                <button className='button border rounded px-1 py-1' type="submit">Save</button>
            </div>
            
        </form>
    );
}