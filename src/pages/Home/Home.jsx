import { useEffect, useState } from "react";
import wooRequest from "../../apis/wooAPI";
import Container from "../../components/Shared/Container"
import Loader from "../../components/Shared/Loader";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import ReactLink from '../../components/Button/ReactLink'
import CategorySlider from "../../components/CategorySlider";
import ProductCard from "../../components/Shared/ProductCard";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      try {
        const response = await wooRequest('/products');
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);



  console.log(products);

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <div>
        <CategorySlider/>
        <h1>WooCommerce Products</h1>
        <div className="grid 2xl:grid-cols-5  xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
          {products?.map((product) => (
            <ProductCard product={product}/>
          ))}
        </div>
      </div>
    </Container>
  )
}
export default Home
