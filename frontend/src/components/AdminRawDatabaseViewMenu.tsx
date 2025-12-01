import React from "react";
import type { CookingLog } from "../contexts/StaffContext";

interface AdminRawDatabaseViewMenuProps {
  processedLogs: CookingLog[];
  currentPage: number;
  itemsPerPage: number;
  onNavigate: (path: string) => void;
}

export function AdminRawDatabaseViewMenu({
  processedLogs,
  currentPage,
  itemsPerPage,
  onNavigate,
}: AdminRawDatabaseViewMenuProps) {
  // Group logs by menu item
  const menuGroups = processedLogs.reduce((acc, log) => {
    if (!acc[log.menuName]) {
      acc[log.menuName] = {
        menuName: log.menuName,
        department: log.department,
        logs: [],
      };
    }
    acc[log.menuName].logs.push(log);
    return acc;
  }, {} as Record<string, { menuName: string; department: string; logs: typeof processedLogs }>);

  // Calculate time period averages for each menu item
  const menuStats = Object.values(menuGroups).map((group) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - now.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayLogs = group.logs.filter((l) => new Date(l.timestamp) >= todayStart);
    const yesterdayLogs = group.logs.filter((l) => {
      const d = new Date(l.timestamp);
      return d >= yesterdayStart && d < todayStart;
    });
    const weekLogs = group.logs.filter((l) => new Date(l.timestamp) >= weekStart);
    const monthLogs = group.logs.filter((l) => new Date(l.timestamp) >= monthStart);
    const allTimeLogs = group.logs;

    const calcAvg = (logs: typeof processedLogs) => {
      if (logs.length === 0) return null;
      const sum = logs.reduce((s, l) => s + l.totalSeconds, 0);
      return sum / logs.length;
    };

    // Get standard time from first log's average
    const standard = group.logs[0]?.averageSeconds || 0;

    return {
      menuName: group.menuName,
      department: group.department,
      totalCooks: allTimeLogs.length,
      standard,
      avgAllTime: calcAvg(allTimeLogs),
      avgMonth: calcAvg(monthLogs),
      avgWeek: calcAvg(weekLogs),
      avgYesterday: calcAvg(yesterdayLogs),
      avgToday: calcAvg(todayLogs),
      countToday: todayLogs.length,
      countYesterday: yesterdayLogs.length,
      countWeek: weekLogs.length,
      countMonth: monthLogs.length,
    };
  });

  // Sort by menu name
  menuStats.sort((a, b) => a.menuName.localeCompare(b.menuName));

  // Pagination for menu stats
  const menuStartIndex = (currentPage - 1) * itemsPerPage;
  const menuEndIndex = menuStartIndex + itemsPerPage;
  const paginatedMenuStats = menuStats.slice(menuStartIndex, menuEndIndex);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "-";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const getTrendColor = (avg: number | null, baseline: number | null) => {
    if (avg === null) return "text-white/40";
    if (baseline === null) return "text-white";
    const diff = Math.abs(avg - baseline);
    // Consider "same" if within 5 seconds difference
    if (diff <= 5) return "text-white";
    // Green if faster (lower time), red if slower (higher time)
    return avg < baseline ? "text-green-400" : "text-red-400";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              #
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Menu Item
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Department
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Standard
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              <div className="flex flex-col">
                <span>Avg All Time</span>
                <span className="text-white/60 text-xs font-normal">Total Cooks</span>
              </div>
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              <div className="flex flex-col">
                <span>Avg This Month</span>
                <span className="text-white/60 text-xs font-normal">Count</span>
              </div>
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              <div className="flex flex-col">
                <span>Avg This Week</span>
                <span className="text-white/60 text-xs font-normal">Count</span>
              </div>
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              <div className="flex flex-col">
                <span>Avg Yesterday</span>
                <span className="text-white/60 text-xs font-normal">Count</span>
              </div>
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              <div className="flex flex-col">
                <span>Avg Today</span>
                <span className="text-white/60 text-xs font-normal">Count</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedMenuStats.map((stat, index) => {
            return (
              <tr
                key={stat.menuName}
                onClick={() =>
                  onNavigate(`/menu-management?item=${encodeURIComponent(stat.menuName)}`)
                }
                className="border-b border-white/10 hover:bg-purple-600/20 cursor-pointer transition-colors"
              >
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                  {menuStartIndex + index + 1}
                </td>
                <td className="py-3 px-2 text-white font-['Poppins',sans-serif] font-medium">
                  {stat.menuName}
                </td>
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                    {stat.department}
                  </span>
                </td>
                <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                  <span className="font-medium">{formatTime(stat.standard)}</span>
                </td>
                <td className="py-3 px-2 font-['Poppins',sans-serif]">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{formatTime(stat.avgAllTime)}</span>
                    <span className="text-white/60 text-xs">{stat.totalCooks} cooks</span>
                  </div>
                </td>
                <td className="py-3 px-2 font-['Poppins',sans-serif]">
                  <div className="flex flex-col">
                    <span className={`font-medium ${getTrendColor(stat.avgMonth, stat.avgAllTime)}`}>
                      {formatTime(stat.avgMonth)}
                    </span>
                    <span className="text-white/60 text-xs">{stat.countMonth} cooks</span>
                  </div>
                </td>
                <td className="py-3 px-2 font-['Poppins',sans-serif]">
                  <div className="flex flex-col">
                    <span className={`font-medium ${getTrendColor(stat.avgWeek, stat.avgAllTime)}`}>
                      {formatTime(stat.avgWeek)}
                    </span>
                    <span className="text-white/60 text-xs">{stat.countWeek} cooks</span>
                  </div>
                </td>
                <td className="py-3 px-2 font-['Poppins',sans-serif]">
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${getTrendColor(stat.avgYesterday, stat.avgAllTime)}`}
                    >
                      {formatTime(stat.avgYesterday)}
                    </span>
                    <span className="text-white/60 text-xs">{stat.countYesterday} cooks</span>
                  </div>
                </td>
                <td className="py-3 px-2 font-['Poppins',sans-serif]">
                  <div className="flex flex-col">
                    <span className={`font-medium ${getTrendColor(stat.avgToday, stat.avgAllTime)}`}>
                      {formatTime(stat.avgToday)}
                    </span>
                    <span className="text-white/60 text-xs">{stat.countToday} cooks</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
