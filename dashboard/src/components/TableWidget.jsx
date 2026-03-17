import React from 'react';
import { useStore } from '../store/store';
import { format } from 'date-fns';

const TableWidget = () => {
  const { orders } = useStore();
  
  const recentOrders = [...orders].sort((a, b) => new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt)).slice(0, 5);

  return (
    <div className="flex flex-col h-full bg-white p-5 overflow-hidden">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
      <div className="flex-1 overflow-auto -mx-5 px-5">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium text-right">Amount</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">No orders yet.</td>
              </tr>
            ) : (
              recentOrders.map((order, idx) => (
                <tr key={order._id || idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-medium text-gray-800">{order.firstName} {order.lastName}</td>
                  <td className="py-3 text-gray-600 truncate max-w-[120px]">{order.product}</td>
                  <td className="py-3 text-right font-semibold">${order.totalAmount?.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'In progress' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500 whitespace-nowrap">
                    {order.orderDate ? format(new Date(order.orderDate), 'MMM d, yyyy') : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWidget;
