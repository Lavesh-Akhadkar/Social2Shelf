import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProductTable = ({ data }) => {
    const [filters, setFilters] = useState({
        search: "",
        category: "All Categories",
    });
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [allData, setAllData] = useState(data);

    const [prodLink, setProdLink] = useState("");
    const [loading, setLoading] = useState(false);  // Loader state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const [showErrorScreen, setShowErrorScreen] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');


    const navigate = useNavigate();

    const categories = ["All Categories", ...new Set(data.map((product) => product.category))];

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const handleCheckboxChange = (id) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((productId) => productId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedProducts(allData.map((product) => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleDeleteSelected = () => {
        setAllData((prevData) =>
            prevData.filter((product) => !selectedProducts.includes(product.id))
        );
        setSelectedProducts([]);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            console.log(productId);
            const response = await axios.delete(
                `https://d644-2405-201-20-b11e-a08d-24f7-5db0-803f.ngrok-free.app/api/products/${productId}`, {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                }
            });
            setAllData(response.data); // Update allData with the response data
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleAddProduct = async () => {
        setLoading(true);  // Start the loader
        setIsModalOpen(false);  // Close the modal

        try {
            const response = await axios.post(
                'https://d644-2405-201-20-b11e-a08d-24f7-5db0-803f.ngrok-free.app/social/analyze-instagram-post/',
                { url: prodLink },
                {
                    headers: {
                        "ngrok-skip-browser-warning": "69420", // Bypass ngrok warning
                    },
                }
            );
            // If successful, navigate to the publish page with the response data
            navigate('/dashboard/publish', { state: { prodData: response.data } });
        } catch (error) {
            // Check if the error response contains the specific validation failure
            if (error.response && error.response.status === 400 && error.response.data.detail === "Product validation failed. Reason: Inappropriate Content") {
                setShowErrorScreen(true);
                setErrorMsg(' Product Validation Failed Due To Inappropriate Content ❌❌');


            } else {
                console.error('Error fetching product data:', error);
                setShowErrorScreen(true);
                setErrorMsg('Error fetching product data');
            }
        } finally {
            setLoading(false); // Stop the loader
        }
    };


    const applyFilters = () => {
        let filteredData = allData;

        if (filters.search) {
            filteredData = filteredData.filter((product) =>
                product.product_name.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.category !== "All Categories") {
            filteredData = filteredData.filter(
                (product) => product.category === filters.category
            );
        }

        if (sortConfig.key) {
            filteredData = [...filteredData].sort((a, b) => {
                if (sortConfig.key === "price" || sortConfig.key === "amount_in_stock") {
                    return sortConfig.direction === "asc"
                        ? a[sortConfig.key] - b[sortConfig.key]
                        : b[sortConfig.key] - a[sortConfig.key];
                } else {
                    const aValue = a[sortConfig.key].toString().toLowerCase();
                    const bValue = b[sortConfig.key].toString().toLowerCase();
                    return sortConfig.direction === "asc"
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }
            });
        }

        return filteredData;
    };

    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
        }));
    };

    const filteredData = applyFilters();

    return (
        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-md">
            {/* error screen */}
            {
                showErrorScreen &&
                <div className="fixed inset-0 flex flex-col justify-center items-center space-y-6 z-50 bg-gray-900">
                    <img src="../error404.png" className="w-64" />
                    <h1 className="text-3xl text-white font-bold"> {errorMsg} </h1>
                    <button
                        className="px-6 py-2 rounded-xl border-2 border-[#7E57C2] text-white text-lg font-semibold hover:bg-black"
                        onClick={() => { setShowErrorScreen(false) }}>Back to page</button>
                </div>
            }

            <h1 className="p-4 text-white font-semibold text-3xl">My Products</h1>
            <div className="max-w-5xl mx-auto flex flex-wrap gap-4 items-center bg-gradient-to-r from-[#212121] to-[#363636] p-4 shadow-lg rounded-md">
                <button
                    onClick={() => setIsModalOpen(true)}  // Open the modal
                    className="bg-[#7E57C2] text-white py-2 px-4 rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-[#5d45a1]"
                >Add Products</button>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="p-2 flex-grow bg-[#2a2a2a] text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="p-2 bg-[#2a2a2a] text-white rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <label className="flex items-center text-white">
                    <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredData.length && filteredData.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 mr-2 text-blue-500 rounded focus:ring-blue-400"
                    />
                    Select All
                </label>
                {selectedProducts.length > 0 && (
                    <button
                        onClick={handleDeleteSelected}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow"
                    >
                        Delete Selected
                    </button>
                )}
            </div>
            <div className="overflow-auto mt-6 rounded-lg shadow-lg">
                <table className="w-full text-center bg-[#212121] text-white rounded-lg">
                    <thead className="bg-gradient-to-r from-[#2a2a2a] to-[#363636] sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3">Select</th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("id")}>
                                Sr. No {sortConfig.key === "id" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("product_name")}>
                                Product Name {sortConfig.key === "product_name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("category")}>
                                Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("amount_in_stock")}>
                                Quantity {sortConfig.key === "amount_in_stock" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("price")}>
                                Price {sortConfig.key === "price" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((product, index) => (
                            <tr
                                key={product.id}
                                className={`${index % 2 === 0 ? "bg-[#2a2a2a]" : "bg-[#1f1f1f]"
                                    } hover:bg-gray-800 transition-all`}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleCheckboxChange(product.id)}
                                        className="w-4 h-4 rounded focus:ring-blue-400"
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.product_name}
                                        className="w-16 h-16 p-1 rounded-md object-cover mx-auto"
                                    />
                                </td>
                                <td>
                                    <Link to={`/amazon/productDetails/${product.id}`} className="text-white text-lg hover:underline">
                                        {product.product_name}
                                    </Link>
                                </td>
                                <td>{product.category}</td>
                                <td>{product.amount_in_stock}</td>
                                <td>Rs. {product.price}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src="../shopping.gif"
                            alt="Loading"
                            className="w-32 h-32"
                        />
                        <p className="text-white text-2xl sm:text-3xl font-bold bg-black">
                            Fetching Product Details...
                        </p>
                    </div>
                </div>
            )}

            {/* Modal for Adding Product */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-[#212121] p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-[#7E57C2] text-xl font-semibold text-center mb-4">Add Product</h2>
                        <input
                            type="text"
                            value={prodLink}
                            onChange={(e) => setProdLink(e.target.value)}
                            placeholder="Paste product link here"
                            className="p-2 w-full bg-[#363637] text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#7E57C2]"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsModalOpen(false)}  // Close the modal
                                className="bg-[#363637] hover:bg-[#5d5d5d] text-white py-2 px-4 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProduct}
                                className="bg-[#7E57C2] hover:bg-[#5d45a1] text-white py-2 px-4 rounded-md"
                            >
                                Submit Product
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductTable;
