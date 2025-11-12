import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import wooRequest from '../../apis/wooAPI';
import Loader from '../../components/Shared/Loader';
import Container from '../../components/Shared/Container';
import SingleButton from './SingleButton';

const Single = () => {
    const { id } = useParams('id');
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const response = await wooRequest(`/products/${id}`);
                setProduct(response.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false)
            }
        }

        if (id) fetchData();
    }, [id]);

    if (loading) return <Loader />
    
    const images = product.images || [];
    const regularPrice = product.regular_price;
    const salePrice = product.price;
    const isOnSale = regularPrice && salePrice && regularPrice !== salePrice;

    return (
        <Container>
            <div className="py-8">
                {/* Product Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Column - Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative overflow-hidden rounded-lg bg-gray-100">
                            <img 
                                src={images[selectedImage]?.src || '/placeholder.jpg'} 
                                alt={product.name}
                                className={`w-full h-96 object-cover transition-transform duration-300 cursor-zoom-in ${
                                    isZoomed ? 'scale-150' : 'scale-100'
                                }`}
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                            />
                        </div>
                        
                        {/* Image Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex space-x-2 overflow-x-auto">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                                            selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                                        }`}
                                    >
                                        <img 
                                            src={image.src} 
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="space-y-6">
                        {/* Product Title */}
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        
                        {/* Short Description */}
                        {product.short_description && (
                            <div 
                                className="text-gray-600 prose prose-sm"
                                dangerouslySetInnerHTML={{ __html: product.short_description }}
                            />
                        )}
                        
                        {/* Price */}
                        <div className="flex items-center space-x-3">
                            <span className="text-3xl font-bold text-green-600">৳{salePrice}</span>
                            {isOnSale && (
                                <span className="text-xl text-gray-500 line-through">৳{regularPrice}</span>
                            )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <div className="flex space-x-3">
                                {/* <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    অর্ডার করুন
                                </button> */}
                                <SingleButton product={product}/>

                                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                অর্ডার করতে কল করুন
                            </button>
                        </div>
                        
                        {/* SKU */}
                        {product.sku && (
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">SKU:</span> {product.sku}
                            </div>
                        )}
                        
                        {/* Delivery Charges */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">ডেলিভারি চার্জ</h3>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div>ঢাকার ভিতরে: ৮০ টাকা</div>
                                <div>ঢাকার বাইরে: ১২০ টাকা</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Product Description Section */}
                <div className="border-t pt-8">
                    <div className="mb-6">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium">
                            Description
                        </button>
                    </div>
                    
                    {product.description && (
                        <div 
                            className="prose prose-lg max-w-none  leading-7"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    )}
                </div>
            </div>
        </Container>
    )
}

export default Single;
