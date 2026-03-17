import React, { useEffect } from 'react';
import { useStore } from '../store/store';
import KPICard from './KPICard';
import BarChartWidget from './BarChartWidget';
import PieChartWidget from './PieChartWidget';
import TableWidget from './TableWidget';
import LineChartWidget from './LineChartWidget';
import AreaChartWidget from './AreaChartWidget';
import ScatterChartWidget from './ScatterChartWidget';
import { X, GripVertical } from 'lucide-react'; // Grip represents the 6 dots

const Widget = ({ widget }) => {
  const { isEditingDashboard, removeWidget, fetchOrders, fetchAnalytics } = useStore();

  useEffect(() => {
    fetchOrders();
    fetchAnalytics();
  }, []);

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'kpi':
        return <KPICard widget={widget} />;
      case 'barChart':
        return <BarChartWidget widget={widget} />;
      case 'lineChart':
        return <LineChartWidget widget={widget} />;
      case 'areaChart':
        return <AreaChartWidget widget={widget} />;
      case 'pieChart':
        return <PieChartWidget widget={widget} />;
      case 'scatterPlot':
        return <ScatterChartWidget widget={widget} />;
      case 'table':
        return <TableWidget widget={widget} />;
      default:
        return <div className="p-4">Unknown Widget Type: {widget.type}</div>;
    }
  };

  const getWidgetLabel = () => {
    switch(widget.type) {
      case 'kpi': return 'KPI';
      case 'barChart': return 'Bar Chart';
      case 'lineChart': return 'Line Chart';
      case 'areaChart': return 'Area Chart';
      case 'scatterPlot': return 'Scatter Plot';
      case 'pieChart': return 'Pie Chart';
      case 'table': return 'Table';
      default: return widget.type.toUpperCase();
    }
  };

  return (
    <>
      <div className="flex-1 overflow-hidden relative group h-full bg-white flex flex-col">
        {isEditingDashboard && (
          <div className="drag-handle bg-[#f4f5f7] border-b border-gray-200 h-10 w-full flex-shrink-0 cursor-grab active:cursor-grabbing flex items-center justify-between px-3 z-50">
            <div className="flex items-center text-gray-500 font-medium text-[11px] tracking-wider uppercase">
                <div className="flex select-none opacity-50 mr-2">
                  <div className="grid grid-cols-2 gap-[2px] p-1">
                    <div className="w-[3px] h-[3px] bg-gray-500 rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-gray-500 rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-gray-500 rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-gray-500 rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-gray-500 rounded-full"></div>
                    <div className="w-[3px] h-[3px] bg-gray-500 rounded-full"></div>
                  </div>
                </div>
                {getWidgetLabel()}
            </div>
            <button
              onClick={() => removeWidget(widget.i)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors flex items-center justify-center pointer-events-auto"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <div className="flex-1 w-full overflow-hidden">
            {renderWidgetContent()}
        </div>
      </div>
    </>
  );
};

export default Widget;
