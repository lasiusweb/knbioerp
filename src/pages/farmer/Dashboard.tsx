import React from 'react';
import { LayoutDashboard, Droplets, Sprout, TrendingUp, LogOut, Settings, Bell } from 'lucide-react';

const FarmerDashboard: React.FC = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                    <Sprout color="var(--primary)" size={32} />
                    <h2 style={{ fontSize: '1.25rem' }}>Farmer Portal</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <NavItem icon={<Droplets size={20} />} label="My Ponds" />
                    <NavItem icon={<Sprout size={20} />} label="My Crops" />
                    <NavItem icon={<TrendingUp size={20} />} label="Analytics" />
                    <NavItem icon={<Bell size={20} />} label="Advice" />
                </nav>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                    <NavItem icon={<Settings size={20} />} label="Settings" />
                    <NavItem icon={<LogOut size={20} />} label="Logout" danger />
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem' }}>Welcome back, Shivam!</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Here's what's happening on your farm today.</p>
                    </div>
                    <div className="glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>South Region</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Premium Member</p>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black' }}>S</div>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {/* Water Quality Card */}
                    <div className="glass animate-fade-in" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>Water Quality</h3>
                            <Droplets size={20} color="var(--primary)" />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                            <MetricRow label="PH Level" value="7.2" status="Optimal" />
                            <MetricRow label="Ammonia" value="0.02 mg/l" status="Low" />
                            <MetricRow label="Temp" value="28°C" status="Perfect" />
                        </div>
                        <button style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,210,255,0.1)', color: 'var(--primary)' }}>
                            View Detailed Report
                        </button>
                    </div>

                    {/* Recommendations Card */}
                    <div className="glass animate-fade-in" style={{ padding: '1.5rem', borderLeft: '4px solid var(--secondary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>Smart Advice</h3>
                            <Bell size={20} color="var(--secondary)" />
                        </div>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                            Based on your PH level of 7.2, we recommend:
                        </p>
                        <div style={{ background: 'rgba(0,255,170,0.05)', padding: '1rem', borderRadius: '0.5rem', border: '1px dashed var(--secondary)' }}>
                            <p style={{ color: 'var(--secondary)', fontWeight: '600' }}>Boost Yield with Nitro-Aqua</p>
                            <p style={{ fontSize: '0.8rem' }}>Applying Nitro-Aqua now will stabilize nutrients for the next 15 days.</p>
                        </div>
                        <button style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--secondary)', color: 'black', fontWeight: '600' }}>
                            Apply Recommendation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active = false, danger = false }: any) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.85rem 1rem',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        background: active ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
        color: active ? 'var(--primary)' : (danger ? 'var(--error)' : 'var(--text-main)'),
        transition: 'all 0.2s'
    }}>
        {icon}
        <span style={{ fontWeight: active ? '600' : '400' }}>{label}</span>
    </div>
);

const MetricRow = ({ label, value, status }: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</span>
        <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: '600' }}>{value}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--success)' }}>{status}</p>
        </div>
    </div>
);

export default FarmerDashboard;
