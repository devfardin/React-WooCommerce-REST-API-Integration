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
import axios from 'axios';
import { createAnOrder } from '../../apis/CreateOrder';

const CheckOut = () => {
  const { id } = useParams('id');
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])
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



  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, [])


  const handleOrderSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value;
    const mobile = form.mobile.value;
    const address = form.address.value;

    const shipping_lines = {
      method_id: "flat_rate",
      method_title: "Flat Rate",
      total: shippingZoon?.settings?.cost?.value || "0",
    }
    const billing = {
      first_name: name,
      address_1: address,
      // country: "Bangladesh",
      phone: mobile
    }
    const shipping = {
      first_name: name,
      address_1: address,
      // country: "Bangladesh",
      phone: mobile
    }
    const line_items = cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }));

    const orderDetails1 = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      shipping_lines,
      billing,
      shipping,
      line_items,
    }



    const orderDetails = {
      "payment_method": "cod",
      "payment_method_title": "Cash on Delivery",
      "set_paid": false,
      "billing": {
        "first_name": name,
        "address_1": address,
        "phone": mobile,
      },
      line_items : cart?.map(item => ({
        product_id: item?.id,
        quantity: item?.quantity,
      })),
      // line_items: line_items,
      "shipping_lines": [
        {
          "method_id": "flat_rate",
          "method_title": "Flat Rate",
          "total": shippingZoon?.settings?.cost?.value == undefined ? shippingZoon[0]?.settings?.cost?.value : shippingZoon?.settings?.cost?.value,
        }
      ]
    }
    



    try {
      const response = await wooRequest('/orders', "POST", orderDetails);
      console.log(response);
      if (response.data.id) {
        // setOrderLoading(false)
        toast.success('Order placed successfully!');
      }

    } catch (error) {
      console.error("Error placing order:", error);

    }
  }


  if (loading) return <Loader />
  if (cart.length === 0) return <NoCartItem />
  return (
    <Container>
      <form onSubmit={handleOrderSubmit}>
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-7 gap-8 align-middle justify-between'>
          <div className='w-full p-6 border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col gap-4'>
            <Form />
            <ShippingMethod setShippingZoon={setShippingZoon} />

            {/* <Button label={'অর্ডার কনফার্ম করুন'} onClick={() => placeOrder(product.id)} loading={orderLoading} disabled={orderLoading} /> */}

            <input className=' relative flex justify-center items-center gap-2 bg-primary border border-primary text-md py-3 font-bold text-white
          disabled:opacity-70 
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          px-4
          w-full' type="submit" value='অর্ডার কনফার্ম করুন' />
          </div>
          <div>
            <div className='w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white mb-6'>
              <CartItems cart={cart} setCart={setCart} shippingZoon={shippingZoon} />
            </div>
          </div>

        </div>
      </form>
    </Container>
  )
}

export default CheckOut
