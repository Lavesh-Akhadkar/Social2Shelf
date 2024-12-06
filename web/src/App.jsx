import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Dummy Amazon/components/Navbar';
import 'flowbite';
import Categories from './Dummy Amazon/components/Categories';
import ProdImgSlider from './Dummy Amazon/components/ProdImgSlider';
import ProductListings from './Dummy Amazon/components/ProductListings';
import Home from './Actual Tool/Home';
import SidebarLayout from './Actual Tool/SidebarLayout';
import MainDashboard from './Actual Tool/MainDashboard';
import AnalyticsDashboard from './Actual Tool/AnalyticsDashboard';
import ProductPublishPage from './Actual Tool/ProductPublishPage';
import ProductDetailPage from './Dummy Amazon/ProductDetailPage';
import AmazonHome from './Dummy Amazon/AmazonHome';
import About from './About';
import Login from './Actual Tool/Login';
import Signup from './Actual Tool/Signup';

const App = () => {

  const router = createBrowserRouter([
    {
      index : true,
      element : <Signup />
    },
    {
      path: '/signup',
      element: <Signup /> 
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path : '/home',
      element : <Home />

    },
    {
      path : '/about',
      element : <About />
    },
    {
      path: '/dashboard',
      element: <SidebarLayout />,
      children: [
        {
          index: true,
          element: <MainDashboard />
        },
        {
          path: 'home',
          element: <MainDashboard />
        },
        {
          path: 'analytics',
          element: <AnalyticsDashboard />
        },
        {
          path : 'publish',
          element : <ProductPublishPage />
        }
      ]
    },
    {
      path : '/amazon',
      children : [
        {
          index : true,
          element : <AmazonHome />
        },
        {
          path : 'home',
          element : <AmazonHome />
        },
        {
          path : 'productDetails/:id',
          element : <ProductDetailPage />
        }
      ]
    }
  ])

  
const backendData = {
  id: 6,
  name: "Backpack",
  image: "https://c4.wallpaperflare.com/wallpaper/980/804/922/soccer-mohamed-salah-liverpool-f-c-wallpaper-preview.jpg",
  category: "Accessories",
  status: "inactive",
  quantity: 40,
  price: 1299,
  addedTime: "2024-11-02T13:20:00Z",
};

const productData = {
  id: 6,
  name: "Men Mauve Regular Fit Solid Sustainable Casual Shirt",
  image: "https://via.placeholder.com/400",
  description:
      "This sustainable casual shirt features a regular fit and a classic design, perfect for any occasion.",
  category: "Men Clothing",
  price: 575,
  originalPrice: 1199,
  discount: 52,
  rating: 4.2,
  reviews: 32800,
  sizes: [38, 40, 42, 44],
};

  return (
     <RouterProvider router={router} />
    // <ProductPublishPage backendData={backendData} />
    // <ProductDetailPage productData={productData} />
   
  );
}

export default App;
