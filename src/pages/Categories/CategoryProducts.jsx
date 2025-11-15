import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import wooRequest from '../../apis/wooAPI';
import { toast } from 'react-toastify';
import Container from '../../components/Shared/Container';
import ProductCard from '../../components/Shared/ProductCard';
import Loader from '../../components/Shared/Loader';
import SectionTitle from '../../components/Shared/SectionTitle';
import CategorySlider from '../../components/CategorySlider';

const CategoryProducts = () => {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  useEffect(() => {
    setLoading(true)
    const categories = async () => {
      try {
        const response = await wooRequest((`/products/categories?slug=${slug}`));
        const products = await wooRequest((`/products?category=${response.data[0]?.id}`));
        setCategories(products?.data);
        setCategoryName(response?.data[0]?.name);
        setLoading(false)
      } catch (error) {
        toast.error('Error fetching category products');
        console.error("Error fetching category products:", error);
      }
    }
    categories();
  }, [slug])
  if (loading) return <Loader />;
  return (
    <Container>
      <div>
        <CategorySlider />
      </div>
      <div className="my-4">
        <SectionTitle title='Category:' highlight={categoryName} lable='Shop' to='/shop' />
      </div>
      <div className="grid 2xl:grid-cols-5  xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {categories?.map((categorie) => (
          <ProductCard product={categorie} />
        ))}
      </div>
    </Container>
  )
}

export default CategoryProducts
