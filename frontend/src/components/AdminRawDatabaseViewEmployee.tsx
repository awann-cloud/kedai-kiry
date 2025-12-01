import React from "react";
import type { CookingLog } from "../contexts/StaffContext";

interface AdminRawDatabaseViewEmployeeProps {
  paginatedLogs: CookingLog[];
  startIndex: number;
  getEfficiencyColor: (efficiency: string) => string;
  onNavigate: (path: string) => void;
}

export function AdminRawDatabaseViewEmployee({
  paginatedLogs,
  startIndex,
  getEfficiencyColor,
  onNavigate,
}: AdminRawDatabaseViewEmployeeProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              #
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Employee Name
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Category
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Department
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Date & Time
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Menu Item / Activity
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Time Taken
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Efficiency
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Performance
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.flatMap((log, index) => {
            const date = new Date(log.timestamp);
            const dateStr = date.toLocaleDateString("id-ID");
            const timeStr = date.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            });

            // Format started and finished times
            const startedStr = log.startedAt
              ? new Date(log.startedAt).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "-";
            const finishedStr = log.finishedAt
              ? new Date(log.finishedAt).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "-";

            const rows = [
              // Main row - Cook data
              <tr
                key={`${log.id}-main`}
                onClick={() =>
                  onNavigate(`/menu-management?item=${encodeURIComponent(log.menuName)}`)
                }
                className="border-b border-white/10 hover:bg-purple-600/20 cursor-pointer transition-colors"
              >
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                  {startIndex + index + 1}
                </td>
                <td className="py-3 px-2 text-white font-['Poppins',sans-serif] font-medium">
                  {log.cookName}
                </td>
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white">
                    Cook
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                    {log.department}
                  </span>
                </td>
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                  {dateStr}
                  <br />
                  <span className="text-white/60">{timeStr}</span>
                </td>
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                  <div className="font-medium text-white">{log.menuName}</div>
                  {(log.startedAt || log.finishedAt) && (
                    <div className="text-xs text-white/50 mt-1">
                      {log.startedAt && <div>Started: {startedStr}</div>}
                      {log.finishedAt && <div>Finished: {finishedStr}</div>}
                    </div>
                  )}
                </td>
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                  {log.timeMinutes}m {log.timeSeconds}s
                  <span className="text-white/40 text-xs ml-1">({log.totalSeconds}s)</span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] text-white ${getEfficiencyColor(log.efficiency)}`}
                  >
                    {log.efficiency}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-full h-2 max-w-[80px]">
                      <div
                        className={`h-2 rounded-full ${getEfficiencyColor(log.efficiency)}`}
                        style={{
                          width: `${Math.min(log.percentageOfAverage * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-white/80 font-['Poppins',sans-serif] text-sm">
                      {(log.percentageOfAverage * 100).toFixed(0)}%
                    </span>
                  </div>
                </td>
              </tr>,
            ];

            // Add checker/waiter row if waiter is assigned
            if (log.waiter) {
              // Calculate delivery time from waiter assignment to delivery completion
              let deliveryTimeStr = "-";
              let deliveryTimeSec = 0;
              let deliveryStartedStr = "-";
              let deliveryFinishedStr = "-";

              // Use deliveryElapsedTime if available (most accurate)
              if (log.deliveryElapsedTime !== undefined) {
                deliveryTimeSec = log.deliveryElapsedTime;
                const minutes = Math.floor(deliveryTimeSec / 60);
                const seconds = deliveryTimeSec % 60;
                deliveryTimeStr = `${minutes}m ${seconds}s`;
              }
              // Fallback: calculate from timestamps
              else if (log.deliveryStartTime && log.deliveryFinishedTime) {
                deliveryTimeSec = Math.floor(
                  (log.deliveryFinishedTime - log.deliveryStartTime) / 1000
                );
                const minutes = Math.floor(deliveryTimeSec / 60);
                const seconds = deliveryTimeSec % 60;
                deliveryTimeStr = `${minutes}m ${seconds}s`;
              }

              // Format delivery timestamps
              deliveryStartedStr = log.deliveryStartTime
                ? new Date(log.deliveryStartTime).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "-";
              deliveryFinishedStr = log.deliveryFinishedTime
                ? new Date(log.deliveryFinishedTime).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "-";

              rows.push(
                <tr
                  key={`${log.id}-checker`}
                  className="border-b border-white/10 bg-green-500/5 hover:bg-green-500/10 transition-colors"
                >
                  <td className="py-3 px-2 text-white/60 font-['Poppins',sans-serif] text-sm"></td>
                  <td className="py-3 px-2 text-green-400 font-['Poppins',sans-serif] font-medium">
                    {log.waiter}
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-green-600/40 text-white">
                      Waiter
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                      {log.department}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                    {dateStr}
                    <br />
                    <span className="text-white/60">{timeStr}</span>
                  </td>
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                    <div className="font-medium text-white">Delivering: {log.menuName}</div>
                    {(log.deliveryStartTime || log.deliveryFinishedTime) && (
                      <div className="text-xs text-white/50 mt-1">
                        {log.deliveryStartTime && <div>Started: {deliveryStartedStr}</div>}
                        {log.deliveryFinishedTime && <div>Finished: {deliveryFinishedStr}</div>}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                    {deliveryTimeStr}
                    {deliveryTimeSec > 0 && (
                      <span className="text-white/40 text-xs ml-1">({deliveryTimeSec}s)</span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] text-white/40">
                      -
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-white/40 text-sm font-['Poppins',sans-serif]">-</span>
                  </td>
                </tr>
              );
            }

            return rows;
          })}
        </tbody>
      </table>
    </div>
  );
}
