import React, { useState, useMemo, useEffect } from 'react';
import { AdminRetractableSidebar } from './components/AdminRetractableSidebar';
import { useStaff } from './contexts/StaffContext';
import { Pencil, Trash2, Plus, UserCheck, UserX, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import AddEditStaffModal from './components/AddEditStaffModal';
import StaffDetailView from './components/StaffDetailView';
import { KITCHEN_STAFF, BAR_STAFF, SNACK_STAFF, WAITSTAFF, Worker } from './data/staff';
import { getPinForDepartment } from './data/pinCodes';
import { WeeklySchedule } from './contexts/StaffContext';
import { isStaffActiveBySchedule } from './utils/scheduleUtils';
import SparkleDecorationPaths from "./imports/SparkleDecoration";
import { imgGroup as sparkleImgGroup } from "./imports/SparkleIconMask";

interface StaffMember {
  id: string;
  name: string;
  department: 'Kitchen' | 'Bar' | 'Snack' | 'Checker';
  pin: string;
  isActive: boolean;
  gender?: 'Male' | 'Female';
  joinDate?: string;
  position?: string;
  schedule?: WeeklySchedule;
  notes?: string;
}

// Convert Worker objects to StaffMember format
const convertWorkerToStaffMember = (worker: Worker, pin: string): StaffMember => {
  let department: 'Kitchen' | 'Bar' | 'Snack' | 'Checker';
  
  switch (worker.department) {
    case 'kitchen':
      department = 'Kitchen';
      break;
    case 'bar':
      department = 'Bar';
      break;
    case 'snack':
      department = 'Snack';
      break;
    case 'waitress':
      department = 'Checker';
      break;
    default:
      department = 'Kitchen';
  }

  return {
    id: worker.id,
    name: worker.name,
    department,
    pin,
    isActive: worker.available,
    position: worker.position,
    // Mock additional data for display purposes
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    joinDate: '2024-01-15',
  };
};

// Initialize staff list from data files
const initializeStaffList = (): StaffMember[] => {
  const allStaff: StaffMember[] = [];
  
  // Add kitchen staff
  KITCHEN_STAFF.forEach(worker => {
    allStaff.push(convertWorkerToStaffMember(worker, getPinForDepartment('kitchen')));
  });
  
  // Add bar staff
  BAR_STAFF.forEach(worker => {
    allStaff.push(convertWorkerToStaffMember(worker, getPinForDepartment('bar')));
  });
  
  // Add snack staff
  SNACK_STAFF.forEach(worker => {
    allStaff.push(convertWorkerToStaffMember(worker, getPinForDepartment('snack')));
  });
  
  // Add waitstaff
  WAITSTAFF.forEach(worker => {
    allStaff.push(convertWorkerToStaffMember(worker, getPinForDepartment('checker')));
  });
  
  return allStaff;
};

const POSITION_COLORS = {
  Kitchen: '#FB923C',
  Bar: '#FBBF24',
  Snack: '#2DD4BF',
  Checker: '#A78BFA'
};

export default function AdminStaffManagement() {
  const { staff, updateStaffAvailability } = useStaff();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  
  // Initialize staff list from localStorage or default data
  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    const savedStaffList = localStorage.getItem('staffManagementList');
    if (savedStaffList) {
      try {
        return JSON.parse(savedStaffList);
      } catch (e) {
        console.error('Failed to parse saved staff list:', e);
      }
    }
    return initializeStaffList();
  });
  
  // Save staff list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('staffManagementList', JSON.stringify(staffList));
  }, [staffList]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Staff detail view state
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Calculate statistics
  const positionStats = useMemo(() => {
    const stats = staffList.reduce((acc, member) => {
      acc[member.department] = (acc[member.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).map(([name, value]) => ({
      name,
      value,
      color: POSITION_COLORS[name as keyof typeof POSITION_COLORS]
    }));
  }, [staffList]);

  const genderStats = useMemo(() => {
    const male = staffList.filter(s => s.gender === 'Male').length;
    const female = staffList.filter(s => s.gender === 'Female').length;
    return [
      { name: 'Male', value: male, color: '#FB923C' },
      { name: 'Female', value: female, color: '#A78BFA' }
    ];
  }, [staffList]);

  const activeStaffToday = useMemo(() => {
    return staffList.filter(s => isStaffActiveBySchedule(s.schedule)).length;
  }, [staffList]);

  const performanceData = useMemo(() => {
    return [
      { name: 'Mon', Kitchen: 85, Bar: 78, Snack: 92, Checker: 88 },
      { name: 'Tue', Kitchen: 78, Bar: 88, Snack: 85, Checker: 90 },
      { name: 'Wed', Kitchen: 95, Bar: 82, Snack: 78, Checker: 85 },
      { name: 'Thu', Kitchen: 88, Bar: 95, Snack: 90, Checker: 92 }
    ];
  }, []);

  const handleAddStaff = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleEditStaff = (staff: StaffMember) => {
    setEditingStaff(staff);
    setIsModalOpen(true);
  };

  const handleDeleteStaff = (id: string) => {
    setStaffToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (staffToDelete) {
      setStaffList(prev => prev.filter(s => s.id !== staffToDelete));
      setDeleteConfirmOpen(false);
      setStaffToDelete(null);
    }
  };

  const handleToggleActive = (id: string) => {
    const targetStaff = staffList.find(s => s.id === id);
    if (targetStaff) {
      // Update context staff availability
      updateStaffAvailability(id, !targetStaff.isActive);
    }
    
    setStaffList(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
    // Update selected staff if it's the one being toggled
    if (selectedStaff && selectedStaff.id === id) {
      setSelectedStaff(prev => prev ? { ...prev, isActive: !prev.isActive } : null);
    }
  };

  const handleSaveStaff = (staff: StaffMember) => {
    if (editingStaff) {
      setStaffList(prev => prev.map(s => s.id === staff.id ? staff : s));
    } else {
      // Generate ID based on department prefix
      const departmentPrefix = {
        'Kitchen': 'k',
        'Bar': 'b',
        'Snack': 's',
        'Checker': 'w'
      }[staff.department];
      
      // Find highest number for this department prefix
      const existingIdsForDepartment = staffList
        .filter(s => s.id.startsWith(departmentPrefix))
        .map(s => {
          const match = s.id.match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        })
        .filter(n => !isNaN(n));
      
      const maxId = existingIdsForDepartment.length > 0 ? Math.max(...existingIdsForDepartment) : 0;
      const newId = `${departmentPrefix}${maxId + 1}`;
      setStaffList(prev => [...prev, { ...staff, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleScheduleUpdate = (staffId: string, schedule: WeeklySchedule) => {
    setStaffList(prev => prev.map(s => 
      s.id === staffId ? { ...s, schedule, isActive: isStaffActiveBySchedule(schedule) } : s
    ));
    // Close and reopen detail view to reflect changes
    const updatedStaff = staffList.find(s => s.id === staffId);
    if (updatedStaff) {
      setSelectedStaff({ ...updatedStaff, schedule, isActive: isStaffActiveBySchedule(schedule) });
    }
  };

  const handleNotesUpdate = (staffId: string, notes: string) => {
    setStaffList(prev => prev.map(s => 
      s.id === staffId ? { ...s, notes } : s
    ));
    // Update selected staff
    if (selectedStaff && selectedStaff.id === staffId) {
      setSelectedStaff(prev => prev ? { ...prev, notes } : null);
    }
  };

  // Auto-update active status based on schedule every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setStaffList(prev => prev.map(s => ({
        ...s,
        isActive: s.schedule ? isStaffActiveBySchedule(s.schedule) : s.isActive
      })));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Filtered staff list
  const filteredStaffList = useMemo(() => {
    return staffList.filter(member => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.position && member.position.toLowerCase().includes(searchQuery.toLowerCase()));

      // Department filter
      const matchesDepartment = departmentFilter === 'All' || member.department === departmentFilter;

      // Status filter
      const matchesStatus = statusFilter === 'All' || 
        (statusFilter === 'Active' && member.isActive) ||
        (statusFilter === 'Inactive' && !member.isActive);

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [staffList, searchQuery, departmentFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-[#4a1e69]">
      <AdminRetractableSidebar activePage="staff" />
      
      {/* Main Content */}
      <div className="ml-[76px] p-6">
        {/* Header */}
        <div className="bg-[#3c044d] rounded-[10px] px-6 py-4 mb-6 flex items-center justify-between">
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
            DATA PEGAWAI
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>Home</span>
            <span>/</span>
            <span className="text-white">Staff</span>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="mb-6">
          <h2 className="text-white text-sm mb-4">Dashboard</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* Position Stats */}
            <div className="bg-[#3c044d] rounded-[10px] p-4">
              <h3 className="text-white/80 text-sm mb-3">Position</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16">
                  <PieChart width={64} height={64}>
                    <Pie
                      data={positionStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={30}
                      dataKey="value"
                    >
                      {positionStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                <div className="flex flex-col gap-1">
                  {positionStats.map((stat) => (
                    <div key={stat.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                      <span className="text-[#e9d4ff] text-xs">{stat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Number of Employees */}
            <div className="bg-[#3c044d] rounded-[10px] p-4">
              <h3 className="text-white/80 text-sm mb-3">Number of employees</h3>
              <div className="text-white text-5xl">{staffList.length}</div>
            </div>

            {/* Gender Stats */}
            <div className="bg-[#3c044d] rounded-[10px] p-4">
              <h3 className="text-white/80 text-sm mb-3">Gender</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16">
                  <PieChart width={64} height={64}>
                    <Pie
                      data={genderStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={30}
                      dataKey="value"
                    >
                      {genderStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                <div className="flex flex-col gap-1">
                  {genderStats.map((stat) => (
                    <div key={stat.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                      <span className="text-[#e9d4ff] text-xs">{stat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Today's Active Staff */}
            <div className="bg-[#3c044d] rounded-[10px] p-4">
              <h3 className="text-white/80 text-sm mb-3">Today's activities</h3>
              <div className="text-white text-5xl">{activeStaffToday}</div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-[#3c044d] rounded-[10px] p-6 mb-6">
          <h3 className="text-white text-sm mb-4">Total employee performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#3c044d', border: '1px solid rgba(255,255,255,0.2)' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="Kitchen" fill="#FB923C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Bar" fill="#FBBF24" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Snack" fill="#2DD4BF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Checker" fill="#A78BFA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Create Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddStaff}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-[10px] flex items-center gap-2 shadow-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-[#3c044d] rounded-[10px] p-4 mb-4">
          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, or position..."
              className="w-full bg-[#541168] text-white pl-10 pr-4 py-2.5 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 transition-colors placeholder-white/40"
            />
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-4">
            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/70" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-[#541168] text-white px-4 py-2.5 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 transition-colors"
              >
                <option value="All">All Departments</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Bar">Bar</option>
                <option value="Snack">Snack</option>
                <option value="Checker">Checker</option>
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#541168] text-white px-4 py-2.5 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 transition-colors"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Results Count */}
            <div className="text-white/70 text-sm whitespace-nowrap ml-auto">
              {filteredStaffList.length} of {staffList.length} staff
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-[#3c044d] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-white text-left px-6 py-4 text-sm">ID</th>
                <th className="text-white text-left px-6 py-4 text-sm">Nama</th>
                <th className="text-white text-left px-6 py-4 text-sm">Position</th>
                <th className="text-white text-left px-6 py-4 text-sm">Status</th>
                <th className="text-white text-right px-6 py-4 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaffList.map((member, index) => (
                <tr 
                  key={member.id} 
                  onClick={() => setSelectedStaff(member)}
                  className={`cursor-pointer hover:bg-purple-600/20 transition-colors ${index !== filteredStaffList.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <td className="text-white px-6 py-4 text-sm">{member.id}</td>
                  <td className="text-white px-6 py-4 text-sm">{member.name}</td>
                  <td className="text-white px-6 py-4 text-sm">{member.department}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleActive(member.id);
                      }}
                      className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
                        member.isActive 
                          ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
                          : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                      }`}
                    >
                      {member.isActive ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          Active
                        </>
                      ) : (
                        <>
                          <UserX className="w-4 h-4" />
                          Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStaff(member);
                        }}
                        className="bg-[#541168] hover:bg-[#6b1583] text-white px-4 py-1.5 rounded-[10px] text-sm shadow transition-colors"
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddEditStaffModal
          staff={editingStaff}
          onSave={handleSaveStaff}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Staff Detail View */}
      {selectedStaff && (
        <StaffDetailView
          staffId={selectedStaff.id}
          staffName={selectedStaff.name}
          staffDepartment={selectedStaff.department}
          staffPosition={selectedStaff.position || selectedStaff.department}
          isActive={selectedStaff.isActive}
          schedule={selectedStaff.schedule}
          notes={selectedStaff.notes}
          onClose={() => setSelectedStaff(null)}
          onScheduleUpdate={handleScheduleUpdate}
          onNotesUpdate={handleNotesUpdate}
          onToggleActive={() => handleToggleActive(selectedStaff.id)}
          onEdit={() => {
            handleEditStaff(selectedStaff);
            setSelectedStaff(null);
          }}
          onDelete={() => {
            handleDeleteStaff(selectedStaff.id);
            setSelectedStaff(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center">
          <div className="bg-[#3c044d] rounded-[10px] p-6 max-w-md w-full mx-4">
            <h2 className="text-white text-xl mb-4">Are you sure?</h2>
            <p className="text-white/80 mb-6">This action cannot be undone. This will permanently delete the staff member from the system.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="bg-[#541168] hover:bg-[#6b1583] text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}