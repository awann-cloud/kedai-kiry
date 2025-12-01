import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminRetractableSidebar } from './components/AdminRetractableSidebar';
import { Search, Plus, RotateCcw, Save, RefreshCw, Check, MoreVertical, XCircle, CheckCircle, Loader2, AlertCircle, Pen, Trash2 } from 'lucide-react';
import { discoverAllMenuItems, type DiscoveredMenuItem } from './data/menuItemsUtils';
import {
  type MenuItemConfig,
  type TimePreset,
  loadSavedConfigs,
  saveConfigs,
  getConfigForItem,
  calculateDefaultPresets,
  getDefaultStandardTime
} from './data/menuItemEfficiency';
import SparkleDecorationPaths from "./imports/SparkleDecoration";
import { imgGroup as sparkleImgGroup } from "./imports/SparkleIconMask";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { MenuItemEditDialog } from './components/admin/MenuItemEditDialog';
import { MenuItemDeleteDialog } from './components/admin/MenuItemDeleteDialog';

export default function AdminMenuManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [discoveredItems] = useState<DiscoveredMenuItem[]>(discoverAllMenuItems());
  
  // Dialog states for cosmetic edit/delete
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<{ name: string; category: "Kitchen" | "Bar" | "Snack" } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  // Saved configs from localStorage
  const [savedConfigs, setSavedConfigs] = useState<Map<string, MenuItemConfig>>(() => {
    return loadSavedConfigs();
  });
  
  // Working/draft configs (what user is currently editing)
  const [workingConfigs, setWorkingConfigs] = useState<Map<string, MenuItemConfig>>(new Map());
  
  // Check URL params for item selection
  const urlItemParam = searchParams.get('item');
  const initialItem = urlItemParam && discoveredItems.find(i => i.name === urlItemParam)
    ? urlItemParam
    : (discoveredItems.length > 0 ? discoveredItems[0].name : null);
  
  const [selectedItemName, setSelectedItemName] = useState<string | null>(initialItem);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'kitchen' | 'bar' | 'snack'>('all');
  const [resetButtonState, setResetButtonState] = useState<'default' | 'loading' | 'success'>('default');
  const [saveButtonState, setSaveButtonState] = useState<'default' | 'saving' | 'success'>('default');
  const [validationErrors, setValidationErrors] = useState<Map<string, Map<string, string>>>(new Map());

  // Handle URL parameter changes
  useEffect(() => {
    const itemParam = searchParams.get('item');
    if (itemParam && discoveredItems.find(i => i.name === itemParam)) {
      setSelectedItemName(itemParam);
      // Clear the URL parameter after selecting
      setSearchParams({});
    }
  }, [searchParams, discoveredItems, setSearchParams]);

  // Get current config for selected item (working or saved)
  const getSelectedConfig = (): MenuItemConfig | null => {
    if (!selectedItemName) return null;
    const item = discoveredItems.find(i => i.name === selectedItemName);
    if (!item) return null;

    // Check working configs first (unsaved changes)
    if (workingConfigs.has(selectedItemName)) {
      return workingConfigs.get(selectedItemName)!;
    }
    
    // Then check saved configs
    if (savedConfigs.has(selectedItemName)) {
      return savedConfigs.get(selectedItemName)!;
    }
    
    // Fall back to default
    return getConfigForItem(selectedItemName, item.department);
  };

  const selectedConfig = getSelectedConfig();

  // Check if there are unsaved changes for the current item
  const hasUnsavedChanges = selectedItemName ? workingConfigs.has(selectedItemName) : false;

  // Get validation errors for the current item
  const currentItemErrors = selectedItemName && validationErrors.has(selectedItemName) 
    ? validationErrors.get(selectedItemName)! 
    : new Map<string, string>();

  // Filter items by search and category
  const filteredItems = discoveredItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.department === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Validate preset order and return validation info
  const validatePresets = (presets: TimePreset[]): { isValid: boolean; errors: Map<string, string>; message: string } => {
    const errors = new Map<string, string>();
    let message = '';
    
    // Check for empty or invalid values first
    for (const preset of presets) {
      if (preset.value <= 0 || isNaN(preset.value)) {
        errors.set(preset.name, 'Value cannot be empty or zero');
        message = `${preset.label} cannot be empty or zero. Please enter a valid positive number.`;
      }
    }
    
    // If there are empty/invalid values, don't check hierarchy
    if (errors.size > 0) {
      return { isValid: false, errors, message };
    }
    
    // Convert all presets to seconds for comparison
    const presetsInSeconds = presets.map(preset => ({
      name: preset.name,
      label: preset.label.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim(),
      value: preset.value,
      unit: preset.unit,
      seconds: preset.unit === 'min' ? preset.value * 60 : preset.value
    }));

    // Check that each level is <= the next level
    for (let i = 0; i < presetsInSeconds.length - 1; i++) {
      if (presetsInSeconds[i].seconds > presetsInSeconds[i + 1].seconds) {
        const current = presetsInSeconds[i];
        const next = presetsInSeconds[i + 1];
        
        errors.set(current.name, `Must be <= ${next.label} (${next.value}${next.unit})`);
        errors.set(next.name, `Must be >= ${current.label} (${current.value}${current.unit})`);
        
        message = `${current.label} (${Math.round(current.seconds)}s) cannot exceed ${next.label} (${Math.round(next.seconds)}s). Required order: Very Fast <= Fast <= Standard <= Slow <= Extremely Slow`;
      }
    }
    
    return {
      isValid: errors.size === 0,
      errors,
      message
    };
  };

  const handleUpdatePreset = (presetName: string, value: number, unit: 'sec' | 'min') => {
    if (!selectedConfig) return;

    const updatedConfig = {
      ...selectedConfig,
      presets: selectedConfig.presets.map((preset) =>
        preset.name === presetName ? { ...preset, value, unit } : preset
      ),
    };

    // Validate the updated presets
    const validation = validatePresets(updatedConfig.presets);
    setValidationErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.set(selectedConfig.name, validation.errors);
      return newErrors;
    });

    // Update working configs (not saved yet!)
    setWorkingConfigs(prev => {
      const newConfigs = new Map(prev);
      newConfigs.set(selectedConfig.name, updatedConfig);
      return newConfigs;
    });
    
    // Reset save button state when user makes changes
    setSaveButtonState('default');
  };

  const handleSave = () => {
    if (!selectedConfig || !hasUnsavedChanges) return;
    
    // Validate before saving
    const validation = validatePresets(selectedConfig.presets);
    if (!validation.isValid) {
      return; // Don't save if invalid
    }
    
    setSaveButtonState('saving');
    
    setTimeout(() => {
      // Move from working to saved configs
      setSavedConfigs(prev => {
        const newConfigs = new Map(prev);
        newConfigs.set(selectedConfig.name, selectedConfig);
        return newConfigs;
      });
      
      // Remove from working configs
      setWorkingConfigs(prev => {
        const newConfigs = new Map(prev);
        newConfigs.delete(selectedConfig.name);
        return newConfigs;
      });
      
      // Save to localStorage
      const newSavedConfigs = new Map(savedConfigs);
      newSavedConfigs.set(selectedConfig.name, selectedConfig);
      saveConfigs(newSavedConfigs);
      
      setSaveButtonState('success');
      
      setTimeout(() => setSaveButtonState('default'), 3000);
    }, 500);
  };

  const handleResetToDefault = () => {
    if (!selectedItemName) return;
    
    setValidationErrors(new Map());
    setResetButtonState('loading');
    
    setTimeout(() => {
      // Remove from both working and saved configs
      setWorkingConfigs(prev => {
        const newConfigs = new Map(prev);
        newConfigs.delete(selectedItemName);
        return newConfigs;
      });
      
      setSavedConfigs(prev => {
        const newConfigs = new Map(prev);
        newConfigs.delete(selectedItemName);
        return newConfigs;
      });
      
      // Save to localStorage
      const newSavedConfigs = new Map(savedConfigs);
      newSavedConfigs.delete(selectedItemName);
      saveConfigs(newSavedConfigs);
      
      setResetButtonState('success');
      
      setTimeout(() => setResetButtonState('default'), 3000);
    }, 1500);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  // Check if current config has errors
  const hasErrors = selectedConfig ? !validatePresets(selectedConfig.presets).isValid : false;
  const currentValidation = selectedConfig ? validatePresets(selectedConfig.presets) : { isValid: true, errors: new Map(), message: '' };

  return (
    <div className="min-h-screen bg-[#4D236E]">
      <AdminRetractableSidebar activePage="menu" />

      <div className="ml-[76px] flex flex-col h-screen">
        {/* Header with Search Bar */}
        <div className="bg-[#3c044d] border-b border-white/10">
          <div className="px-6 py-4 flex items-center justify-between">
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
              MENU MANAGEMENT
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items..."
                  className="w-[300px] bg-[#541168] text-white pl-9 pr-3 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 transition-colors placeholder-white/40 text-sm font-['Poppins',sans-serif]"
                />
              </div>

              <button
                onClick={handleRefresh}
                className="text-white/60 hover:text-white transition-colors p-2"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Menu Items */}
          <div className="w-[400px] bg-[#3c044d] border-r border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col gap-1">
                  <h2 className="text-white font-['Poppins',sans-serif]">Menu Items</h2>
                  <span className="text-white/50 text-xs font-['Poppins',sans-serif]">
                    {filteredItems.length} of {discoveredItems.length} items
                  </span>
                </div>
                <button 
                  className="w-8 h-8 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 hover:border-purple-400 rounded flex items-center justify-center transition-all"
                  onClick={() => {/* TODO: Add new item functionality */}}
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Department Filter */}
            <div className="bg-[rgba(60,4,77,0)] border-b border-white/10 px-3 py-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'kitchen' | 'bar' | 'snack')}
                className="w-full bg-[#541168] text-white px-4 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif] text-sm"
              >
                <option value="all">All Departments</option>
                <option value="kitchen">Kitchen</option>
                <option value="bar">Bar</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="text-center text-white/60 py-8 text-sm font-['Poppins',sans-serif]">
                  {searchQuery ? 'No items found' : 'No items yet'}
                </div>
              ) : (
                filteredItems.map((item) => {
                  const itemHasUnsavedChanges = workingConfigs.has(item.name);
                  
                  return (
                    <div
                      key={item.name}
                      className={`p-4 rounded-lg mb-1.5 transition-all min-h-[72px] flex flex-col justify-center ${
                        selectedItemName === item.name
                          ? 'bg-purple-600/30 border border-purple-400'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-white text-[15px] font-['Poppins',sans-serif] cursor-pointer flex-1"
                          onClick={() => setSelectedItemName(item.name)}
                        >
                          {item.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {itemHasUnsavedChanges && (
                            <span className="text-[10px] text-yellow-400 font-['Poppins',sans-serif] bg-yellow-400/10 px-1.5 py-0.5 rounded">
                              Unsaved
                            </span>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                                title="Menu"
                              >
                                <MoreVertical className="w-4 h-4 text-white/60 hover:text-white" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#3c044d] border-[#8b6dac] text-white">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setItemToEdit({ 
                                    name: item.name, 
                                    category: item.department.charAt(0).toUpperCase() + item.department.slice(1) as "Kitchen" | "Bar" | "Snack"
                                  });
                                  setEditDialogOpen(true);
                                }}
                                className="cursor-pointer hover:bg-white/10"
                              >
                                <Pen className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setItemToDelete(item.name);
                                  setDeleteDialogOpen(true);
                                }}
                                className="cursor-pointer text-red-400 hover:bg-red-400/10"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div 
                        className="flex items-center gap-2 mt-1 cursor-pointer"
                        onClick={() => setSelectedItemName(item.name)}
                      >
                        <span className="text-sm text-white/60 font-['Poppins',sans-serif] capitalize flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                          {item.department}
                        </span>
                        {savedConfigs.has(item.name) && (
                          <span className="text-[10px] text-green-400 font-['Poppins',sans-serif] bg-green-400/10 px-1.5 py-0.5 rounded">
                            Custom
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Main Panel - Preset Configuration */}
          <div className="flex-1 flex flex-col">
            {!selectedConfig ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-white/60 font-['Poppins',sans-serif]">
                  <p className="text-xl mb-2">No item selected</p>
                  <p className="text-sm">Select an item from the sidebar</p>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-[#3c044d] p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-white font-['Poppins:Bold',sans-serif] tracking-normal">
                        {selectedConfig.name}
                      </h1>
                      <p className="text-white/60 text-xs font-['Poppins',sans-serif] capitalize mt-0.5">
                        {selectedConfig.department} Department
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSave}
                        disabled={!hasUnsavedChanges || hasErrors || saveButtonState === 'saving'}
                        className={`${
                          saveButtonState === 'saving'
                            ? 'bg-purple-600/60 cursor-not-allowed'
                            : saveButtonState === 'success'
                            ? 'bg-purple-400 hover:bg-purple-500'
                            : !hasUnsavedChanges || hasErrors
                            ? 'bg-gray-600/50 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700'
                        } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-['Poppins',sans-serif]`}
                      >
                        {saveButtonState === 'saving' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : saveButtonState === 'success' ? (
                          <>
                            <Check className="w-4 h-4" />
                            Saved!
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Dynamic Error Explanation */}
                  {hasErrors && (
                    <div className="mt-3 bg-red-600/20 border border-red-400/30 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white text-sm font-['Poppins:Bold',sans-serif] mb-1">
                            Timing Hierarchy Error
                          </p>
                          <p className="text-white/90 text-xs font-['Poppins',sans-serif]">
                            {currentValidation.message}
                          </p>
                          <p className="text-white/70 text-xs font-['Poppins',sans-serif] mt-2">
                            Fix the fields with red borders below, then click Save.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Unsaved Changes Warning */}
                  {hasUnsavedChanges && !hasErrors && (
                    <div className="mt-3 bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white text-sm font-['Poppins:Bold',sans-serif] mb-1">
                            Unsaved Changes
                          </p>
                          <p className="text-white/90 text-xs font-['Poppins',sans-serif]">
                            You have unsaved changes. Click Save to persist them.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reset Button */}
                <div className="bg-[rgba(60,4,77,0)] border-b border-white/10 px-3 py-2">
                  <button
                    onClick={handleResetToDefault}
                    disabled={resetButtonState === 'loading'}
                    className={`${
                      resetButtonState === 'loading'
                        ? 'bg-[#4D236E]/60 cursor-not-allowed'
                        : resetButtonState === 'success'
                        ? 'bg-purple-400 hover:bg-purple-500'
                        : 'bg-[#4D236E] hover:bg-[#5e2d85]'
                    } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-['Poppins',sans-serif]`}
                  >
                    {resetButtonState === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading...
                      </>
                    ) : resetButtonState === 'success' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Data Resetted to Default!
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        Reset to Default
                      </>
                    )}
                  </button>
                </div>

                {/* Preset Configuration Cards */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="max-w-4xl space-y-1.5">
                    {selectedConfig.presets.map((preset) => (
                      <PresetCard
                        key={preset.name}
                        preset={preset}
                        onUpdate={handleUpdatePreset}
                        errorMessage={currentItemErrors.get(preset.name)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cosmetic Edit Dialog */}
      {itemToEdit && (
        <MenuItemEditDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          itemName={itemToEdit.name}
          currentCategory={itemToEdit.category}
        />
      )}

      {/* Cosmetic Delete Dialog */}
      {itemToDelete && (
        <MenuItemDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          itemName={itemToDelete}
        />
      )}
    </div>
  );
}

// Preset Card Component
interface PresetCardProps {
  preset: TimePreset;
  onUpdate: (presetName: string, value: number, unit: 'sec' | 'min') => void;
  errorMessage?: string;
}

function PresetCard({ preset, onUpdate, errorMessage }: PresetCardProps) {
  const [localValue, setLocalValue] = useState(preset.value.toString());
  const [localUnit, setLocalUnit] = useState(preset.unit);

  useEffect(() => {
    setLocalValue(preset.value.toString());
    setLocalUnit(preset.unit);
  }, [preset]);

  // Remove emojis from label
  const cleanLabel = preset.label.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();

  // Auto-calculate the converted value for display
  const getConvertedDisplay = () => {
    const value = parseFloat(localValue);
    if (isNaN(value) || value <= 0) {
      return localUnit === 'sec' ? '0 seconds' : '0 minutes (0 seconds)';
    }
    
    if (localUnit === 'sec') {
      const minutes = value / 60;
      return `${minutes.toFixed(1)} minutes (${Math.round(value)} seconds)`;
    } else {
      const seconds = value * 60;
      return `${value} minute${value !== 1 ? 's' : ''} (${Math.round(seconds)} seconds)`;
    }
  };

  const handleValueChange = (newValue: string) => {
    setLocalValue(newValue);
    const value = parseFloat(newValue);
    if (!isNaN(value) && value > 0) {
      onUpdate(preset.name, value, localUnit);
    }
  };

  const handleUnitChange = (newUnit: 'sec' | 'min') => {
    const currentValue = parseFloat(localValue);
    
    if (!isNaN(currentValue) && currentValue > 0) {
      let convertedValue: number;
      
      if (localUnit === 'min' && newUnit === 'sec') {
        convertedValue = currentValue * 60;
      } else if (localUnit === 'sec' && newUnit === 'min') {
        convertedValue = currentValue / 60;
      } else {
        convertedValue = currentValue;
      }
      
      setLocalUnit(newUnit);
      setLocalValue(convertedValue.toFixed(2));
      onUpdate(preset.name, convertedValue, newUnit);
    } else {
      setLocalUnit(newUnit);
    }
  };

  return (
    <div className={`bg-[#3c044d] rounded-lg p-4 border ${
      errorMessage ? 'border-red-500' : 'border-white/10'
    } transition-colors`}>
      <div className="flex items-center gap-6 min-h-[72px]">
        <div className="w-40">
          <h3 className="text-white font-['Poppins:Bold',sans-serif] tracking-normal">
            {cleanLabel}
          </h3>
          {errorMessage && (
            <p className="text-red-400 text-xs font-['Poppins',sans-serif] mt-1">
              {errorMessage}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-3 flex-1">
          <input
            type="number"
            value={localValue}
            onChange={(e) => handleValueChange(e.target.value)}
            step="0.1"
            min="0"
            className={`w-28 bg-[#541168] text-white px-4 py-2.5 rounded-lg border ${
              errorMessage
                ? 'border-red-500 focus:border-red-500'
                : 'border-purple-400/30 focus:border-purple-400'
            } focus:outline-none font-['Poppins',sans-serif]`}
          />
          <select
            value={localUnit}
            onChange={(e) => handleUnitChange(e.target.value as 'sec' | 'min')}
            className={`bg-[#541168] text-white px-3 py-2.5 rounded-lg border ${
              errorMessage
                ? 'border-red-500 focus:border-red-500'
                : 'border-purple-400/30 focus:border-purple-400'
            } focus:outline-none font-['Poppins',sans-serif]`}
          >
            <option value="sec">seconds</option>
            <option value="min">minutes</option>
          </select>
          
          <div className="text-white/60 text-sm font-['Poppins',sans-serif] ml-auto">
            {getConvertedDisplay()}
          </div>
        </div>
      </div>
    </div>
  );
}