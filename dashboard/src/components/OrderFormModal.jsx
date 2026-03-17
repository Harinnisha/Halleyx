import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import { X, Save } from 'lucide-react';

const OrderFormModal = ({ isOpen, onClose, order }) => {
  const { addOrder, updateOrder } = useStore();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phoneNumber: '',
    streetAddress: '', city: '', state: '', postalCode: '', country: '',
    product: '', quantity: 1, unitPrice: 0, status: 'Pending', createdBy: 'Admin'
  });

  useEffect(() => {
    if (order) {
      setFormData({
        firstName: order.firstName || '',
        lastName: order.lastName || '',
        email: order.email || '',
        phoneNumber: order.phoneNumber || '',
        streetAddress: order.streetAddress || '',
        city: order.city || '',
        state: order.state || '',
        postalCode: order.postalCode || '',
        country: order.country || '',
        product: order.product || '',
        quantity: order.quantity || 1,
        unitPrice: order.unitPrice || 0,
        status: order.status || 'Pending',
        createdBy: order.createdBy || 'Admin'
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'unitPrice' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (order) {
      await updateOrder(order._id, formData);
    } else {
      await addOrder(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  const totalCalculated = formData.quantity * formData.unitPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm overflow-y-auto pt-[10vh]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative mb-10">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            {order ? 'Edit Customer Order' : 'New Customer Order'}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Customer Information */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest border-b pb-2">Customer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest border-b pb-2">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input required name="streetAddress" value={formData.streetAddress} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required name="city" value={formData.city} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input required name="state" value={formData.state} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input required name="postalCode" value={formData.postalCode} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input required name="country" value={formData.country} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest border-b pb-2">Order Specifics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50/30 p-4 rounded-xl border border-blue-100">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input required name="product" value={formData.product} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price ($)</label>
                  <input required type="number" min="0" step="0.01" name="unitPrice" value={formData.unitPrice} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                </div>
                <div className="flex flex-col justify-end">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calculated Total</label>
                    <div className="w-full px-4 py-2 bg-gray-100 text-gray-900 border border-gray-200 rounded-xl font-bold flex items-center">
                        ${totalCalculated.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose}
              className="px-6 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              {order ? 'Save Changes' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;
