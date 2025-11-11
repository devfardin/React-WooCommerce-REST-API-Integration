import { useEffect, useState } from "react";
import wooRequest from "../../apis/wooAPI";

const ShippingMethod = () => {
    const [shipping, setShipping] = useState([]);
    const [selected, setSelected] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await wooRequest(`/shipping/zones/1/methods`);
                setShipping(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        fetchData()
    }, []);

    console.log(shipping);

    return (
        <div className="p-4 border rounded-2xl shadow-sm bg-white max-w-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Shipping Options
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
                                    value={title}
                                    checked={selected === order}
                                    onChange={() => setSelected(order)}
                                    className="text-rose-500 focus:ring-rose-500 w-0 h-0"
                                />
                                <span className="font-medium text-gray-700 text-xl">{ship.title}</span>
                            </div>
                            <span className="font-semibold text-gray-800 text-lg">{cost}</span>
                        </label>
                    );
                })}
            </div>




        </div>
    );
}

export default ShippingMethod
