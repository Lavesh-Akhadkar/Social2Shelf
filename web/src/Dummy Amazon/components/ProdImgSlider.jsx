    import React from "react";
    import { Swiper, SwiperSlide } from "swiper/react";
    import { Pagination , Autoplay } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/pagination";

    const sliderImages = [
    "https://w0.peakpx.com/wallpaper/482/921/HD-wallpaper-mohamed-salah-portrait-egyptian-football-player-liverpool-fc-football-england-premier-league.jpg",
    "https://via.placeholder.com/1200x500?text=Deal+2",
    "https://via.placeholder.com/1200x500?text=Deal+3",
    "https://via.placeholder.com/1200x500?text=Deal+4",
    "https://via.placeholder.com/1200x500?text=Deal+5",
    ];

    export default function ProdImgSlider() {
    return (
        <section className="my-12">
        <div className="max-w-screen-xl mx-auto px-4">
            <Swiper
            slidesPerView={1} // Only one image per slide
            spaceBetween={10} // Small space between slides
            pagination={{
                clickable: true, // Make pagination bullets clickable
            }}
            loop={true} // Loop through images infinitely
            autoplay={{
                delay: 2000 // Change image every 2 seconds
            }}
            modules={[Pagination , Autoplay]} // Enable pagination module
            className="mySwiper"
            >
            {sliderImages.map((image, index) => (
                <SwiperSlide key={index}>
                <img
                    src={image}
                    alt={`Product deal ${index + 1}`}
                    className="w-full h-[500px] object-cover rounded-lg"
                />
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
        </section>
    );
    }
