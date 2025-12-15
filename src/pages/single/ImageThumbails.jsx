import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ImageThumbails = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2">
                {
                    images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img  src={image.src}  className='rounded-md w-full h-full object-center' />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mt-3">
                { // image have one don't show this 
                    images.length > 1 &&
                    images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image.src} className='rounded-md' />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
}

export default ImageThumbails
