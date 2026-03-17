import React from 'react';
import { X, CheckCircle2, Circle, Package, Truck, Home, Clock } from 'lucide-react';
import { format } from 'date-fns';

const TrackingModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const steps = [
    {
      title: 'Order Placed',
      description: 'Your order has been successfully placed.',
      icon: Package,
      status: 'completed',
      date: order.created_at || order.createdAt || order.orderDate || order.order_date
    },
    {
      title: 'Processing',
      description: 'The order is being prepared and packed.',
      icon: Clock,
      status: order.status === 'In progress' || order.status === 'Completed' ? 'completed' : 'pending',
      date: order.status === 'In progress' || order.status === 'Completed' ? order.updated_at || order.updatedAt || order.order_date || order.orderDate : null
    },
    {
      title: 'Shipped',
      description: 'Your package is on its way to you.',
      icon: Truck,
      status: order.status === 'Completed' ? 'completed' : 'pending',
      date: order.status === 'Completed' ? order.updated_at || order.updatedAt || order.order_date || order.orderDate : null
    },
    {
      title: 'Delivered',
      description: 'Package has been delivered to the destination.',
      icon: Home,
      status: order.status === 'Completed' ? 'completed' : 'pending',
      date: order.status === 'Completed' ? order.updated_at || order.updatedAt || order.order_date || order.orderDate : null
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Track Order</h2>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Order ID: {order._id.substring(0, 8)}...</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              const isCompleted = step.status === 'completed';

              return (
                <div key={index} className="flex relative">
                  {!isLast && (
                    <div className={`absolute left-[19px] top-10 w-0.5 h-10 ${isCompleted && steps[index+1].status === 'completed' ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                  
                  <div className={`p-2 rounded-full z-10 ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.title}
                      </h4>
                      {step.date && (
                        <span className="text-[10px] font-medium text-gray-400">
                          {format(new Date(step.date), 'MMM d, h:mm a')}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-blue-500 uppercase font-bold tracking-wider">Destination</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{order.city}, {order.state}, {order.country}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-blue-500 uppercase font-bold tracking-wider">Current Status</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{order.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white text-gray-700 font-bold text-sm rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
