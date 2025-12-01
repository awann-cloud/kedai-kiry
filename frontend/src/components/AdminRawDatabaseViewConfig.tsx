import React from "react";
import { BarChart3, AlertTriangle } from "lucide-react";
import type { SavedEfficiencyConfig } from "../data/menuItemEfficiency";

interface AdminRawDatabaseViewConfigProps {
  savedConfigs: SavedEfficiencyConfig[];
}

export function AdminRawDatabaseViewConfig({
  savedConfigs,
}: AdminRawDatabaseViewConfigProps) {
  return (
    <div className="overflow-x-auto">
      <h3 className="text-white font-['Poppins',sans-serif] mb-4 flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        Saved Configurations
      </h3>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">#</th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Config Name
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Department
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Data Source
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Standard
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Very Fast
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Fast
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Slow
            </th>
            <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
              Extremely Slow
            </th>
          </tr>
        </thead>
        <tbody>
          {savedConfigs.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="py-8 text-center text-white/60 font-['Poppins',sans-serif]"
              >
                No custom configurations saved yet. Configure items in Menu Management.
              </td>
            </tr>
          ) : (
            savedConfigs.map((config, index) => {
              const standardPreset = config.presets.find((p) => p.name === "standard");
              const veryFastPreset = config.presets.find((p) => p.name === "very-fast");
              const fastPreset = config.presets.find((p) => p.name === "fast");
              const slowPreset = config.presets.find((p) => p.name === "slow");
              const extremelySlowPreset = config.presets.find((p) => p.name === "extremely-slow");

              return (
                <tr key={config.name} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                    {index + 1}
                  </td>
                  <td className="py-3 px-2 text-white font-['Poppins',sans-serif] font-medium">
                    {config.name}
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                      {config.department}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm font-['Poppins',sans-serif]">
                    {config.dataSource ? (
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-white/80">
                          {config.dataSource.sampleCount} log
                          {config.dataSource.sampleCount > 1 ? "s" : ""}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-yellow-400">Default</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                    {standardPreset && (
                      <span className="font-medium">
                        {standardPreset.value}
                        {standardPreset.unit}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                    {veryFastPreset && `${veryFastPreset.value}${veryFastPreset.unit}`}
                  </td>
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                    {fastPreset && `${fastPreset.value}${fastPreset.unit}`}
                  </td>
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                    {slowPreset && `${slowPreset.value}${slowPreset.unit}`}
                  </td>
                  <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                    {extremelySlowPreset &&
                      `${extremelySlowPreset.value}${extremelySlowPreset.unit}`}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
