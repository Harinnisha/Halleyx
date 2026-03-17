import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import OrderFormModal from '../components/OrderFormModal';
import TrackingModal from '../components/TrackingModal';
import { Plus, Search, Edit2, Trash2, Package, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const Orders = () => {
  const { orders, deleteOrder, fetchOrders, loading } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => 
    `${order.firstName} ${order.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleTrack = (order) => {
    setTrackingOrder(order);
    setIsTrackingOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
    fetchOrders(); // Refresh after modal closes
  };

  const closeTrackingModal = () => {
    setIsTrackingOpen(false);
    setTrackingOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-8 px-8 pb-12">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Customer Orders</h1>
          <p className="text-gray-500 mt-2">Manage and track your customer purchases.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-5 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Order
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search customers, products, or status..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm font-medium"
            />
          </div>
          <div className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500 font-bold uppercase tracking-wider">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'} Total
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          ) : (
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-100 italic">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Info</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right px-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <Package className="w-10 h-10 text-gray-300" />
                      </div>
                      <p className="text-lg font-bold text-gray-900">No matching orders</p>
                      <p className="text-sm mt-1 text-gray-500 max-w-[250px] mx-auto">Try adjusting your search filters or add a new customer order.</p>
                      <button 
                        onClick={handleAddNew}
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-100 hover:bg-blue-700 transition-all"
                      >
                        Create Your First Order
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="group hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm">
                          {order.firstName?.charAt(0)}{order.lastName?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{order.firstName} {order.lastName}</div>
                          <div className="text-[11px] text-gray-400 font-medium">{order.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-semibold text-gray-800 text-sm">{order.product}</div>
                      <div className="text-[11px] text-gray-500">Qty: {order.quantity} × ${order.unitPrice?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-extrabold text-gray-900">${order.totalAmount?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'In progress' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs text-gray-500 font-medium">
                      {order.orderDate ? format(new Date(order.orderDate), 'MMM d, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleTrack(order)}
                          className="p-2 hover:bg-green-50 hover:text-green-600 text-gray-400 rounded-lg transition-all"
                          title="Track Progress"
                        >
                          <MapPin className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleEdit(order)}
                          className="p-2 hover:bg-blue-50 hover:text-blue-600 text-gray-400 rounded-lg transition-all"
                          title="Edit Details"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm('Permanent delete. Are you sure?')) {
                              deleteOrder(order._id);
                            }
                          }}
                          className="p-2 hover:bg-red-50 hover:text-red-600 text-gray-400 rounded-lg transition-all"
                          title="Delete Permanently"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <OrderFormModal isOpen={isModalOpen} onClose={closeModal} order={editingOrder} />
      )}

      {isTrackingOpen && (
        <TrackingModal isOpen={isTrackingOpen} onClose={closeTrackingModal} order={trackingOrder} />
      )}
    </div>
  );
};

export default Orders;
