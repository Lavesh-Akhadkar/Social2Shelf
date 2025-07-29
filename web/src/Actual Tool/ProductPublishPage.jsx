import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "flowbite-react";

const ProductsPublishPage = () => {
    const [productData, setProductData] = useState(null);
    const [dynamicAttributes, setDynamicAttributes] = useState({});
    const [newDynamicFields, setNewDynamicFields] = useState([]);
    const [newImage, setNewImage] = useState(null);
    const [price, setPrice] = useState("");
    const [amountInStock, setAmountInStock] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [boxIncludes, setBoxIncludes] = useState("");

    const [loading, setLoading] = useState(false);



    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { prodData } = location.state;

    const [showErrorScreen, setShowErrorScreen] = useState(false);

    // Fetch the product data using useEffect
    useEffect(() => {
        if (prodData) {
            setProductData(prodData.attributes);
            setDynamicAttributes(prodData.attributes.dynamic_attributes || {});
        }
    }, [prodData]);

    // Handle input changes for fields
    const handleInputChange = (field, value) => {
        if (field === "product_name" && value.length > 200) return; // Limit product name to 200 characters
        setProductData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    // Handle input changes for dynamic attributes
    const handleDynamicAttributeChange = (key, value) => {
        setDynamicAttributes((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Handle adding new dynamic fields
    const handleAddDynamicField = () => {
        setNewDynamicFields((prev) => [...prev, { key: "", value: "" }]);
    };

    // Handle changes in new dynamic fields
    const handleNewDynamicFieldChange = (index, field, value) => {
        setNewDynamicFields((prev) => {
            const updatedFields = [...prev];
            updatedFields[index][field] = value;
            return updatedFields;
        });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };

    const formatProductName = (name) => {
        return name
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    // Publish product data
    const handlePublish = async (event) => {
        event.preventDefault();



        // Combine dynamic attributes with new fields
        const combinedDynamicAttributes = {
            ...dynamicAttributes,
            ...newDynamicFields.reduce((acc, field) => {
                if (field.key.trim() && field.value.trim()) {
                    acc[field.key] = field.value;
                }
                return acc;
            }, {}),
        };

        // Convert image to Base64 if a new image is uploaded
        let base64Image = null;
        if (newImage) {
            const reader = new FileReader();
            base64Image = await new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(newImage);
            });
        }

        // Create payload
        const payload = {
            product_name: formatProductName(productData.product_name),
            product_description: productData.product_description,
            category: productData.category,
            brand: productData.brand,
            colour: productData.color,
            dynamic_attributes: combinedDynamicAttributes,
            price,
            amount_in_stock: amountInStock || "",
            dimensions: dimensions || "",
            box_includes: boxIncludes || "",
            image: base64Image || prodData.image[0],
        };

        try {
            setLoading(true); // Start the loader
            const response = await axios.post(
                "https://social2shelf-dev.onrender.com/api/products",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                    },
                }
            );


            if (response) {
                console.log(response.data);

                setLoading(false); // Stop the loader
                setId(response.data);
                setOpenModal(true);
            }
        } catch (error) {

            console.error("Error submitting product:", error);
            setLoading(false); // Stop the loader
            setShowErrorScreen(true);

        }
    };


    if (!productData) {
        return <div className="text-center text-nblue">Loading...</div>;
    }

    const handleDeleteDynamicField = (keyOrIndex, isExisting) => {
        if (isExisting) {
            // Delete from existing dynamic attributes
            setDynamicAttributes((prev) => {
                const updated = { ...prev };
                delete updated[keyOrIndex];
                return updated;
            });
        } else {
            // Delete from new dynamic fields
            setNewDynamicFields((prev) =>
                prev.filter((_, index) => index !== keyOrIndex)
            );
        }
    };


    return (
        <div className="p-6 bg-[#363637] text-white min-h-screen w-full overflow-auto">
            {/* error screen */}
            {
                showErrorScreen &&
                <div className="fixed inset-0 flex flex-col justify-center items-center space-y-6 z-50 bg-gray-900">
                <img src="../error404.png" className="w-64" />
                    <h1 className="text-3xl text-white font-bold"> Invalid Product Details !</h1>
                    <button 
                    className="px-6 py-2 rounded-xl border-2 border-[#7E57C2] text-white text-lg font-semibold hover:bg-black"
                     onClick={() => { setShowErrorScreen(false) }}>Back to page</button>
                </div>
            }

            <h1 className="text-4xl font-bold mb-8 text-[#7E57C2] text-center">
                Edit and Publish Product
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Product Details */}
                <div>
                    <div className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={productData.product_name}
                                onChange={(e) => handleInputChange("product_name", e.target.value)}
                                className="w-full p-3 border border-gray-700 rounded-md bg-[#212121] text-white"
                            />
                        </div>

                        {/* Product Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Product Description
                            </label>
                            <textarea
                                value={productData.product_description}
                                onChange={(e) =>
                                    handleInputChange("product_description", e.target.value)
                                }
                                className="w-full p-3 border border-gray-700 rounded-md bg-[#212121] text-white h-28"
                            ></textarea>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                value={productData.category}
                                onChange={(e) => handleInputChange("category", e.target.value)}
                                className="w-full p-3 border border-gray-700 rounded-md bg-[#212121] text-white"
                            />
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Brand
                            </label>
                            <input
                                type="text"
                                value={productData.brand}
                                onChange={(e) => handleInputChange("brand", e.target.value)}
                                className="w-full p-3 border border-gray-700 rounded-md bg-[#212121] text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Product Image and Attributes */}
                <div>
                    {/* Product Image */}
                    <div className="mb-6 text-center">
                        <label className="block text-sm font-semibold text-gray-300 mb-4">
                            Product Image
                        </label>
                        <div className="relative">
                            <img
                                src={newImage ? URL.createObjectURL(newImage) : prodData.image[0]}
                                alt="Product"
                                className="w-64 h-64 object-cover rounded-lg shadow-lg mx-auto mb-4 hover:scale-105 transition-transform"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-300"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stock, Dimensions, Box Includes, and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {/* Amount in Stock */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Amount in Stock
                    </label>
                    <input
                        type="text"
                        value={amountInStock}
                        onChange={(e) => setAmountInStock(e.target.value)}
                        className="w-full p-3 border border-gray-700 rounded-md bg-[#212121] text-white"
                    />
                </div>

                {/* Dimensions */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Dimensions
                    </label>
                    <input
                        type="text"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        className="w-full p-3 border border-gray-700 rounded-md bg-[#212121] text-white"
                    />
                </div>

                {/* Box Includes */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Box Includes
                    </label>
                    <input
                        type="text"
                        value={boxIncludes}
                        onChange={(e) => setBoxIncludes(e.target.value)}
                        className="w-full p-3 border border-gray-700 rounded-md bg-[#212121] text-white"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 border border-gray-700 rounded-md bg-[#212121] text-white"
                    />
                </div>
            </div>

            {/* Dynamic Attributes */}
            <div className="mt-8">
                <h2 className="text-lg font-bold text-[#7E57C2] mb-4">
                    Other Specifications
                </h2>

                {Object.entries(dynamicAttributes).map(([key, value]) => (
                    <div key={key} className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            value={key}
                            readOnly
                            className="w-1/3 p-2 border border-gray-700 rounded-md bg-[#212121] text-white"
                        />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleDynamicAttributeChange(key, e.target.value)}
                            className="w-1/3 p-2 border border-gray-700 rounded-md bg-[#212121] text-white"
                        />
                        <button
                            onClick={() => handleDeleteDynamicField(key, true)}
                            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                {newDynamicFields.map((field, index) => (
                    <div key={index} className="flex space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="New Attribute Key"
                            value={field.key}
                            onChange={(e) =>
                                handleNewDynamicFieldChange(index, "key", e.target.value)
                            }
                            className="w-1/3 p-2 border border-gray-700 rounded-md bg-[#212121] text-white"
                        />
                        <input
                            type="text"
                            placeholder="New Attribute Value"
                            value={field.value}
                            onChange={(e) =>
                                handleNewDynamicFieldChange(index, "value", e.target.value)
                            }
                            className="w-1/3 p-2 border border-gray-700 rounded-md bg-[#212121] text-white"
                        />
                        <button
                            onClick={() => handleDeleteDynamicField(index, false)}
                            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))}



                <button
                    onClick={handleAddDynamicField}
                    className="bg-[#7E57C2] text-white font-semibold py-2 px-4 rounded-md mt-4 hover:bg-[#6A4FB7]"
                >
                    Add Dynamic Field
                </button>
            </div>

            {/* Publish Button */}
            <div className="text-center mt-10">
                <button
                    onClick={handlePublish}
                    className="bg-[#7E57C2] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#6A4FB7]"
                >
                    Publish Product
                </button>
            </div>

            <Modal
                className="fixed inset-0 z-50  flex items-center  justify-center bg-black bg-opacity-60"
                dismissible
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
            >
                <div className="bg-[#212121] rounded-lg shadow-lg p-8 text-center w-full max-w-xl ">
                    {/* GIF Section */}
                    <div className="mb-6">
                        <video
                            src="../success.mp4" // Replace with the actual path or URL of the video file
                            alt="Success Animation"
                            className="w-full max-w-md mx-auto"
                            autoPlay
                            loop
                            muted
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>


                    {/* Success Message */}
                    <h2 className="text-2xl md:text-3xl font-bold text-[#7E57C2] mb-4">
                        The Product Was Successfully Listed
                    </h2>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
                        <button
                            onClick={() => navigate('/dashboard/home')}
                            className="bg-[#7E57C2] hover:bg-[#6A4FB7] text-white font-semibold py-2 px-6 rounded-lg w-full md:w-auto"
                        >
                            Go to Dashboard
                        </button>
                        <button
                            onClick={() => navigate(`/amazon/productDetails/${id}`)}
                            className="bg-[#7E57C2] hover:bg-[#6A4FB7] text-white font-semibold py-2 px-6 rounded-lg w-full md:w-auto"
                        >
                            View Product Details
                        </button>
                    </div>
                </div>
            </Modal>

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src="../shopping.gif" // Replace with actual path or URL
                            alt="Loading"
                            className="w-32 h-32"
                        />
                        <p className="text-white text-3xl font-bold bg-black">Publishing Product...</p>
                    </div>
                </div>
            )}




        </div>


    );


};

export default ProductsPublishPage;
