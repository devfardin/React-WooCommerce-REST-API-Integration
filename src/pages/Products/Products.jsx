import { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import Loader from "../../components/Shared/Loader";
import ProductCard from "../../components/Shared/ProductCard";
import SectionTitle from "../../components/Shared/SectionTitle";
import wooRequest from "../../apis/wooAPI";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSearchParams } from "react-router";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;

    useEffect(() => {
        setLoading(true)
        const fetchProducts = async (pageNumber) => {
            try {
                const response = await wooRequest(`/products?per_page=10&page=${pageNumber}`);
                setProducts(response.data);
                setLoading(false)
                setTotalPages(parseInt(response.headers['x-wp-totalpages'], 10));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts(page);
    }, [page]);

    if (loading) return <Loader />;
    return (
        <Container>
            <div className=" mb-3">
                <SectionTitle title='All' highlight='Products' />
            </div>
            <div className="grid 2xl:grid-cols-5  xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
                {products?.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
            <div className=" mt-10 flex justify-center items-center">
                <div className="inline-flex justify-center items-center space-x-0.5 border border-gray-300 rounded">
                    <button
                        disabled={page === 1 || products.length === 0}
                        onClick={() => setSearchParams({ page: page - 1 })}
                        className={`px-3 py-2 font-medium transition-all duration-200 rounded-l ${page === 1 || products.length === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-btndangerbg active:bg-primary'
                            }`}
                    >
                        <GrFormPrevious className="text-lg" />
                    </button>

                    <div className="flex items-center">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (page <= 3) {
                                pageNum = i + 1;
                            } else if (page >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = page - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setSearchParams({ page: pageNum })}
                                    disabled={products.length === 0}
                                    className={`w-8 h-8 font-medium transition-all duration-200 ${page === pageNum
                                        ? 'bg-primary text-white'
                                        : products.length === 0
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        disabled={page === totalPages || products.length === 0}
                        onClick={() => setSearchParams({ page: page + 1 })}
                        className={`px-3 py-2 font-medium transition-all duration-200 rounded-r ${page === totalPages || products.length === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-btndangerbg active:bg-primary'
                            }`}
                    >
                        <GrFormNext className="text-lg" />
                    </button>
                </div>
            </div>

            {products.length === 0 && (
                <div className="text-center mt-4 text-gray-500">
                    No products available
                </div>
            )}
        </Container>
    )
}

export default Products
