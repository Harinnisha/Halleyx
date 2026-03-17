import React, { useMemo } from 'react';
import { useStore } from '../store/store';
import { TrendingUp, ShoppingBag, DollarSign } from 'lucide-react';

const KPICard = ({ widget }) => {
  const { orders, analytics } = useStore();

  // Use a stable metric type based on the widget id to avoid random re-renders
  const metricType = useMemo(() => {
    const hash = widget.i.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 3;
  }, [widget.i]);

  const totalOrders = analytics.totalOrders || orders.length;
  const totalRevenue = analytics.totalRevenue || orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalQuantity = orders.reduce((sum, o) => sum + (parseInt(o.quantity, 10) || 0), 0);

  const getMetricData = () => {
    switch (metricType) {
      case 0:
        return { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' };
      case 1:
        return { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' };
      case 2:
      default:
        return { label: 'Items Sold', value: totalQuantity, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' };
    }
  };

  const data = getMetricData();
  const Icon = data.icon;

  return (
    <div className="flex flex-col h-full w-full justify-center p-6 bg-white overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">{data.label}</h3>
        <div className={`p-2.5 rounded-xl border border-blue-100 ${data.bg}`}>
          <Icon className={`w-5 h-5 ${data.color}`} />
        </div>
      </div>
      <div className="flex items-end gap-3 truncate">
        <p className="text-4xl font-extrabold text-gray-900 truncate">{data.value}</p>
        <span className="text-sm font-medium text-green-500 bg-green-50 px-2 py-1 rounded-md mb-1">+12%</span>
      </div>
    </div>
  );
};

export default KPICard;
