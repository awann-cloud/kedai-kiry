import React from "react";
import type { Order } from "../data/makananOrders";

interface DepartmentOrders {
  department: string;
  orders: Order[];
}

interface AdminRawDatabaseViewReceiptProps {
  allDepartments: DepartmentOrders[];
  allOrders: Order[];
  receiptViewMode: "table" | "card";
}

export function AdminRawDatabaseViewReceipt({
  allDepartments,
  allOrders,
  receiptViewMode,
}: AdminRawDatabaseViewReceiptProps) {
  if (allOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60 font-['Poppins',sans-serif] text-lg">No orders found</p>
      </div>
    );
  }

  if (receiptViewMode === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-[#541168] border border-purple-400/20 rounded-lg p-4"
          >
            {/* Order Header */}
            <div className="border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-white font-['Poppins',sans-serif]">{order.name}</h3>
                  <p className="text-white/70 font-['Poppins',sans-serif] text-sm">{order.orderId}</p>
                </div>
                <span className="text-xs text-white/60 font-['Poppins',sans-serif] capitalize">
                  {order.items[0]?.name
                    ? allDepartments.find((d) => d.orders.includes(order))?.department
                    : "Unknown"}
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
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-['Poppins',sans-serif] ${
                      item.status === "finished"
                        ? "bg-green-400/20 text-green-400"
                        : item.status === "on-their-way"
                        ? "bg-blue-400/20 text-blue-400"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {item.status === "finished"
                      ? "Done"
                      : item.status === "on-their-way"
                      ? "Cooking"
                      : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Table View
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">#</th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Nama Order
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Department
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Waiter
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Items
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Status
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Delivered
            </th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order, index) => {
            const department =
              allDepartments.find((d) => d.orders.includes(order))?.department || "Unknown";
            const allFinished = order.items.every((item) => item.status === "finished");
            const anyInProgress = order.items.some((item) => item.status === "on-their-way");
            const orderStatus = allFinished
              ? "Completed"
              : anyInProgress
              ? "In Progress"
              : "Pending";

            return (
              <tr key={order.orderId} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                  {index + 1}
                </td>
                <td className="py-3 px-2 text-white font-['Poppins',sans-serif] font-medium">
                  {order.name}
                </td>
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                    {department}
                  </span>
                </td>
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-white/60">Waiters:</div>
                    <div className="text-sm">
                      {(() => {
                        const uniqueWaiters = Array.from(
                          new Set(
                            order.items
                              .map((item) => item.waiter)
                              .filter((w) => w)
                          )
                        );
                        return uniqueWaiters.length > 0
                          ? uniqueWaiters.join(", ")
                          : "-";
                      })()}
                    </div>
                    <div className="text-xs text-white/60 mt-1">Cooks:</div>
                    <div className="text-sm">
                      {(() => {
                        const uniqueCooks = Array.from(
                          new Set(
                            order.items
                              .map((item) => item.staff)
                              .filter((s) => s)
                          )
                        );
                        return uniqueCooks.length > 0
                          ? uniqueCooks.join(", ")
                          : "-";
                      })()}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex flex-col gap-1">
                    {order.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-white/80 text-sm font-['Poppins',sans-serif]"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] ${
                      orderStatus === "Completed"
                        ? "bg-green-400/20 text-green-400"
                        : orderStatus === "In Progress"
                        ? "bg-blue-400/20 text-blue-400"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {orderStatus}
                  </span>
                </td>
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                  {order.deliveredAt ? (
                    <span className="text-green-400">{order.deliveredAt}</span>
                  ) : (
                    <span className="text-white/40">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
