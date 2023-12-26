import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function AddProduct() {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('image', image, image.name);

        axios.post('https://localhost:7277/Product/Create', formData)
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
        <form onSubmit={addProduct}>
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
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                    {image && <img src={URL.createObjectURL(image)} alt="" width={"250px"}/>}
                </div>
                <button className='button border rounded px-1 py-1' type="submit">Add</button>
            </div>
            
        </form>
    );
}