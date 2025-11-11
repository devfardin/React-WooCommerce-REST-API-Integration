import { useEffect, useState } from "react";
import wooRequest from "../../apis/wooAPI";
import Container from "../../components/Shared/Container"
import Loader from "../../components/Shared/Loader";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import ReactLink from '../../components/Button/ReactLink'
import CategorySlider from "../../components/CategorySlider";
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
      <div className="mt-7">
        <CategorySlider/>
        <h1>WooCommerce Products</h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-5">
          {products?.map((p) => (
            <div key={p?.id} className="border border-red-100">
              <img src={p?.images[0].src} alt={p.name} />
              <div className="p-4">
                <h3>{p.name}</h3>
                {/* <p>Price: {p?.price}</p> */}
                <div
                  className="text-gray-800 font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: p.price_html
                  }}
                />
                <p>Price: {p?.short_description}</p>
              </div>
              <div>
                <ReactLink label='Buy Now' to={`details/${p.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
export default Home
