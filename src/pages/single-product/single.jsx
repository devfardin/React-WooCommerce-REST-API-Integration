import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import wooRequest from '../../apis/wooAPI';
import Loader from '../../components/Shared/Loader';
import Container from '../../components/Shared/Container';
import ReactLink from '../../components/Button/ReactLink';

const Single = () => {
    const { id } = useParams('id');
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const response = await wooRequest(`/products/${id}`);
                setProduct(response.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }

        if (id) fetchData();
    }, [id]);

    if (loading) return <Loader />
    return (
        <Container>
            <div>
                <div>
                    <h2>{product.name}</h2>
                    <img src={product.images?.[0]?.src} alt={product.name} width="200" />
                    <p>Price: {product.price}</p>
                    <ReactLink label='Proceed to Checkout' to={`/checkout/${product.id}`} />
                </div>
            </div>
        </Container>
    )
}

export default Single;
