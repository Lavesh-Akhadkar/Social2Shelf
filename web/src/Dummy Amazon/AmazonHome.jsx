import React from 'react'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import ProdImgSlider from './components/ProdImgSlider'
import ProductListings from './components/ProductListings'

const AmazonHome = () => {
    return (
        <div>
            <Navbar />
            <Categories />
            <ProdImgSlider />
            <ProductListings />
        </div>
    )
}

export default AmazonHome