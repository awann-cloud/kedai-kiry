import { AdminRetractableSidebar } from './components/AdminRetractableSidebar';
import SparkleDecorationPaths from "./imports/SparkleDecoration";
import { imgGroup as sparkleImgGroup } from "./imports/SparkleIconMask";
import { useOrders } from './contexts/OrderContext';
import { useState } from 'react';
import { Receipt } from 'lucide-react';

export default function AdminSettings() {
  const { getAllOrders } = useOrders();
  const allDepartments = getAllOrders();
  const [viewMode, setViewMode] = useState<'table' | 'receipt'>('table');

  // Flatten all orders from all departments and extract finished items
  const finishedItems = allDepartments.flatMap(dept => 
    dept.orders.flatMap(order => 
      order.items
        .filter(item => item.status === 'finished')
        .map(item => ({
          orderId: order.orderId,
          itemName: item.name,
          department: dept.department,
          finishedAt: item.finishedAt || 'N/A',
          waiter: order.assignedWaiter || 'Not assigned',
          deliveredAt: order.deliveredAt || 'Not delivered yet'
        }))
    )
  );

  // Get all orders (for receipt view)
  const allOrders = allDepartments.flatMap(dept => dept.orders);

  return (
    <div className="relative w-full min-h-screen bg-[#4D236E]">
      {/* Sidebar */}
      <AdminRetractableSidebar activePage="settings" />
      
      {/* Main Content Area */}
      <div className="pl-[76px] min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-[#3c044d] border-b border-white/10 px-6 py-4">
          <h1 className="font-['Poppins:Bold',sans-serif] text-[24px] text-white leading-normal flex items-center gap-3">
            <span className="w-[32px] h-[32px] flex-shrink-0 inline-block relative">
              <span className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 96">
                  <g>
                    <path d={SparkleDecorationPaths.p231aba80} fill="#B7C9FF" />
                  </g>
                </svg>
              </span>
            </span>
            SETTINGS
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-[#3c044d] rounded-lg border border-white/10">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white font-['Poppins',sans-serif] text-lg">Finished Orders History</h2>
                  <p className="text-white/60 text-sm font-['Poppins',sans-serif] mt-1">
                    {viewMode === 'table' ? `${finishedItems.length} completed items` : `${allOrders.length} orders`}
                  </p>
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-[#541168] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-2 rounded-md transition-all text-sm font-['Poppins',sans-serif] ${
                      viewMode === 'table'
                        ? 'bg-purple-600 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Table View
                  </button>
                  <button
                    onClick={() => setViewMode('receipt')}
                    className={`px-4 py-2 rounded-md transition-all text-sm font-['Poppins',sans-serif] flex items-center gap-2 ${
                      viewMode === 'receipt'
                        ? 'bg-purple-600 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Receipt className="w-4 h-4" />
                    Receipt View
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            {viewMode === 'table' ? (
              /* Table View */
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-3 text-left text-white/80 font-['Poppins',sans-serif] text-sm">Order ID</th>
                      <th className="px-6 py-3 text-left text-white/80 font-['Poppins',sans-serif] text-sm">Item Name</th>
                      <th className="px-6 py-3 text-left text-white/80 font-['Poppins',sans-serif] text-sm">Department</th>
                      <th className="px-6 py-3 text-left text-white/80 font-['Poppins',sans-serif] text-sm">Finished At</th>
                      <th className="px-6 py-3 text-left text-white/80 font-['Poppins',sans-serif] text-sm">Waiter</th>
                      <th className="px-6 py-3 text-left text-white/80 font-['Poppins',sans-serif] text-sm">Delivered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finishedItems.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-white/60 font-['Poppins',sans-serif] text-sm">
                          No finished items yet
                        </td>
                      </tr>
                    ) : (
                      finishedItems.map((item, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white font-['Poppins',sans-serif] text-sm">{item.orderId}</td>
                          <td className="px-6 py-4 text-white font-['Poppins',sans-serif] text-sm">{item.itemName}</td>
                          <td className="px-6 py-4 text-white font-['Poppins',sans-serif] text-sm capitalize">{item.department}</td>
                          <td className="px-6 py-4 text-white/80 font-['Poppins',sans-serif] text-sm">{item.finishedAt}</td>
                          <td className="px-6 py-4 text-white/80 font-['Poppins',sans-serif] text-sm">{item.waiter}</td>
                          <td className="px-6 py-4 text-white/80 font-['Poppins',sans-serif] text-sm">{item.deliveredAt}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Receipt View */
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allOrders.length === 0 ? (
                  <div className="col-span-full text-center text-white/60 font-['Poppins',sans-serif] text-sm py-8">
                    No orders yet
                  </div>
                ) : (
                  allOrders.map((order) => (
                    <div key={order.orderId} className="bg-[#541168] border border-purple-400/20 rounded-lg p-4">
                      {/* Order Header */}
                      <div className="border-b border-white/10 pb-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-['Poppins',sans-serif]">
                            {order.orderId}
                          </h3>
                          <span className="text-xs text-white/60 font-['Poppins',sans-serif] capitalize">
                            {order.items[0]?.name ? 
                              allDepartments.find(d => d.orders.includes(order))?.department 
                              : 'Unknown'}
                          </span>
                        </div>
                        {order.assignedWaiter && (
                          <p className="text-white/80 text-sm font-['Poppins',sans-serif]">
                            Waiter: {order.assignedWaiter}
                          </p>
                        )}
                        {order.deliveredAt && (
                          <p className="text-green-400 text-xs font-['Poppins',sans-serif] mt-1">
                            Delivered: {order.deliveredAt}
                          </p>
                        )}
                      </div>

                      {/* Items List */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-white text-sm font-['Poppins',sans-serif]">
                              {item.name}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded font-['Poppins',sans-serif] ${
                              item.status === 'finished' 
                                ? 'bg-green-400/20 text-green-400'
                                : item.status === 'on-their-way'
                                ? 'bg-blue-400/20 text-blue-400'
                                : 'bg-white/10 text-white/60'
                            }`}>
                              {item.status === 'finished' ? 'Done' : 
                               item.status === 'on-their-way' ? 'Cooking' : 'Pending'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}