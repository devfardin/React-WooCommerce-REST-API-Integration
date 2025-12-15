import { useEffect, useState } from 'react'
import Container from '../../components/Shared/Container';
import wooRequest from '../../apis/wooAPI';
import ShippingMethod from './ShippingMethod';
import CartItems from './CartItems';
import NoCartItem from './NoCartItem';
import Form from './Form';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const CheckOut = () => {
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])
  const navigate = useNavigate();
  // Order blocking configuration - modify these values as needed
  const ORDER_BLOCK_CONFIG = 1;
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
    const ip = await fetch('https://api.ipify.org?format=json');
    const ip_address = await ip.json();

    // Check customer data are exist
    if (!name) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: '⚠️ অনুগ্রহ করে আপনার নাম দিন।',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    } else if (!mobile) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: '⚠️ অনুগ্রহ করে আপনার মোবাইল নম্বর দিন।',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    } else if (!address) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: '⚠️ অনুগ্রহ করে আপনার ঠিকানা দিন।',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    };


    const response = await wooRequest('/orders', "GET");
    
    const orderExist = response.data?.find(order => {
      if (order.status !== "processing") {
        return false;
      }

      const customerIpMeta = order.meta_data?.find(meta => meta.key === "customer_ip");
      const orderDate = new Date(order.date_created);
      const currentDate = new Date();
      const timeDifference = currentDate - orderDate;
      const blockDurationMs = (ORDER_BLOCK_CONFIG * 24 * 60 * 60 * 1000);
      
      const isWithinBlockPeriod = timeDifference <= blockDurationMs;
      const ipMatch = customerIpMeta?.value === ip_address.ip;
      const phoneMatch = order.billing.phone === mobile;
      
      return isWithinBlockPeriod && (ipMatch || phoneMatch);
    });

    if (orderExist) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: '⚠️ আপনার অর্ডার অপেক্ষা করা হয়েছে। অনুগ্রহ করে আপনার ফোন নম্বর পরিবর্তন করুন।',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }






    // Customer Data structer here
    const orderDetails = {
      "payment_method": "cod",
      "payment_method_title": "Cash on Delivery",
      "set_paid": true,
      "status": "processing",
      "billing": {
        "first_name": name,
        "address_1": address,
        "phone": mobile,

      },
      line_items: cart?.map(item => ({
        product_id: item?.id,
        quantity: item?.quantity,
      })),

      "shipping_lines": [
        {
          "method_id": "flat_rate",
          "method_title": "Flat Rate",
          "total": shippingZoon?.settings?.cost?.value == undefined ? shippingZoon[0]?.settings?.cost?.value : shippingZoon?.settings?.cost?.value,
        }
      ],
      'customer_ip_address': ip_address.ip,
      'meta_data': [
        { key: "order_origin", value: "React Frontend" },
        { key: "customer_ip", value: ip_address.ip }
      ]
    }

    try {
      setLoading(true)
      const response = await wooRequest('/orders', "POST", orderDetails);
      if (response.data.id) {
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: 'আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে!',
          text: '💬 ধন্যবাদ আপনার অর্ডারের জন্য! আমাদের প্রতিনিধি খুব শীঘ্রই আপনাকে ফোন করে অর্ডারটি নিশ্চিত করবেন। অনুগ্রহ করে আপনার ফোনটি সচল রাখুন।',
        });
        // localStorage.removeItem('cart');
        // setCart([]);
        // navigate('/')
      }
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: "error",
        title: 'অর্ডার ব্যর্থ হয়েছে!',
        text: 'দুঃখিত! আপনার অর্ডারটি সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন অথবা আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।',
        confirmButtonText: "যোগাযোগ করুন",
        preConfirm: () => {
          // add whatsapp link
          window.open(
            '/',
            '_blank' // <- This is what makes it open in a new window.
          );
        }
      });
      console.error("Error placing order", error);

    }
  }

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await wooRequest('/orders', "GET");
        setOrders(response.data);
      } catch (error) {
        toast.error("Something went wrong while fetching orders");
      }
    }
    fetchOrders()
  }, [])


  console.log(orders);



  if (cart.length === 0) return <NoCartItem />
  return (
    <Container>
      <form onSubmit={handleOrderSubmit}>
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-7 gap-8 align-middle justify-between'>
          <div className='w-full p-6 border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col gap-4'>
            <Form />
            <ShippingMethod setShippingZoon={setShippingZoon} />

            {/* <Button label={'অর্ডার কনফার্ম করুন'} onClick={() => placeOrder(product.id)} loading={orderLoading} disabled={orderLoading} /> */}

            <button disabled={loading} className=' relative flex justify-center items-center gap-2 bg-primary border border-primary text-md py-3
            font-bold text-white disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 w-full' type="submit">  {
                loading ? <ClipLoader color="white" size={25} /> : 'অর্ডার কনফার্ম করুন'} </button>
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
