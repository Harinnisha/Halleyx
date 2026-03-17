import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useStore } from '../store/store';
import Widget from '../components/Widget';
import WidgetToolbar from '../components/WidgetToolbar';
import { Settings, Check, Download, Info } from 'lucide-react';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const { widgets, isEditingDashboard, setEditingDashboard, updateWidgetsLayout, loadDummyData } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onLayoutChange = (layout) => {
    updateWidgetsLayout(layout);
  };

  const handleSave = () => {
    // In a real app, save layout to backend here
    setEditingDashboard(false);
  };

  const handleCancel = () => {
    // Optional: revert to original layout before edit
    setEditingDashboard(false);
  };

  return (
    <div className={`min-h-screen flex ${isEditingDashboard ? 'bg-[#f4f5f7]' : 'bg-gray-50 flex-col pt-8 px-8 pb-12'}`}>
      
      {isEditingDashboard && <WidgetToolbar />}

      {/* Main Content Area */}
      <div className={`${isEditingDashboard ? 'flex-1 ml-[340px] relative' : 'w-full'}`}>
        
        {/* Header - only visible when NOT editing */}
        {!isEditingDashboard && (
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-5">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
              <p className="text-gray-500 mt-2 flex items-center gap-2">
                <Info className="w-4 h-4" /> 
                {widgets.length === 0 
                  ? "Your dashboard is currently empty. Click 'Configure Dashboard' to add widgets." 
                  : "Monitor your customer orders and revenue at a glance."}
              </p>
            </div>
            <div className="flex gap-3">
              {widgets.length === 0 && (
                <button
                  onClick={loadDummyData}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center shadow-sm"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Load Sample Data
                </button>
              )}

              <button
                onClick={() => setEditingDashboard(true)}
                className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-blue-200 shadow-md transition-all flex items-center"
              >
                <Settings className="w-5 h-5 mr-2" />
                Configure Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Empty State vs Grid */}
        {widgets.length === 0 && !isEditingDashboard ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm p-12">
              <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                  <Settings className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No widgets configured</h2>
              <p className="text-gray-500 text-center max-w-md mb-8 leading-relaxed">
                  Your dashboard space is blank. Turn on configuration mode to click and add KPI cards, charts, and tables.
              </p>
              <button
                  onClick={() => setEditingDashboard(true)}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all flex items-center"
              >
                  <Settings className="w-5 h-5 mr-2" />
                  Configure Dashboard Now
              </button>
          </div>
        ) : (
          <div className={`p-6 ${isEditingDashboard ? 'h-full overflow-y-auto' : '-mx-2'}`}>
            
            {/* Editing mode wrapper to show a prominent grid outline around the canvas */}
            <div className={isEditingDashboard ? "bg-white border-[2px] border-blue-400 min-h-[calc(100vh-[padding])] rounded-sm relative shadow-sm h-full" : ""}>
              
              {/* Optional Grid Background Pattern mimicking Figma diagram */}
              {isEditingDashboard && (
                <div 
                  className="absolute inset-0 z-0 pointer-events-none" 
                  style={{
                    backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
                    backgroundSize: `calc(100% / 12) 40px`,
                    opacity: 0.6
                  }}
                />
              )}

              <ResponsiveGridLayout
                  className={`layout ${isEditingDashboard ? 'z-10 relative mt-0' : ''}`}
                  layouts={{ lg: widgets, md: widgets, sm: widgets, xs: widgets, xxs: widgets }}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
                  rowHeight={40}
                  onLayoutChange={onLayoutChange}
                  isDraggable={isEditingDashboard}
                  isResizable={isEditingDashboard}
                  compactType="vertical"
                  margin={isEditingDashboard ? [8, 8] : [16, 16]}
                  useCSSTransforms={mounted}
                  draggableHandle=".drag-handle"
              >
                  {widgets.map((widget) => (
                      <div key={widget.i} className={`relative group bg-white shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300 ${isEditingDashboard ? 'border border-gray-300 rounded-md' : 'rounded-2xl border border-gray-100'}`}>
                          <Widget widget={widget} />
                      </div>
                  ))}
              </ResponsiveGridLayout>
            </div>

            {/* Editing Action Buttons at bottom right */}
            {isEditingDashboard && (
              <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 shadow-sm shadow-emerald-200 transition-colors text-sm"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
