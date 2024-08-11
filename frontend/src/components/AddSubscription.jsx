import axios from "axios";
import { useState, useEffect } from "react";
import { apiUrl } from "../Constant";

function AddSubscription() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        customer: '',
        product: '',
        start_date: '',
        end_date: '',
        num_users: '',
    });

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchCustomers = async () => {
        const response = await axios.get(apiUrl + "customers/");
        setCustomers(response.data);
    };

    const fetchProducts = async () => {
        const response = await axios.get(apiUrl + "products/");
        setProducts(response.data);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(apiUrl + "subscription/add/", formData);
            alert('Subscription added successfully');
        } catch (error) {
            alert(error.response.data.error || 'Error adding subscription');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Subscription</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
                    <select 
                        id="customer" 
                        name="customer" 
                        onChange={handleChange} 
                        value={formData.customer} 
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.customer_id} value={customer.customer_id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
                    <select 
                        id="product" 
                        name="product" 
                        onChange={handleChange} 
                        value={formData.product} 
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product.name} value={product.name}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input 
                        type="date" 
                        id="start_date" 
                        name="start_date" 
                        onChange={handleChange} 
                        value={formData.start_date} 
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input 
                        type="date" 
                        id="end_date" 
                        name="end_date" 
                        onChange={handleChange} 
                        value={formData.end_date} 
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="num_users" className="block text-sm font-medium text-gray-700">Number of Users</label>
                    <input 
                        type="number" 
                        id="num_users" 
                        name="num_users" 
                        onChange={handleChange} 
                        value={formData.num_users} 
                        min="1" 
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Subscription
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddSubscription;
