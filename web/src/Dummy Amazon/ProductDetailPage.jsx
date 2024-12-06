import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";

const ProductDetailsPage = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const [productData, setProductData] = useState();
    
    const navigate = useNavigate();

    // Fetch product details using the product ID
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `https://amazon-hackathon-backend-1.onrender.com/api/products/${id}`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                            "Content-Type": "application/json",
                        },
                    }
                );
                setProductData(response.data);
            } catch (error) {
                console.error("Error fetching product details", error);
            }
        };

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    if (!productData) {
        return <div className="text-center text-[#7E57C2] text-xl font-semibold mt-16">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="p-6 bg-[#212121] text-[#F7F7F7] min-h-screen">
                {/* Breadcrumb */}
                <h1 className="text-gray-400 font-semibold mb-8">
                    Home / {productData.category} /{" "}
                    <span className="text-[#7E57C2]">{productData.product_name}</span>
                </h1>

                <div className="container mx-auto flex flex-col lg:flex-row gap-12 items-center lg:items-start">
                    {/* Left: Product Image */}
                    <div className="lg:w-1/2">
                        <img
                            src={productData.image}
                            alt={productData.product_name}
                            className="w-full max-h-[400px] rounded-lg shadow-lg border border-gray-700 object-cover"
                        />
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:w-1/2 space-y-8">
                        <h1 className="text-4xl font-bold">{productData.product_name}</h1>
                        <p className="text-gray-400 text-lg">{productData.product_description}</p>
                        <p className="text-2xl text-[#7E57C2] font-semibold">
                            Rs. {productData.price || "N/A"}
                        </p>

                        {/* Details Section */}
                        <div>
                            <p className="font-bold text-[#7E57C2] mb-2">Details:</p>
                            <ul className="grid grid-cols-2 gap-4 text-gray-300">
                                <li className="font-semibold"> 
                                    Category: <span>{productData.category}</span>
                                </li>
                                <li className="font-semibold">
                                    Brand: <span className="font-normal">{productData.brand}</span>
                                </li>
                                <li className="font-semibold">
                                    Colour: <span className="font-normal">{productData.colour}</span>
                                </li>
                                <li className="font-semibold">
                                    Dimensions:{" "}
                                    <span className="font-normal" >{productData.dimensions}</span>
                                </li>
                                <li className="font-semibold">
                                    Box Includes:{" "}
                                    <span className="font-normal" >{productData.box_includes}</span>
                                </li>
                                <li className="font-semibold">
                                    Amount in Stock:{" "}
                                    <span className="font-normal" >{productData.amount_in_stock}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Specifications Section */}
                        <div>
                            <p className="font-bold text-[#7E57C2] mb-2">Specifications:</p>
                            <ul className="grid grid-cols-2 gap-4 text-gray-300">
                                {Object.entries(productData.dynamic_attributes).map(([key, value]) => (
                                    <li className="font-semibold" key={key}>
                                        {key}: <span className="font-normal">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() =>
                                alert("Product Added to cart")
                            }
                            className="bg-[#7E57C2] text-[#212121] font-semibold py-3 px-8 rounded-lg hover:bg-[#9A74D0] transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() =>navigate('/dashboard/home')
                            }
                            className="bg-[#7E57C2] mx-4 text-[#212121] font-semibold py-3 px-8 rounded-lg hover:bg-[#9A74D0] transition"
                        >
                            Go To Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailsPage;
