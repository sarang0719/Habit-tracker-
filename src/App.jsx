import { useState } from 'react'
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

import ThreeBackground from './components/Background/ThreeBackground';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogin, setIsLogin] = useState(true);

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
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ flex: 1, position: 'relative', zIndex: 1, overflow: 'hidden', background: 'transparent' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'habits' && <HabitsPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {activeTab === 'ai_coach' && <AICoachPage />}
        {activeTab === 'ai_shadow' && <AIShadowPage />}
        {activeTab === 'settings' && <SettingsPage />}
        {activeTab === 'help' && <HelpPage />}
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
