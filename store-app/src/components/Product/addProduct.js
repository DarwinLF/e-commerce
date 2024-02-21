import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function AddProduct() {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', stock);
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
        <div className="container mt-5 py-4 px-xl-5">
            <div className="card-wrapper">
                <div className="card-inner">
                <form onSubmit={addProduct}>
                    <h3>Add New Product</h3>

                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Price</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                        {image && <img src={URL.createObjectURL(image)} alt="" style={{ width: '50%', height: '50%' }}/>}
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}