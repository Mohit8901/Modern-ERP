import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';
import { Package, TrendingUp, Users, DollarSign, ShoppingCart, Truck, CreditCard, FileText, CheckSquare, Target, Settings, LogOut, Menu, Plus, Search, ArrowUpRight, ArrowDownRight, Clock, AlertCircle, CheckCircle, Eye, EyeOff, LayoutDashboard, UserCog, Boxes, Send, Download, Edit, Trash2, Bell } from 'lucide-react';

// Mock data for Modern Tiles Uganda
const mockUsers = [
  { id: 'ADM001', password: 'admin123', name: 'Admin User', role: 'admin', avatar: 'A' },
  { id: 'MGR001', password: 'manager123', name: 'Mr. Amitosh', role: 'manager', avatar: 'J' },
  { id: 'SLS001', password: 'sales123', name: 'Mr. Yeshudas', role: 'sales', avatar: 'S' },
];

const salesData = [
  { month: 'Jan', sales: 42000000, target: 40000000 },
  { month: 'Feb', sales: 38000000, target: 42000000 },
  { month: 'Mar', sales: 55000000, target: 45000000 },
  { month: 'Apr', sales: 47000000, target: 48000000 },
  { month: 'May', sales: 62000000, target: 50000000 },
  { month: 'Jun', sales: 58000000, target: 55000000 },
];

const expenseCategories = [
  { name: 'Operations', value: 35, color: '#0891b2' },
  { name: 'Transport', value: 25, color: '#0e7490' },
  { name: 'Salaries', value: 30, color: '#06b6d4' },
  { name: 'Others', value: 10, color: '#22d3ee' },
];

const initialItems = [
  { code: 'TL001', name: 'Ceramic Floor Tile 60x60', category: 'Floor Tiles', price: 45000, stock: 2450, unit: 'sqm' },
  { code: 'TL002', name: 'Porcelain Wall Tile 30x60', category: 'Wall Tiles', price: 38000, stock: 1890, unit: 'sqm' },
  { code: 'TL003', name: 'Granite Tile Premium', category: 'Floor Tiles', price: 85000, stock: 560, unit: 'sqm' },
  { code: 'TL004', name: 'Mosaic Tile Mix', category: 'Decorative', price: 120000, stock: 340, unit: 'sqm' },
  { code: 'TL005', name: 'Outdoor Tile Anti-Slip', category: 'Outdoor', price: 55000, stock: 1200, unit: 'sqm' },
  { code: 'AD001', name: 'Tile Adhesive 25kg', category: 'Adhesives', price: 35000, stock: 890, unit: 'bags' },
  { code: 'GR001', name: 'Tile Grout White 5kg', category: 'Grout', price: 18000, stock: 650, unit: 'bags' },
];

const initialCustomers = [
  { id: 'CUS001', name: 'Kampala Builders Ltd', contact: 'info@kampalabuilders.ug', balance: 15000000, status: 'active' },
  { id: 'CUS002', name: 'Entebbe Contractors', contact: 'sales@entebbecon.co.ug', balance: -2500000, status: 'active' },
  { id: 'CUS003', name: 'Jinja Properties', contact: 'mike@jinjaprops.com', balance: 8750000, status: 'active' },
  { id: 'CUS004', name: 'Mbarara Construction', contact: 'info@mbararacon.ug', balance: 0, status: 'inactive' },
];

const initialTasks = [
  { id: 'TSK001', title: 'Complete Q2 Sales Report', assignee: 'Sarah Nakamya', priority: 'high', status: 'in-progress', due: '2024-03-15' },
  { id: 'TSK002', title: 'Client Site Visit - Kololo', assignee: 'John Okello', priority: 'medium', status: 'pending', due: '2024-03-12' },
  { id: 'TSK003', title: 'Stock Inventory Count', assignee: 'Sarah Nakamya', priority: 'low', status: 'completed', due: '2024-03-10' },
  { id: 'TSK004', title: 'Supplier Meeting - China Import', assignee: 'Admin User', priority: 'high', status: 'pending', due: '2024-03-18' },
];

const initialTargets = [
  { id: 'TGT001', title: 'Monthly Sales Target', assignee: 'Sarah Nakamya', target: 80000000, achieved: 62000000, unit: 'UGX', deadline: '2024-03-31' },
  { id: 'TGT002', title: 'New Customer Acquisition', assignee: 'John Okello', target: 15, achieved: 11, unit: 'customers', deadline: '2024-03-31' },
  { id: 'TGT003', title: 'Stock Clearance - Old Items', assignee: 'Admin User', target: 500, achieved: 375, unit: 'sqm', deadline: '2024-06-30' },
];

// Format Uganda Shillings
const formatUGX = (amount) => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M UGX`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K UGX`;
  }
  return `${amount.toLocaleString()} UGX`;
};

// Login Screen Component
const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!userId || !password) {
      setError('Please enter both User ID and Password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const user = mockUsers.find(u => u.id.toUpperCase() === userId.toUpperCase() && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c4a6e 0%, #164e63 50%, #155e75 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at 30% 40%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(14, 116, 144, 0.1) 0%, transparent 40%)'
      }} />
      
      <div style={{
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo/Brand */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)'
          }}>
            <Package size={40} color="white" />
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px'
          }}>Modern Tiles Uganda</h1>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px',
            margin: 0
          }}>Enterprise Resource Planning System</p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '36px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '22px',
            fontWeight: '600',
            margin: '0 0 6px 0'
          }}>Welcome back</h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            margin: '0 0 28px 0'
          }}>Sign in to access your dashboard</p>

          <div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Enter your User ID"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#06b6d4';
                  e.target.style.background = 'rgba(6, 182, 212, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 16px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#06b6d4';
                    e.target.style.background = 'rgba(6, 182, 212, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '10px',
                padding: '12px 14px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <AlertCircle size={18} color="#ef4444" />
                <span style={{ color: '#fca5a5', fontSize: '14px' }}>{error}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: isLoading 
                  ? 'rgba(6, 182, 212, 0.5)'
                  : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'wait' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          {/* Demo credentials */}
          <div style={{
            marginTop: '24px',
            padding: '14px',
            background: 'rgba(6, 182, 212, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(6, 182, 212, 0.2)'
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '11px',
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>Demo Credentials</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {mockUsers.map(u => (
                <div key={u.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  fontSize: '12px'
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize' }}>{u.role}:</span>
                  <span style={{ color: '#67e8f9', fontFamily: 'monospace' }}>{u.id} / {u.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '12px',
          marginTop: '24px'
        }}>
          © 2024 Modern Tiles Uganda. All rights reserved.
        </p>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeModule, setActiveModule, user, onLogout, collapsed, setCollapsed }) => {
  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales', icon: ShoppingCart },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
    { id: 'stock-transfer', label: 'Stock Transfer', icon: Send },
    { id: 'stock-received', label: 'Stock Received', icon: Download },
    { id: 'money-transfer', label: 'Money Transfer', icon: DollarSign },
    { id: 'customers', label: 'Customer Ledger', icon: Users },
    { id: 'tasks', label: 'Task Management', icon: CheckSquare },
    { id: 'targets', label: 'Targets', icon: Target },
  ];

  const adminModules = [
    { id: 'items', label: 'Item Master', icon: Boxes },
    { id: 'modules', label: 'Module Manager', icon: Settings },
    { id: 'users', label: 'User Management', icon: UserCog },
  ];

  const NavItem = ({ item }) => {
    const isActive = activeModule === item.id;
    const Icon = item.icon;
    
    return (
      <button
        type="button"
        onClick={() => setActiveModule(item.id)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: collapsed ? '12px' : '12px 16px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          background: isActive 
            ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(14, 116, 144, 0.15) 100%)'
            : 'transparent',
          border: 'none',
          borderRadius: '10px',
          color: isActive ? '#67e8f9' : 'rgba(255,255,255,0.6)',
          fontSize: '14px',
          fontWeight: isActive ? '600' : '500',
          cursor: 'pointer',
          transition: 'all 0.15s',
          borderLeft: isActive ? '3px solid #06b6d4' : '3px solid transparent',
          marginLeft: isActive ? '-3px' : '0'
        }}
        title={collapsed ? item.label : ''}
      >
        <Icon size={20} />
        {!collapsed && <span>{item.label}</span>}
      </button>
    );
  };

  return (
    <div style={{
      width: collapsed ? '72px' : '250px',
      background: 'linear-gradient(180deg, #0c4a6e 0%, #164e63 100%)',
      borderRight: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.2s ease',
      position: 'relative',
      zIndex: 10,
      flexShrink: 0
    }}>
      {/* Header */}
      <div style={{
        padding: collapsed ? '20px 12px' : '20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between'
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Package size={20} color="white" />
            </div>
            <div>
              <span style={{
                fontSize: '15px',
                fontWeight: '700',
                color: 'white',
                display: 'block',
                lineHeight: 1.2
              }}>Modern Tiles</span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Uganda</span>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {!collapsed && (
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            margin: '0 0 12px 4px'
          }}>Main Menu</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {modules.map(m => <NavItem key={m.id} item={m} />)}
        </div>

        {user.role === 'admin' && (
          <>
            {!collapsed && (
              <p style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '24px 0 12px 4px'
              }}>Admin</p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: collapsed ? '20px' : '0' }}>
              {adminModules.map(m => <NavItem key={m.id} item={m} />)}
            </div>
          </>
        )}
      </div>

      {/* User */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          justifyContent: collapsed ? 'center' : 'flex-start'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '16px',
            flexShrink: 0
          }}>
            {user.avatar}
          </div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: 'white', fontSize: '14px', fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0, textTransform: 'capitalize' }}>{user.role}</p>
              </div>
              <button
                type="button"
                onClick={onLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.06)'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
      <div style={{
        width: '44px',
        height: '44px',
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={22} color={color} />
      </div>
      {change && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          background: changeType === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          borderRadius: '20px'
        }}>
          {changeType === 'up' ? <ArrowUpRight size={14} color="#22c55e" /> : <ArrowDownRight size={14} color="#ef4444" />}
          <span style={{ color: changeType === 'up' ? '#22c55e' : '#ef4444', fontSize: '12px', fontWeight: '600' }}>{change}</span>
        </div>
      )}
    </div>
    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '0 0 4px 0' }}>{title}</p>
    <p style={{ color: 'white', fontSize: '24px', fontWeight: '700', margin: 0 }}>{value}</p>
  </div>
);

// Data Table Component
const DataTable = ({ columns, data, onEdit, onDelete, onAdd, title, addLabel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>{title}</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px 12px 10px 36px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
                width: '200px'
              }}
            />
          </div>
          {onAdd && (
            <button
              type="button"
              onClick={onAdd}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} />
              {addLabel || 'Add New'}
            </button>
          )}
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={i} style={{
                    textAlign: 'left',
                    padding: '14px 16px',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                    whiteSpace: 'nowrap'
                  }}>{col.label}</th>
                ))}
                {(onEdit || onDelete) && <th style={{ width: '80px', padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}></th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ borderBottom: rowIndex < paginatedData.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} style={{ padding: '14px 16px', color: 'white', fontSize: '13px' }}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        {onEdit && (
                          <button type="button" onClick={() => onEdit(row)} style={{ background: 'rgba(6, 182, 212, 0.1)', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer' }}>
                            <Edit size={14} color="#06b6d4" />
                          </button>
                        )}
                        {onDelete && (
                          <button type="button" onClick={() => onDelete(row)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '6px', padding: '6px', cursor: 'pointer' }}>
                            <Trash2 size={14} color="#ef4444" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    width: '30px',
                    height: '30px',
                    background: currentPage === i + 1 ? '#06b6d4' : 'rgba(255,255,255,0.05)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => (
  <div>
    <div style={{ marginBottom: '28px' }}>
      <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Dashboard</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Welcome back! Here's your business overview for Modern Tiles Uganda.</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
      <StatCard title="Total Revenue" value="127.4M UGX" change="12.5%" changeType="up" icon={DollarSign} color="#06b6d4" />
      <StatCard title="Total Sales" value="1,284 sqm" change="8.2%" changeType="up" icon={ShoppingCart} color="#0891b2" />
      <StatCard title="Active Customers" value="356" change="3.1%" changeType="up" icon={Users} color="#0e7490" />
      <StatCard title="Pending Tasks" value="24" change="5" changeType="down" icon={CheckSquare} color="#22d3ee" />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <h3 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: '0 0 16px 0' }}>Sales vs Target (UGX Millions)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
            <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} tickFormatter={(v) => `${v/1000000}M`} />
            <Tooltip contentStyle={{ background: '#164e63', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} formatter={(v) => formatUGX(v)} />
            <Area type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2} fill="url(#salesGradient)" />
            <Line type="monotone" dataKey="target" stroke="#0e7490" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <h3 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: '0 0 16px 0' }}>Expense Distribution</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={expenseCategories} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
              {expenseCategories.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#164e63', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
          {expenseCategories.map((cat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: cat.color }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255,255,255,0.06)'
    }}>
      <h3 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: '0 0 16px 0' }}>Recent Activity</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { action: 'Sale: Ceramic Floor Tiles 60x60 - 45 sqm', customer: 'Kampala Builders Ltd', time: '5 min ago', type: 'sale' },
          { action: 'Stock received: Tile Adhesive 25kg - 200 bags', customer: 'China Import', time: '1 hour ago', type: 'stock' },
          { action: 'Payment received', customer: 'Entebbe Contractors', time: '2 hours ago', type: 'payment' },
          { action: 'Task completed: Stock Inventory Count', customer: 'Sarah Nakamya', time: '3 hours ago', type: 'task' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: item.type === 'sale' ? 'rgba(34, 197, 94, 0.1)' : item.type === 'payment' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(14, 116, 144, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.type === 'sale' && <ShoppingCart size={16} color="#22c55e" />}
                {item.type === 'stock' && <Truck size={16} color="#0e7490" />}
                {item.type === 'payment' && <DollarSign size={16} color="#06b6d4" />}
                {item.type === 'task' && <CheckCircle size={16} color="#0891b2" />}
              </div>
              <div>
                <p style={{ color: 'white', fontSize: '13px', margin: 0 }}>{item.action}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '2px 0 0 0' }}>{item.customer} • {item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Sales Module
const SalesModule = () => {
  const [sales] = useState([
    { id: 'SL001', date: '2024-03-10', customer: 'Kampala Builders Ltd', items: 'Ceramic Floor Tile 60x60', qty: '45 sqm', total: 2025000, status: 'completed' },
    { id: 'SL002', date: '2024-03-10', customer: 'Entebbe Contractors', items: 'Porcelain Wall Tile 30x60', qty: '30 sqm', total: 1140000, status: 'pending' },
    { id: 'SL003', date: '2024-03-09', customer: 'Jinja Properties', items: 'Granite Tile Premium', qty: '25 sqm', total: 2125000, status: 'completed' },
    { id: 'SL004', date: '2024-03-09', customer: 'Mbarara Construction', items: 'Outdoor Tile Anti-Slip', qty: '60 sqm', total: 3300000, status: 'cancelled' },
  ]);

  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'date', label: 'Date' },
    { key: 'customer', label: 'Customer' },
    { key: 'items', label: 'Items' },
    { key: 'qty', label: 'Quantity' },
    { key: 'total', label: 'Total', render: (v) => <span style={{ color: '#22c55e', fontWeight: '600' }}>{formatUGX(v)}</span> },
    { key: 'status', label: 'Status', render: (v) => (
      <span style={{
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '500',
        background: v === 'completed' ? 'rgba(34, 197, 94, 0.1)' : v === 'pending' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        color: v === 'completed' ? '#22c55e' : v === 'pending' ? '#eab308' : '#ef4444'
      }}>{v}</span>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Sales</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Manage tile sales and customer orders</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Today's Sales" value="8.45M UGX" change="15%" changeType="up" icon={ShoppingCart} color="#06b6d4" />
        <StatCard title="This Week" value="42.3M UGX" change="8%" changeType="up" icon={TrendingUp} color="#0891b2" />
        <StatCard title="Pending Orders" value="12" icon={Clock} color="#eab308" />
        <StatCard title="Avg. Order" value="1.85M UGX" change="3%" changeType="up" icon={DollarSign} color="#22c55e" />
      </div>

      <DataTable title="Recent Sales" columns={columns} data={sales} addLabel="New Sale" onAdd={() => alert('Create new sale')} onEdit={(row) => alert(`Edit sale ${row.id}`)} />
    </div>
  );
};

// Expenses Module
const ExpensesModule = () => {
  const [expenses] = useState([
    { id: 'EXP001', date: '2024-03-10', category: 'Operations', description: 'Warehouse maintenance', amount: 850000, status: 'approved' },
    { id: 'EXP002', date: '2024-03-09', category: 'Transport', description: 'Delivery truck fuel', amount: 450000, status: 'pending' },
    { id: 'EXP003', date: '2024-03-08', category: 'Salaries', description: 'March staff wages', amount: 12500000, status: 'approved' },
    { id: 'EXP004', date: '2024-03-07', category: 'Others', description: 'Client meeting refreshments', amount: 120000, status: 'approved' },
  ]);

  const columns = [
    { key: 'id', label: 'Expense ID' },
    { key: 'date', label: 'Date' },
    { key: 'category', label: 'Category', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: 'rgba(6, 182, 212, 0.1)', color: '#67e8f9' }}>{v}</span>
    )},
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount', render: (v) => <span style={{ color: '#ef4444', fontWeight: '600' }}>-{formatUGX(v)}</span> },
    { key: 'status', label: 'Status', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: v === 'approved' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)', color: v === 'approved' ? '#22c55e' : '#eab308' }}>{v}</span>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Expenses</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Track and manage business expenses</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="This Month" value="13.9M UGX" change="5%" changeType="down" icon={CreditCard} color="#ef4444" />
        <StatCard title="Pending Approval" value="450K UGX" icon={Clock} color="#eab308" />
        <StatCard title="Budget Used" value="78%" icon={Target} color="#0891b2" />
        <StatCard title="Top Category" value="Salaries" icon={FileText} color="#06b6d4" />
      </div>

      <DataTable title="Expense Records" columns={columns} data={expenses} addLabel="New Expense" onAdd={() => alert('Create new expense')} onEdit={(row) => alert(`Edit expense ${row.id}`)} />
    </div>
  );
};

// Stock Transfer Module
const StockTransferModule = () => {
  const [transfers] = useState([
    { id: 'TRF001', date: '2024-03-10', item: 'Ceramic Floor Tile 60x60', qty: '200 sqm', from: 'Main Warehouse', to: 'Kampala Showroom', status: 'in-transit' },
    { id: 'TRF002', date: '2024-03-09', item: 'Tile Adhesive 25kg', qty: '100 bags', from: 'Main Warehouse', to: 'Entebbe Branch', status: 'completed' },
    { id: 'TRF003', date: '2024-03-08', item: 'Porcelain Wall Tile 30x60', qty: '150 sqm', from: 'Kampala Showroom', to: 'Jinja Branch', status: 'completed' },
  ]);

  const columns = [
    { key: 'id', label: 'Transfer ID' },
    { key: 'date', label: 'Date' },
    { key: 'item', label: 'Item' },
    { key: 'qty', label: 'Quantity', render: (v) => <span style={{ fontWeight: '600' }}>{v}</span> },
    { key: 'from', label: 'From' },
    { key: 'to', label: 'To' },
    { key: 'status', label: 'Status', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: v === 'completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(6, 182, 212, 0.1)', color: v === 'completed' ? '#22c55e' : '#06b6d4' }}>{v}</span>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Stock Transfer</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Manage inventory transfers between locations</p>
      </div>
      <DataTable title="Transfer Records" columns={columns} data={transfers} addLabel="New Transfer" onAdd={() => alert('Create new transfer')} />
    </div>
  );
};

// Stock Received Module
const StockReceivedModule = () => {
  const [received] = useState([
    { id: 'RCV001', date: '2024-03-10', item: 'Ceramic Floor Tile 60x60', qty: '500 sqm', supplier: 'China Tiles Co.', po: 'PO-2024-089', status: 'verified' },
    { id: 'RCV002', date: '2024-03-09', item: 'Tile Adhesive 25kg', qty: '200 bags', supplier: 'BuildMate Uganda', po: 'PO-2024-088', status: 'pending' },
    { id: 'RCV003', date: '2024-03-08', item: 'Granite Tile Premium', qty: '150 sqm', supplier: 'China Tiles Co.', po: 'PO-2024-087', status: 'verified' },
  ]);

  const columns = [
    { key: 'id', label: 'Receipt ID' },
    { key: 'date', label: 'Date' },
    { key: 'item', label: 'Item' },
    { key: 'qty', label: 'Quantity', render: (v) => <span style={{ fontWeight: '600', color: '#22c55e' }}>+{v}</span> },
    { key: 'supplier', label: 'Supplier' },
    { key: 'po', label: 'PO Number' },
    { key: 'status', label: 'Status', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: v === 'verified' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)', color: v === 'verified' ? '#22c55e' : '#eab308' }}>{v}</span>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Stock Received</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Track incoming inventory from suppliers</p>
      </div>
      <DataTable title="Receipt Records" columns={columns} data={received} addLabel="New Receipt" onAdd={() => alert('Create new receipt')} />
    </div>
  );
};

// Money Transfer Module
const MoneyTransferModule = () => {
  const [transfers] = useState([
    { id: 'MTR001', date: '2024-03-10', from: 'Main Account', to: 'Petty Cash', amount: 2000000, ref: 'INT-2024-045', status: 'completed' },
    { id: 'MTR002', date: '2024-03-09', from: 'Main Account', to: 'China Tiles Co.', amount: 45000000, ref: 'PAY-2024-123', status: 'completed' },
    { id: 'MTR003', date: '2024-03-08', from: 'Collections', to: 'Main Account', amount: 28000000, ref: 'INT-2024-044', status: 'pending' },
  ]);

  const columns = [
    { key: 'id', label: 'Transfer ID' },
    { key: 'date', label: 'Date' },
    { key: 'from', label: 'From Account' },
    { key: 'to', label: 'To Account' },
    { key: 'amount', label: 'Amount', render: (v) => <span style={{ fontWeight: '600', color: '#06b6d4' }}>{formatUGX(v)}</span> },
    { key: 'ref', label: 'Reference' },
    { key: 'status', label: 'Status', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: v === 'completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)', color: v === 'completed' ? '#22c55e' : '#eab308' }}>{v}</span>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Money Transfer</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Manage fund transfers and payments</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Main Account" value="125.4M UGX" icon={DollarSign} color="#06b6d4" />
        <StatCard title="Petty Cash" value="3.2M UGX" icon={CreditCard} color="#0891b2" />
        <StatCard title="Collections" value="28M UGX" icon={Package} color="#22c55e" />
      </div>

      <DataTable title="Transfer History" columns={columns} data={transfers} addLabel="New Transfer" onAdd={() => alert('Create new transfer')} />
    </div>
  );
};

// Customer Ledger Module
const CustomerLedgerModule = () => {
  const columns = [
    { key: 'id', label: 'Customer ID' },
    { key: 'name', label: 'Name' },
    { key: 'contact', label: 'Contact' },
    { key: 'balance', label: 'Balance', render: (v) => (
      <span style={{ fontWeight: '600', color: v >= 0 ? '#22c55e' : '#ef4444' }}>
        {v >= 0 ? '+' : ''}{formatUGX(v)}
      </span>
    )},
    { key: 'status', label: 'Status', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: v === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.1)', color: v === 'active' ? '#22c55e' : 'rgba(255,255,255,0.5)' }}>{v}</span>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Customer Ledger</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Manage customer accounts and balances</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Total Receivable" value="21.25M UGX" icon={ArrowUpRight} color="#22c55e" />
        <StatCard title="Total Payable" value="2.5M UGX" icon={ArrowDownRight} color="#ef4444" />
        <StatCard title="Active Customers" value="3" icon={Users} color="#06b6d4" />
        <StatCard title="Overdue" value="1" icon={AlertCircle} color="#eab308" />
      </div>

      <DataTable title="Customer Accounts" columns={columns} data={initialCustomers} addLabel="New Customer" onAdd={() => alert('Create new customer')} onEdit={(row) => alert(`View ledger for ${row.name}`)} />
    </div>
  );
};

// Task Management Module
const TaskManagementModule = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const columns = [
    { key: 'id', label: 'Task ID' },
    { key: 'title', label: 'Title' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'priority', label: 'Priority', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: v === 'high' ? 'rgba(239, 68, 68, 0.1)' : v === 'medium' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(34, 197, 94, 0.1)', color: v === 'high' ? '#ef4444' : v === 'medium' ? '#eab308' : '#22c55e' }}>{v}</span>
    )},
    { key: 'status', label: 'Status', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: v === 'completed' ? 'rgba(34, 197, 94, 0.1)' : v === 'in-progress' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.1)', color: v === 'completed' ? '#22c55e' : v === 'in-progress' ? '#06b6d4' : 'rgba(255,255,255,0.6)' }}>{v.replace('-', ' ')}</span>
    )},
    { key: 'due', label: 'Due Date' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Task Management</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Assign and track team tasks</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Total Tasks" value={tasks.length} icon={CheckSquare} color="#06b6d4" />
        <StatCard title="In Progress" value={tasks.filter(t => t.status === 'in-progress').length} icon={Clock} color="#0891b2" />
        <StatCard title="Completed" value={tasks.filter(t => t.status === 'completed').length} icon={CheckCircle} color="#22c55e" />
        <StatCard title="High Priority" value={tasks.filter(t => t.priority === 'high').length} icon={AlertCircle} color="#ef4444" />
      </div>

      <DataTable title="Tasks" columns={columns} data={tasks} addLabel="New Task" onAdd={() => alert('Create new task')} onEdit={(row) => alert(`Edit task ${row.id}`)} onDelete={(row) => setTasks(tasks.filter(t => t.id !== row.id))} />
    </div>
  );
};

// Targets Module
const TargetsModule = () => (
  <div>
    <div style={{ marginBottom: '24px' }}>
      <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Targets & Progress</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Set and track team goals</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
      {initialTargets.map((target) => {
        const progress = (target.achieved / target.target) * 100;
        const isOnTrack = progress >= 70;
        
        return (
          <div key={target.id} style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <h3 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: '0 0 4px 0' }}>{target.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0 }}>Assigned to: {target.assignee}</p>
              </div>
              <span style={{
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '500',
                background: isOnTrack ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: isOnTrack ? '#22c55e' : '#ef4444'
              }}>
                {isOnTrack ? 'On Track' : 'At Risk'}
              </span>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Progress</span>
                <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{progress.toFixed(1)}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min(progress, 100)}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${isOnTrack ? '#22c55e' : '#ef4444'} 0%, ${isOnTrack ? '#4ade80' : '#f87171'} 100%)`,
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: '0 0 2px 0' }}>Achieved</p>
                <p style={{ color: '#06b6d4', fontSize: '18px', fontWeight: '700', margin: 0 }}>
                  {target.unit === 'UGX' ? formatUGX(target.achieved) : target.achieved} <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{target.unit !== 'UGX' ? target.unit : ''}</span>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: '0 0 2px 0' }}>Target</p>
                <p style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: 0 }}>
                  {target.unit === 'UGX' ? formatUGX(target.target) : target.target} <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{target.unit !== 'UGX' ? target.unit : ''}</span>
                </p>
              </div>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={12} color="rgba(255,255,255,0.4)" />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Due: {target.deadline}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Item Master Module (Admin)
const ItemMasterModule = () => {
  const columns = [
    { key: 'code', label: 'Item Code' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category', render: (v) => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: 'rgba(6, 182, 212, 0.1)', color: '#67e8f9' }}>{v}</span>
    )},
    { key: 'price', label: 'Price/Unit', render: (v) => <span style={{ fontWeight: '600' }}>{formatUGX(v)}</span> },
    { key: 'stock', label: 'Stock', render: (v, row) => (
      <span style={{ color: v < 500 ? '#ef4444' : v < 1000 ? '#eab308' : '#22c55e', fontWeight: '600' }}>{v} {row.unit}</span>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Item Master</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Manage product catalog - Tiles, Adhesives & Accessories</p>
      </div>
      <DataTable title="Items" columns={columns} data={initialItems} addLabel="New Item" onAdd={() => alert('Create new item')} onEdit={(row) => alert(`Edit item ${row.code}`)} onDelete={(row) => alert(`Delete item ${row.code}`)} />
    </div>
  );
};

// Module Manager (Admin)
const ModuleManagerModule = () => {
  const [modules, setModules] = useState([
    { id: 'MOD001', name: 'Sales', enabled: true, users: 3 },
    { id: 'MOD002', name: 'Expenses', enabled: true, users: 2 },
    { id: 'MOD003', name: 'Stock Transfer', enabled: true, users: 2 },
    { id: 'MOD004', name: 'Stock Received', enabled: true, users: 2 },
    { id: 'MOD005', name: 'Money Transfer', enabled: false, users: 1 },
    { id: 'MOD006', name: 'Customer Ledger', enabled: true, users: 3 },
    { id: 'MOD007', name: 'Task Management', enabled: true, users: 3 },
    { id: 'MOD008', name: 'Targets', enabled: true, users: 3 },
  ]);

  const toggleModule = (id) => {
    setModules(modules.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>Module Manager</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Enable or disable system modules</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {modules.map((module) => (
          <div key={module.id} style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '14px',
            padding: '18px',
            border: `1px solid ${module.enabled ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255,255,255,0.06)'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: module.enabled ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(14, 116, 144, 0.15) 100%)' : 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Settings size={20} color={module.enabled ? '#06b6d4' : 'rgba(255,255,255,0.3)'} />
                </div>
                <div>
                  <p style={{ color: 'white', fontSize: '14px', fontWeight: '600', margin: '0 0 2px 0' }}>{module.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0 }}>{module.users} users</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                style={{
                  width: '48px',
                  height: '26px',
                  borderRadius: '13px',
                  border: 'none',
                  background: module.enabled ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' : 'rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  background: 'white',
                  position: 'absolute',
                  top: '3px',
                  left: module.enabled ? '25px' : '3px',
                  transition: 'left 0.2s'
                }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// User Management Module (Admin)
const UserManagementModule = () => {
  const columns = [
    { key: 'id', label: 'User ID' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role', render: (v) => (
      <span style={{
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '500',
        textTransform: 'capitalize',
        background: v === 'admin' ? 'rgba(239, 68, 68, 0.1)' : v === 'manager' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(34, 197, 94, 0.1)',
        color: v === 'admin' ? '#ef4444' : v === 'manager' ? '#06b6d4' : '#22c55e'
      }}>{v}</span>
    )},
    { key: 'avatar', label: 'Status', render: () => (
      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>Active</span>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0' }}>User Management</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Manage user accounts and permissions</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Total Users" value={mockUsers.length} icon={Users} color="#06b6d4" />
        <StatCard title="Admins" value={mockUsers.filter(u => u.role === 'admin').length} icon={UserCog} color="#ef4444" />
        <StatCard title="Active Now" value="2" icon={CheckCircle} color="#22c55e" />
      </div>

      <DataTable title="Users" columns={columns} data={mockUsers} addLabel="New User" onAdd={() => alert('Create new user')} onEdit={(row) => alert(`Edit user ${row.id}`)} onDelete={(row) => alert(`Delete user ${row.id}`)} />
    </div>
  );
};

// Main App Component
const ERPSystem = () => {
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveModule('dashboard');
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'sales': return <SalesModule />;
      case 'expenses': return <ExpensesModule />;
      case 'stock-transfer': return <StockTransferModule />;
      case 'stock-received': return <StockReceivedModule />;
      case 'money-transfer': return <MoneyTransferModule />;
      case 'customers': return <CustomerLedgerModule />;
      case 'tasks': return <TaskManagementModule />;
      case 'targets': return <TargetsModule />;
      case 'items': return <ItemMasterModule />;
      case 'modules': return <ModuleManagerModule />;
      case 'users': return <UserManagementModule />;
      default: return <Dashboard />;
    }
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c4a6e 0%, #164e63 100%)',
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        user={user}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Top Header */}
        <div style={{
          padding: '14px 24px',
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  padding: '10px 14px 10px 38px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '13px',
                  outline: 'none',
                  width: '240px'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button type="button" style={{
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '10px',
              padding: '10px',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bell size={18} color="rgba(255,255,255,0.6)" />
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%'
              }} />
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px 6px 6px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {user.avatar}
              </div>
              <div>
                <p style={{ color: 'white', fontSize: '13px', fontWeight: '500', margin: 0 }}>{user.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', margin: 0, textTransform: 'capitalize' }}>{user.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {renderModule()}
        </div>
      </div>
    </div>
  );
};

export default ERPSystem;
