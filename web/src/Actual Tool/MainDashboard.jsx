import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductTable from "./ProductTable";

const MainDashboard = () => {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://2a08-2405-201-20-b11e-a08d-24f7-5db0-803f.ngrok-free.app/api/products/",
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "Content-Type": "application/json",
            },
          }
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="bg-[#363637] flex flex-col w-full h-full overflow-auto p-4 md:px-6 py-6 space-y-16">
      
      {/* Welcome Title */}
      <div className="welcomeTitle flex justify-between shadow-2xl text-white rounded-xl">
        <div className="greetingBox border flex flex-col w-full mx-auto relative space-y-4 p-5 shadow-md hover:shadow-xl rounded-xl bg-gradient-to-r from-[#212121] to-nblack-800">
          <h1 className="text-xl md:text-2xl font-semibold">{getGreeting()}!</h1>
          <div className="flex gap-x-3 items-center">
            <h1 className="text-2xl md:text-4xl font-bold">User</h1>
            <h1 className="text-xl">👋</h1>
          </div>
          <img
            className="w-40 md:block md:w-60 absolute right-0 md:right-14 bottom-0"
            src="/shop-illustration.png"
            alt="Shop Illustration"
          />
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : tableData && tableData.length > 0 ? (
        <ProductTable data={tableData} />
      ) : (
        <div className="text-white text-center text-xl">No products available.</div>
      )}
    </div>
  );
};

export default MainDashboard;
