import { useState, useEffect } from "react";
import { apiUrl } from "../Constant";
import axios from "axios";

function RevenueReport() {
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {  
        fetchRevenueReport();
    }, []);

    const fetchRevenueReport = async () => {
        try {
            const response = await axios.get(apiUrl + "revenue-report/");
            setRevenue(response.data.total_revenue);
        } catch (e) {
            console.log(e);
            alert('Error fetching revenue report');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Revenue Report</h2>
            <div className="bg-blue-100 p-4 rounded-lg shadow-inner">
                <p className="text-lg font-semibold text-gray-700">Total Revenue:</p>
                <p className="text-2xl font-bold text-blue-600">INR {revenue.toLocaleString()}</p>
            </div>
        </div>
    );
}

export default RevenueReport;
