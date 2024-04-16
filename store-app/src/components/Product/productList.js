import {useNavigate} from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Product from "./product";
import ProductH from "./productH";

function FilterMenuLeft(props) {
    return(
        <ul className="list-group list-group-flush rounded">
            <li className="list-group-item">
                <h5 className="mt-1 mb-2">Price Range</h5>
                <div className="d-grid d-block mb-3">
                    <div className="form-floating mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Min"
                            value={props.minValue}
                            onChange={(e) => props.setMinValue(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Min Price</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max"
                            value={props.maxValue}
                            onChange={(e) => props.setMaxValue(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Max Price</label>
                    </div>
                    <button className="btn btn-dark" onClick={() => props.filterProducts()}>Apply</button>
                </div>
            </li>
        </ul>
    );
}

export default function ProductList() {
    const {userRole} = useAuth();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [viewType, setViewType] = useState({ grid: true });
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    function changeViewType() {
        setViewType({
        grid: !viewType.grid,
        });
    }

    function filterProducts() {
        let filterProducts = products;

        if (maxValue >= minValue || !maxValue || !minValue) {
            if (minValue >= 0) {
                filterProducts = filterProducts.filter(product => product.price >= minValue)
            }
    
            if (maxValue > 0) {
                filterProducts = filterProducts.filter(product => product.price <= maxValue)
            }
        }

        if(search) {
            filterProducts = filterProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }
        
        setFilteredProducts(filterProducts);
    }

    function handleSearchChange(event) {
        setSearch(event.target.value);
    }

    function handleEnterPress(event) {
        if(event.key === 'Enter') {
            filterProducts();
        }
    }

    function handleSearchClick() {
        filterProducts();
    }

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
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                        imageUrl
                    };
                });

                setProducts(processedProducts);
                setFilteredProducts(processedProducts);
            })
            .catch(error => {
                console.error(error.response);
            });
        
    }, []);

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <div className="row mb-4 mt-lg-3">
                <div className="d-none d-lg-block col-lg-3">
                    <div className="border rounded shadow-sm">
                        <FilterMenuLeft filterProducts={filterProducts} minValue={minValue} setMinValue={setMinValue} maxValue={maxValue} setMaxValue={setMaxValue}/>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="d-flex flex-column h-100">
                        <div className="row mb-3">
                            <div className="col-lg-3 d-none d-lg-block">
                                {userRole === "Admin" ? 
                                    <button className="btn btn-primary py-1 px-3 border rounded" onClick={() => navigate("/AddProduct")}>Add Product</button>
                                : <></>}
                            </div>
                            <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search products..."
                                        aria-label="search input"
                                        value={search}
                                        onChange={handleSearchChange}
                                        onKeyDown={handleEnterPress}
                                    />
                                    <button className="btn btn-outline-dark" onClick={handleSearchClick}>
                                        <FontAwesomeIcon icon={["fas", "search"]} />
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                                    onClick={changeViewType}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                                        />
                                </button>
                            </div>
                        </div>
                        <div
                            className={
                                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                            }
                            >
                                {filteredProducts && filteredProducts.map((item, index) => {
                                    if (viewType.grid) {
                                        return (
                                            <Product key={index} product={item} />
                                        );}
                                        return (
                                            <ProductH key={index} product={item} />
                                        );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}