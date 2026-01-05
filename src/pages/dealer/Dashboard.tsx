import React from 'react';
import { Users, IndianRupee, Map, ShoppingBag, BarChart3, LogOut } from 'lucide-react';

const DealerDashboard: React.FC = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                    <Users color="var(--primary)" size={32} />
                    <h2 style={{ fontSize: '1.25rem' }}>Dealer Portal</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <div className="nav-item" style={{ padding: '0.85rem 1rem', borderRadius: '0.75rem', background: 'rgba(0, 210, 255, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <BarChart3 size={20} />
                        <span style={{ fontWeight: '600' }}>Performance</span>
                    </div>
                    <div className="nav-item" style={{ padding: '0.85rem 1rem', borderRadius: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Users size={20} />
                        <span>Sub-Dealers</span>
                    </div>
                    <div className="nav-item" style={{ padding: '0.85rem 1rem', borderRadius: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <ShoppingBag size={20} />
                        <span>Inventory</span>
                    </div>
                    <div className="nav-item" style={{ padding: '0.85rem 1rem', borderRadius: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Map size={20} />
                        <span>Territory</span>
                    </div>
                </nav>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', color: 'var(--error)' }}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem' }}>Dealer Network Overview</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Managing North Karnataka Territory</p>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <StatCard icon={<IndianRupee size={24} />} label="Total Sales (MND)" value="₹ 12,45,000" color="var(--primary)" />
                    <StatCard icon={<Users size={24} />} label="Active Farmers" value="842" color="var(--secondary)" />
                    <StatCard icon={<IndianRupee size={24} />} label="Unpaid Commission" value="₹ 42,300" color="var(--accent)" />
                    <StatCard icon={<ShoppingBag size={24} />} label="Pending Orders" value="12" color="var(--warning)" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Commission Structure</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                                    <th style={{ textAlign: 'left', padding: '1rem' }}>Category</th>
                                    <th style={{ textAlign: 'left', padding: '1rem' }}>Min Volume</th>
                                    <th style={{ textAlign: 'left', padding: '1rem' }}>Commission %</th>
                                </tr>
                            </thead>
                            <tbody>
                                <CommissionRow category="Agri Fertilizers" volume="0 - 500 units" percent="5%" />
                                <CommissionRow category="Agri Fertilizers" volume="500+ units" percent="8%" />
                                <CommissionRow category="Aqua Feed" volume="All" percent="10%" />
                                <CommissionRow category="Poultry Supps" volume="All" percent="7.5%" />
                            </tbody>
                        </table>
                    </div>

                    <div className="glass" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Territory Performance</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <ProgressItem label="Hubli" value={75} color="var(--primary)" />
                            <ProgressItem label="Dharwad" value={60} color="var(--secondary)" />
                            <ProgressItem label="Belagavi" value={45} color="var(--accent)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }: any) => (
    <div className="glass animate-fade-in" style={{ padding: '1.5rem', borderBottom: `4px solid ${color}` }}>
        <div style={{ color, marginBottom: '0.75rem' }}>{icon}</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{label}</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
    </div>
);

const CommissionRow = ({ category, volume, percent }: any) => (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <td style={{ padding: '1rem' }}>{category}</td>
        <td style={{ padding: '1rem' }}>{volume}</td>
        <td style={{ padding: '1rem', color: 'var(--secondary)', fontWeight: 'bold' }}>{percent}</td>
    </tr>
);

const ProgressItem = ({ label, value, color }: any) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${value}%`, background: color }} />
        </div>
    </div>
);

export default DealerDashboard;
