import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { companyAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import CompanyList from '../components/CompanyList';
import AssessmentManager from '../components/AssessmentManager';
import '../styles/Sidebar.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await companyAPI.getAll();
      setCompanies(response.data);
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <div className="page-header">
              <h1 className="page-title">Admin Dashboard</h1>
              <p className="page-subtitle">Manage your adaptive learning platform</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <div>
                    <h3 className="stat-value">{companies.length}</h3>
                    <p className="stat-label">Total Companies</p>
                  </div>
                  <div className="stat-icon blue">🏢</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div>
                    <h3 className="stat-value">0</h3>
                    <p className="stat-label">Active Assessments</p>
                  </div>
                  <div className="stat-icon green">📝</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div>
                    <h3 className="stat-value">0</h3>
                    <p className="stat-label">Total Students</p>
                  </div>
                  <div className="stat-icon orange">👥</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div>
                    <h3 className="stat-value">0</h3>
                    <p className="stat-label">Completed Tests</p>
                  </div>
                  <div className="stat-icon purple">✅</div>
                </div>
              </div>
            </div>

            <div className="page-header">
              <h2 className="page-title" style={{ fontSize: '1.5rem' }}>Quick Actions</h2>
            </div>

            <div className="stats-grid">
              <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('companies')}>
                <div className="stat-header">
                  <div>
                    <h3 className="stat-label">Manage Companies</h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                      Add or edit company profiles
                    </p>
                  </div>
                  <div className="stat-icon blue">🏢</div>
                </div>
              </div>

              <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('assessments')}>
                <div className="stat-header">
                  <div>
                    <h3 className="stat-label">Create Assessment</h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                      Design new assessments
                    </p>
                  </div>
                  <div className="stat-icon green">📝</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'companies':
        return (
          <div>
            <div className="page-header">
              <h1 className="page-title">Manage Companies</h1>
              <p className="page-subtitle">Add and organize company recruitment materials</p>
            </div>
            <CompanyList
              companies={companies}
              onCompanyCreated={(company) => setCompanies([company, ...companies])}
              onCompanySelect={() => {}}
              onCompanyDelete={(id) => setCompanies(companies.filter(c => c._id !== id))}
              loading={false}
            />
          </div>
        );
      case 'assessments':
        return (
          <div>
            <div className="page-header">
              <h1 className="page-title">Assessment Management</h1>
              <p className="page-subtitle">Create and manage assessments for students</p>
            </div>
            <AssessmentManager />
          </div>
        );
      case 'students':
        return (
          <div>
            <div className="page-header">
              <h1 className="page-title">Student Management</h1>
              <p className="page-subtitle">View and manage student accounts</p>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <p style={{ fontSize: '1.125rem', color: '#64748b' }}>
                Student management features coming soon
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
