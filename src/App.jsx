import { useState, useEffect } from 'react'
import './index.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './components/Dashboard/Dashboard'
import HabitsPage from './components/Habits/HabitsPage'
import AnalyticsPage from './components/Analytics/AnalyticsPage'
import AICoachPage from './components/AICoach/AICoachPage'
import AIShadowPage from './components/AIShadow/AIShadowPage'
import HelpPage from './components/Help/HelpPage'
import SettingsPage from './components/Settings/SettingsPage'
import LoginPage from './components/Auth/LoginPage'
import SignupPage from './components/Auth/SignupPage'
import useMobile from './hooks/useMobile'
import { Menu, Zap } from 'lucide-react'

import ThreeBackground from './components/Background/ThreeBackground';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when tab changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [activeTab, isMobile]);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading...</div>;
  }

  // Auth Screen Wrapper
  if (!user) {
    return (
      <>
        <ThreeBackground />
        <div style={{ position: 'relative', zIndex: 1, height: '100vh', width: '100%' }}>
          {isLogin
            ? <LoginPage onSwitch={() => setIsLogin(false)} />
            : <SignupPage onSwitch={() => setIsLogin(true)} />
          }
        </div>
      </>
    );
  }

  return (
    <div className="app-container" style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <ThreeBackground />

      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main style={{ flex: 1, position: 'relative', zIndex: 1, overflow: 'hidden', background: 'transparent', display: 'flex', flexDirection: 'column' }}>
        {isMobile && !sidebarOpen && (
          <div style={{
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(10, 10, 10, 0.4)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border-subtle)',
            zIndex: 20
          }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'transparent', border: 'none', color: 'white', display: 'flex' }}
            >
              <Menu size={24} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'var(--gradient-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white'
              }}>
                <Zap size={14} fill="white" />
              </div>
              <span style={{ fontWeight: '600', fontSize: '16px' }}>HabitAI</span>
            </div>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px' : '0' }}>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'habits' && <HabitsPage />}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'ai_coach' && <AICoachPage />}
          {activeTab === 'ai_shadow' && <AIShadowPage />}
          {activeTab === 'settings' && <SettingsPage />}
          {activeTab === 'help' && <HelpPage />}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
