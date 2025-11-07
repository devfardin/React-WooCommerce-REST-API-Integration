import { useEffect, useState } from "react";
import wooRequest from "../../apis/wooAPI";
import Container from "../../components/Shared/Container"
import Loader from "../../components/Shared/Loader";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import { Link, redirect } from "react-router-dom";
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


  const ProductDetails = (id) => {
    console.log(id);
    if (id) {
      redirect('details/')
      toast.success('Product Is: ' + id)
    }
  }

  console.log(products);

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <div>
        <h1>WooCommerce Products</h1>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-5">
          {products?.map((p) => (
            <div key={p?.id} className="border border-red-100">
              <img src={p?.images[0].src} alt={p.name} />
              <div className="p-4">
                <h3>{p.name}</h3>
                <p>Price: {p?.price}</p>
                <p>Price: {p?.short_description}</p>
              </div>
              <Button label='Buy Now' onClick={() => ProductDetails(p.id)} />
              <Link className="elative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            px-4
            w-full"
                to={`details/${p.id}`}> Buy Now </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
export default Home
