import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  "Electronics", "Clothing", "Books", "Furniture", "Sports", "Toys", "Groceries", "Home Appliances"
];

export default function Categories() {
  return (
    <>
      <section className="bg-[#2d3c4d] py-2">
        <div className="max-w-screen-xl mx-auto px-4">
          
          <Swiper
            slidesPerView={3} // Default for small screens
            spaceBetween={20}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 3, // 3 categories visible on small screens
              },
              768: {
                slidesPerView: 5, // 5 categories visible on medium screens
              },
              1024: {
                slidesPerView: 8, // All 8 categories visible on large screens
              },
            }}
            className="mySwiper"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center  rounded-md  shadow-md hover:shadow-lg">
                  <h3 className="text-sm font-semibold text-white">{category}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
