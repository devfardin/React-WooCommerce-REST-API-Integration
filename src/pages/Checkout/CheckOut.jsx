import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../components/Shared/Container';
import Loader from '../../components/Shared/Loader';
import wooRequest from '../../apis/wooAPI';
import toast from 'react-hot-toast';
import Button from '../../components/Button/Button';
import ShippingMethod from './ShippingMethod';
import CartItems from './CartItems';
import NoCartItem from './NoCartItem';
import Form from './Form';

const CheckOut = () => {
  const { id } = useParams('id');
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState([]);
  const [shippingZoon, setShippingZoon] = useState([
    {
      title: "ঢাকা সিটির বাহিরে",
      settings: {
        cost: {
          id: "cost",
          label: "Cost",
          description:
            'Enter a cost (excl. tax) or sum, e.g. <code>10.00 …20" max_fee=""]</code> for percentage based fees.',
          type: "text",
          value: "120",
        }
      },
    },
  ]);
  const [orderLoading, setOrderLoading] = useState(false)
  const cart = JSON.parse(localStorage.getItem('cart')) || []

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



  const orderDetails = {
    "payment_method": "bacs",
    "payment_method_title": "Direct Bank Transfer",
    "set_paid": true,
    "billing": {
      "first_name": "Fardin",
      "last_name": "Ahmed",
      "address_1": "Dhanbari, Tangail",
      "address_2": "",
      "city": "Dhanbari",
      "state": "CA",
      "postcode": "94103",
      "country": "US",
      "email": "contactfardin22@gmail.com",
      "phone": "+88 01316049157"
    },
    "shipping": {
      "first_name": "John",
      "last_name": "Doe",
      "address_1": "969 Market",
      "address_2": "",
      "city": "San Francisco",
      "state": "CA",
      "postcode": "94103",
      "country": "US"
    },
    "line_items": [
      {
        "product_id": id,
        "quantity": 2
      },

    ],
    "shipping_lines": [
      {
        "method_id": "flat_rate",
        "method_title": "Flat Rate",
        "total": "10.00"
      }
    ]
  }

  const placeOrder = async (id) => {
    setOrderLoading(true)
    try {
      const response = await wooRequest('/orders', "POST", orderDetails);
      console.log(response);

      if (response.data.id) {
        setOrderLoading(false)
        toast.success('Order placed successfully!');
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (loading) return <Loader />

  if (cart.length === 0) return <NoCartItem />
  return (
    <Container>
      <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-7 gap-8 align-middle justify-between'>

        <div className='w-full p-6 border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col gap-4'>
          <Form />
          <ShippingMethod setShippingZoon={setShippingZoon} />

          <Button label={'অর্ডার কনফার্ম করুন'} onClick={() => placeOrder(product.id)} loading={orderLoading} disabled={orderLoading} />
        </div>
        <div>
          <div className='w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white mb-6'>
            <CartItems shippingZoon={shippingZoon} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CheckOut
