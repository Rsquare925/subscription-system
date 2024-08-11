import { useState, useEffect } from "react";
import { apiUrl } from "../Constant";
import axios from "axios";
import ExtendSubscription from "./ExtendSubscription";
import EndSubscription from "./EndSubscription";

function SubscriptionList() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get(apiUrl + "subscriptions/");
            setSubscriptions(response.data);
        } catch (e) {
            console.log(e);
            alert("Error fetching subscriptions");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Subscriptions</h2>
            {subscriptions.length > 0 ? (
                <ul className="space-y-4">
                    {subscriptions.map((subscription) => (
                        <li key={subscription.id} className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold text-gray-700">
                                    {subscription.customer_name}
                                </p>
                                <p className="text-gray-600">
                                    {subscription.product}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <ExtendSubscription
                                    subscriptionId={subscription.id}
                                    onExtend={fetchSubscriptions}
                                />
                                <EndSubscription
                                    subscriptionId={subscription.id}
                                    onEnd={fetchSubscriptions}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No subscriptions available</p>
            )}
        </div>
    );
}

export default SubscriptionList;
