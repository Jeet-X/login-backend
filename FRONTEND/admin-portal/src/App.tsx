import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  NavLink
} from 'react-router-dom';
import {
  Bell,
  Send,
  Settings,
  Users,
  Layers,
  Layout,
  Tag,
  Calendar,
  Smartphone,
  Globe,
  LogOut,
  Shield,
  History,
  Trophy,
  ChevronDown
} from 'lucide-react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminManagement from './pages/AdminManagement';
import Campaigns from './pages/Campaigns';
import QuizManagement from './pages/QuizManagement';
import QuizSetManagement from './pages/QuizSetManagement';
import QuizConfiguration from './pages/QuizConfiguration';
import { notificationApi } from './api/adminApi';

type Category = 'SYSTEM' | 'GAME' | 'OFFER' | 'REMINDER' | 'INFO';
type DeliveryMode = 'PUSH' | 'IN_APP' | 'BOTH';
type TargetType = 'ALL' | 'SEGMENT' | 'CUSTOM' | 'SINGLE';
type ScheduleType = 'NOW' | 'SCHEDULED';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [quizExpanded, setQuizExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Bell size={28} strokeWidth={2.5} />
          <span>JEET-X</span>
        </div>

        <nav style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
            <Bell size={20} />
            <span>Create Notification</span>
          </NavLink>
          <NavLink to="/campaigns" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <History size={20} />
            <span>Campaigns</span>
          </NavLink>
          <NavLink to="/admins" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Shield size={20} />
            <span>Admins</span>
          </NavLink>

          <div
            className={`nav-item ${quizExpanded ? 'active' : ''}`}
            onClick={() => setQuizExpanded(!quizExpanded)}
            style={{ cursor: 'pointer', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Trophy size={20} />
              <span>Quiz</span>
            </div>
            <ChevronDown size={16} style={{ transform: quizExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </div>

          {quizExpanded && (
            <div className="nav-sub-items animate-fadeIn" style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
              <NavLink to="/quiz" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ fontSize: '0.9rem', padding: '0.6rem 1rem' }} end>
                <Trophy size={16} />
                <span>Management</span>
              </NavLink>
              <NavLink to="/quiz-sets" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ fontSize: '0.9rem', padding: '0.6rem 1rem' }}>
                <Layout size={16} />
                <span>Quiz Sets</span>
              </NavLink>
              <NavLink to="/quiz-configuration" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ fontSize: '0.9rem', padding: '0.6rem 1rem' }}>
                <Settings size={16} />
                <span>Configure</span>
              </NavLink>
            </div>
          )}
          <div className="nav-item">
            <Users size={20} />
            <span>Users</span>
          </div>
          <div className="nav-item">
            <Layers size={20} />
            <span>Segments</span>
          </div>
          <div className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </nav>

        <div className="nav-item logout" onClick={handleLogout} style={{ marginTop: 'auto', color: '#f87171' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

function CreateNotification() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: 'SYSTEM' as Category,
    deliveryMode: 'BOTH' as DeliveryMode,
    targetType: 'ALL' as TargetType,
    targetSegment: '',
    targetUserIds: '',
    scheduleType: 'NOW' as ScheduleType,
    scheduleDate: '',
    scheduleTime: '',
  });

  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Prepare payload based on API spec
    const payload: any = {
      title: formData.title,
      message: formData.message,
      category: formData.category,
      target_type: formData.targetType,
    };

    // Add target specific data
    if (formData.targetType === 'SEGMENT') {
      payload.target_segment = formData.targetSegment;
    } else if (formData.targetType === 'CUSTOM' || formData.targetType === 'SINGLE') {
      payload.target_user_ids = formData.targetUserIds.split(',').map(id => id.trim()).filter(id => id !== '');
    }

    // Handle scheduling if not NOW
    if (formData.scheduleType === 'SCHEDULED' && formData.scheduleDate && formData.scheduleTime) {
      payload.schedule_at = `${formData.scheduleDate}T${formData.scheduleTime}:00Z`;
    }

    console.log('📤 Sending Notification Payload:', payload);

    try {
      const response = await notificationApi.createCampaign(payload);
      console.log('✅ Notification API Success:', response.data);
      alert('Notification campaign created successfully!');

      // Reset form
      setFormData({
        title: '',
        message: '',
        category: 'SYSTEM',
        deliveryMode: 'BOTH',
        targetType: 'ALL',
        targetSegment: '',
        targetUserIds: '',
        scheduleType: 'NOW',
        scheduleDate: '',
        scheduleTime: '',
      });

      // Redirect to history/campaigns page
      navigate('/campaigns');
    } catch (error: any) {
      console.error('❌ Notification API Error:', error.response?.data || error.message);
      alert(`Failed to send notification: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <header className="animate-fadeIn">
        <h1>Create Notification</h1>
        <p className="subtitle">Send system-wide or targeted messages to your users.</p>
      </header>

      <form onSubmit={handleSubmit} className="card animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="title">
              <Layout size={16} /> Notification Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a catchy title..."
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">
              <Globe size={16} /> Message Content
            </label>
            <textarea
              id="message"
              placeholder="What would you like to say?"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">
              <Tag size={16} /> Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
            >
              <option value="SYSTEM">System Notification</option>
              <option value="GAME">Game Update</option>
              <option value="OFFER">Special Offer</option>
              <option value="REMINDER">Reminder</option>
              <option value="INFO">Information</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <Smartphone size={16} /> Delivery Mode
            </label>
            <div className="radio-group">
              {['PUSH', 'IN_APP', 'BOTH'].map((mode) => (
                <label className="radio-option" key={mode}>
                  <input
                    type="radio"
                    name="delivery"
                    value={mode}
                    checked={formData.deliveryMode === mode}
                    onChange={() => setFormData({ ...formData, deliveryMode: mode as DeliveryMode })}
                  />
                  <div className="radio-label">
                    <span>{mode}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group full-width">
            <label>
              <Users size={16} /> Target Audience
            </label>
            <div className="radio-group">
              {['ALL', 'SEGMENT', 'CUSTOM', 'SINGLE'].map((target) => (
                <label className="radio-option" key={target}>
                  <input
                    type="radio"
                    name="target"
                    value={target}
                    checked={formData.targetType === target}
                    onChange={() => setFormData({ ...formData, targetType: target as TargetType })}
                  />
                  <div className="radio-label">
                    <span>{target}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {formData.targetType === 'SEGMENT' && (
            <div className="form-group full-width animate-fadeIn">
              <label htmlFor="targetSegment">
                <Layers size={16} /> Target Segment
              </label>
              <input
                id="targetSegment"
                type="text"
                placeholder="e.g. VIP_USERS, INACTIVE_7_DAYS"
                value={formData.targetSegment}
                onChange={e => setFormData({ ...formData, targetSegment: e.target.value })}
                required
              />
            </div>
          )}

          {(formData.targetType === 'CUSTOM' || formData.targetType === 'SINGLE') && (
            <div className="form-group full-width animate-fadeIn">
              <label htmlFor="targetUserIds">
                <Users size={16} /> {formData.targetType === 'SINGLE' ? 'User UUID' : 'User UUIDs (comma separated)'}
              </label>
              <textarea
                id="targetUserIds"
                placeholder={formData.targetType === 'SINGLE' ? "Enter User UUID..." : "Enter UUIDs separated by commas..."}
                style={{ minHeight: '80px' }}
                value={formData.targetUserIds}
                onChange={e => setFormData({ ...formData, targetUserIds: e.target.value })}
                required
              />
            </div>
          )}

          <div className="form-group full-width">
            <label>
              <Calendar size={16} /> Scheduling
            </label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="schedule"
                  value="NOW"
                  checked={formData.scheduleType === 'NOW'}
                  onChange={() => setFormData({ ...formData, scheduleType: 'NOW' })}
                />
                <div className="radio-label">
                  <span>Send Now</span>
                </div>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="schedule"
                  value="SCHEDULED"
                  checked={formData.scheduleType === 'SCHEDULED'}
                  onChange={() => setFormData({ ...formData, scheduleType: 'SCHEDULED' })}
                />
                <div className="radio-label">
                  <span>Schedule</span>
                </div>
              </label>
            </div>

            {formData.scheduleType === 'SCHEDULED' && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }} className="animate-fadeIn">
                <input
                  type="date"
                  value={formData.scheduleDate}
                  onChange={e => setFormData({ ...formData, scheduleDate: e.target.value })}
                  required
                />
                <input
                  type="time"
                  value={formData.scheduleTime}
                  onChange={e => setFormData({ ...formData, scheduleTime: e.target.value })}
                  required
                />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={isSending}>
          <Send size={20} className={isSending ? 'animate-pulse' : ''} />
          {isSending ? 'Sending...' : 'Create & Send Notification'}
        </button>
      </form>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreateNotification />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Campaigns />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AdminManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <QuizManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-sets"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <QuizSetManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-configuration"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <QuizConfiguration />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
