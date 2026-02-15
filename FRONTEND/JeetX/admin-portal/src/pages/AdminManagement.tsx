import React, { useEffect, useState } from 'react';
import {
    Shield,
    ShieldCheck,
    Settings,
    CheckCircle2,
    XCircle,
    Save,
    Loader2,
    ChevronRight,
    UserPlus,
    Mail,
    Smartphone,
    Calendar,
    Clock,
    Activity
} from 'lucide-react';
import { authApi } from '../api/adminApi';

interface Admin {
    id: string;
    full_name: string;
    email: string;
    mobile: string;
    role: 'ADMIN' | 'SUPER_ADMIN';
    status: string;
    created_at: string;
    last_login_at: string | null;
    admin_permissions: Record<string, Record<string, boolean>>;
}

const AdminManagement: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [permissionChanges, setPermissionChanges] = useState<Record<string, Record<string, boolean>>>({});

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        setAccessDenied(false);
        try {
            const response = await authApi.getAdmins();
            setAdmins(response.data.data || []);
        } catch (error: any) {
            console.error('Failed to fetch admins:', error);
            if (error.response?.status === 403) {
                setAccessDenied(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAdmin = (admin: Admin) => {
        setSelectedAdmin(admin);
        setPermissionChanges(JSON.parse(JSON.stringify(admin.admin_permissions || {})));
    };

    const togglePermission = (category: string, action: string) => {
        setPermissionChanges(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [action]: !prev[category]?.[action]
            }
        }));
    };

    const handleUpdatePermissions = async () => {
        if (!selectedAdmin) return;
        setIsUpdating(true);

        const payload = { permissions: permissionChanges };
        console.log('📤 Sending Update Permissions Payload:', {
            adminId: selectedAdmin.id,
            payload: payload
        });

        try {
            await authApi.updatePermissions(selectedAdmin.id, permissionChanges);
            alert('Permissions updated successfully!');
            fetchAdmins();
        } catch (error) {
            console.error('❌ Update Permissions Error:', error);
            alert('Failed to update permissions.');
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '60vh' }}>
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (accessDenied) {
        return (
            <div className="admin-mgmt-container animate-fadeIn">
                <header className="page-header">
                    <div className="header-info">
                        <h1>Admin Management</h1>
                        <p className="subtitle">View and manage administrative roles and granular permissions.</p>
                    </div>
                </header>
                <div className="card flex-center" style={{ minHeight: '400px', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                    <div className="auth-logo" style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '2rem', borderRadius: '50%' }}>
                        <XCircle size={64} className="text-error" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Access Denied</h2>
                        <p className="subtitle" style={{ maxWidth: '400px' }}>
                            You do not have the <strong>SUPER_ADMIN</strong> privileges required to view or manage other administrators.
                            Please contact the system owner if you believe this is an error.
                        </p>
                    </div>
                    <button className="btn-primary" onClick={() => window.location.href = '/'}>
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-mgmt-container animate-fadeIn">
            <header className="page-header">
                <div className="header-info">
                    <h1>Admin Management</h1>
                    <p className="subtitle">View and manage administrative roles and granular permissions.</p>
                </div>
                <button className="btn-primary" onClick={() => window.location.href = '/register'}>
                    <UserPlus size={20} />
                    Create New Admin
                </button>
            </header>

            <div className="admin-grid">
                {/* Admin List */}
                <div className="card admin-list-card">
                    <div className="card-header">
                        <h3>Administrators</h3>
                        <span className="badge">{admins.length} Total</span>
                    </div>
                    <div className="admin-list">
                        {admins.map(admin => (
                            <div
                                key={admin.id}
                                className={`admin-item ${selectedAdmin?.id === admin.id ? 'active' : ''}`}
                                onClick={() => handleSelectAdmin(admin)}
                            >
                                <div className="admin-avatar">
                                    {admin.role === 'SUPER_ADMIN' ? <ShieldCheck className="text-primary" /> : <Shield />}
                                </div>
                                <div className="admin-details">
                                    <div className="admin-name">{admin.full_name}</div>
                                    <div className="admin-email">{admin.email}</div>
                                    <div className="admin-status-bar">
                                        <span className={`status-dot ${admin.status.toLowerCase()}`}></span>
                                        {admin.status}
                                    </div>
                                </div>
                                <div className={`admin-role-badge ${admin.role.toLowerCase()}`}>
                                    {admin.role.replace('_', ' ')}
                                </div>
                                <ChevronRight size={16} className="arrow" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Permissions Editor & Profile */}
                <div className="card permissions-card">
                    {selectedAdmin ? (
                        <div className="profile-scroll">
                            <div className="card-header">
                                <div>
                                    <h3>Admin Profile</h3>
                                    <p className="subtitle">Detailed information and access control</p>
                                </div>
                                <div className={`role-tag ${selectedAdmin.role.toLowerCase()}`}>
                                    {selectedAdmin.role === 'SUPER_ADMIN' ? <ShieldCheck size={18} /> : <Shield size={18} />}
                                    {selectedAdmin.role}
                                </div>
                            </div>

                            <div className="profile-info-grid">
                                <div className="info-item">
                                    <Mail size={16} />
                                    <div>
                                        <label>Email Address</label>
                                        <span>{selectedAdmin.email}</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Smartphone size={16} />
                                    <div>
                                        <label>Mobile Number</label>
                                        <span>{selectedAdmin.mobile}</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Calendar size={16} />
                                    <div>
                                        <label>Joined On</label>
                                        <span>{formatDate(selectedAdmin.created_at)}</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Clock size={16} />
                                    <div>
                                        <label>Last Login</label>
                                        <span>{formatDate(selectedAdmin.last_login_at)}</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Activity size={16} />
                                    <div>
                                        <label>Account Status</label>
                                        <span className={`status-text ${selectedAdmin.status.toLowerCase()}`}>{selectedAdmin.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="section-divider">
                                <span>Granular Permissions</span>
                            </div>

                            <div className="permissions-grid">
                                {Object.entries(permissionChanges).length > 0 ? (
                                    Object.entries(permissionChanges).map(([category, actions]) => (
                                        <div key={category} className="permission-category-group animate-fadeIn">
                                            <div className="permission-category-header">
                                                <h4 className="permission-category-title">{category.replace(/_/g, ' ').toUpperCase()}</h4>
                                                <span className="permission-count-badge">
                                                    {Object.values(actions).filter(v => v).length}/{Object.keys(actions).length} Enabled
                                                </span>
                                            </div>
                                            <div className="actions-grid">
                                                {Object.entries(actions).map(([action, value]) => (
                                                    <div
                                                        key={action}
                                                        className={`permission-toggle-item ${value ? 'enabled' : 'disabled'}`}
                                                        onClick={() => togglePermission(category, action)}
                                                        role="button"
                                                        aria-pressed={value}
                                                        tabIndex={0}
                                                        onKeyPress={(e) => { if (e.key === 'Enter') togglePermission(category, action); }}
                                                    >
                                                        <div className="permission-info">
                                                            <span className="permission-label">{action.replace(/_/g, ' ').toUpperCase()}</span>
                                                        </div>
                                                        <div className={`custom-switch ${value ? 'on' : 'off'}`}>
                                                            <div className="switch-handle" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-permissions-state">
                                        <Shield size={32} className="text-muted" />
                                        <p>No granular permissions defined for this administrator.</p>
                                    </div>
                                )}
                            </div>

                            <div className="card-actions">
                                <button
                                    className="btn-primary"
                                    onClick={handleUpdatePermissions}
                                    disabled={isUpdating}
                                    style={{ width: '100%' }}
                                >
                                    {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                    {isUpdating ? 'Saving Changes...' : 'Update Admin Permissions'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <Settings size={48} className="text-muted" />
                            <p>Select an administrator to view their profile and manage permissions</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminManagement;
