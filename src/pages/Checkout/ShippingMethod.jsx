import { useEffect, useState } from "react";
import wooRequest from "../../apis/wooAPI";
import PlaceHolderLoader from "../../components/Shared/PlaceHolderLoader";
import { BsCheckCircle } from "react-icons/bs";
const ShippingMethod = ({ setShippingZoon }) => {
    const [shipping, setShipping] = useState([]);
    const [selected, setSelected] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            try {
                const response = await wooRequest(`/shipping/zones/1/methods`);
                setShipping(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        fetchData()
    }, []);

    const shippingMethodCost = (ship) => {
        setSelected(ship?.order);
        setShippingZoon(ship);
    }
    if (loading) return <PlaceHolderLoader />
    return (
        <div>
            <h2 className="text-xl font-medium mb-2 text-gray-800">
                কুরিয়ার চার্জ
            </h2>

            <div className="space-y-3">
                {shipping.map((ship, index) => {
                    const title = ship?.settings?.title?.value;
                    const cost = ship?.settings?.cost?.value;
                    const order = ship?.order;

                    return (
                        <label
                            key={index}
                            className={`flex items-center justify-between p-3 border rounded cursor-pointer transition
                            ${selected === order ? "border-rose-500 bg-rose-50" : "border-gray-300 hover:border-rose-400"}`}>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="shipping" // same name for all radios
                                    value={cost}
                                    checked={selected === order}
                                    onChange={() => shippingMethodCost(ship)}
                                    className="text-rose-500 focus:ring-rose-500 w-0 h-0"
                                />
                                <span className="font-medium text-gray-700 text-lg flex gap-2 items-center">
                                    {
                                        selected == order ? <BsCheckCircle className="text-rose-500" /> : ''
                                    }
                                    {ship.title}
                                </span>
                            </div>
                            <span className="font-semibold text-gray-800 text-lg">{cost} ৳</span>
                        </label>
                    );
                })}
            </div>




        </div>
    );
}

export default ShippingMethod
