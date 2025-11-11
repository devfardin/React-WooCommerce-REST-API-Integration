import { useEffect, useState } from 'react'
import wooRequest from '../apis/wooAPI';
import Loader from './Shared/Loader';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        const fetchCategories = async () => {
            try {
                const response = await wooRequest('/products/categories');
                setCategories(response.data);
                setLoading(false)
            } catch (error) {
                toast.error("Error fetching categories:", error)
            }
        };
        fetchCategories();
    }, []);
    if (loading) return (<Loader />);
    return (
        <div>
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper">
                {categories.map((category) => (
                    <SwiperSlide key={category.id}>
                        <Link to={`/category/${category.slug}`}
                            className='w-full block border border-border rounded py-3 text-center text-base font-medium text-headingprimary opacity-100 hover:text-primary transition-all duration-75 bg-white cursor-pointer'>
                            {category.name}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default CategorySlider
