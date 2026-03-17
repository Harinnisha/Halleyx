import React, { useState } from 'react';
import { useStore } from '../store/store';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronRight, 
  BarChart3, 
  LineChart, 
  PieChart, 
  AreaChart, 
  ScatterChart,
  Table as TableIcon,
  Activity,
  GripVertical
} from 'lucide-react';

const SidebarSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-100 rounded-xl mb-3 bg-white overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm">{title}</span>
        {isOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="p-3 pt-0 border-t border-gray-50 bg-gray-50/30">
          <div className="space-y-1 mt-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DraggableWidgetOption = ({ type, label, icon: Icon, onClick }) => {
  return (
    <div 
      onClick={() => onClick(type)}
      className="flex items-center p-3 mb-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:shadow-sm transition-all group"
    >
      <GripVertical className="w-4 h-4 text-gray-300 mr-2 group-hover:text-blue-400" />
      <Icon className="w-5 h-5 text-gray-500 mr-3 group-hover:text-blue-500" />
      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{label}</span>
      <span className="ml-auto text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 uppercase font-bold">Add</span>
    </div>
  );
};

const WidgetToolbar = () => {
  const { setEditingDashboard, addWidget } = useStore();

  return (
    <div className="w-[340px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen overflow-hidden left-0 top-0 fixed z-50 shadow-lg">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start gap-4 mb-2">
          <button 
            onClick={() => setEditingDashboard(false)}
            className="p-1 mt-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Configure dashboard</h2>
            <p className="text-xs text-gray-500 mt-1">Configure your dashboard to start viewing analytics</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {/* View Data For */}
        <div className="mb-8">
          <label className="block text-xs font-semibold text-gray-500 mb-2">View Data For</label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium shadow-sm">
              <option>All time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Widget Library */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-1">Widget library</h3>
          <p className="text-xs text-gray-500 mb-4">Choose a chart type from the list below. Click to add to the canvas.</p>
          
          <SidebarSection title="Charts" defaultOpen={true}>
            <DraggableWidgetOption type="barChart" label="Bar Chart" icon={BarChart3} onClick={addWidget} />
            <DraggableWidgetOption type="lineChart" label="Line Chart" icon={LineChart} onClick={addWidget} />
            <DraggableWidgetOption type="pieChart" label="Pie Chart" icon={PieChart} onClick={addWidget} />
            <DraggableWidgetOption type="areaChart" label="Area Chart" icon={AreaChart} onClick={addWidget} />
            <DraggableWidgetOption type="scatterPlot" label="Scatter Plot" icon={ScatterChart} onClick={addWidget} />
          </SidebarSection>
          
          <SidebarSection title="Tables" defaultOpen={true}>
            <DraggableWidgetOption type="table" label="Table" icon={TableIcon} onClick={addWidget} />
          </SidebarSection>
          
          <SidebarSection title="KPIs" defaultOpen={true}>
            <DraggableWidgetOption type="kpi" label="KPI Value" icon={Activity} onClick={addWidget} />
          </SidebarSection>

        </div>
      </div>
    </div>
  );
};

export default WidgetToolbar;
