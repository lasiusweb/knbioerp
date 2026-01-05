import React from 'react';
import { TrendingDown, Percent, ChevronRight } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Strategic Analytics</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Pricing Intelligence & Market Demand Modeling</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.5rem', color: 'white' }}>Download Data</button>
                    <button style={{ padding: '0.75rem 1.5rem', background: 'var(--primary)', color: 'black', borderRadius: '0.5rem', fontWeight: '600' }}>Update Rules</button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                {/* Elasticity Graph Placeholder */}
                <div className="glass" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <div>
                            <h3>Demand Elasticity</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Price Sensitivity Model (Phase 5)</p>
                        </div>
                        <Percent size={20} color="var(--accent)" />
                    </div>

                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '1rem' }}>
                        {[40, 70, 45, 90, 65, 80, 50, 85, 95].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, background: 'linear-gradient(to top, var(--accent), transparent)', borderRadius: '4px 4px 0 0', opacity: 0.6 }} />
                        ))}
                    </div>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', textShadow: '0 0 20px rgba(255,0,255,0.5)' }}>1.52 ε</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>Relatively Elastic</p>
                    </div>
                </div>

                {/* Profit Margin Trends */}
                <div className="glass" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <div>
                            <h3>Profit Margin Trends</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Average vs. Target</p>
                        </div>
                        <TrendingDown size={20} color="var(--secondary)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <MarginBar label="Agri Division" value={22} target={25} />
                        <MarginBar label="Aqua Division" value={31} target={28} />
                        <MarginBar label="Integrated" value={18} target={20} />
                    </div>
                </div>
            </div>

            <h3 style={{ marginBottom: '1.5rem' }}>Active Smart Pricing Rules</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <RuleCard
                    name="Seasonal Monsoon Surcharge"
                    type="Seasonal"
                    impact="+12%"
                    desc="Applied to all transport-heavy items during monsoon months."
                />
                <RuleCard
                    name="South Region Loyalty"
                    type="Loyalty"
                    impact="-5%"
                    desc="Discount for farmers with >1000 loyalty points in Karnataka."
                />
                <RuleCard
                    name="Bulk Phosphorus Discount"
                    type="Volume"
                    impact="-10%"
                    desc="For orders exceeding 500 units of phosphatic fertilizers."
                />
            </div>
        </div>
    );
};

const MarginBar = ({ label, value, target }: any) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>{label}</span>
            <span style={{ fontWeight: 'bold' }}>{value}% <small style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>/ {target}%</small></span>
        </div>
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '100%', width: `${value}%`, background: value >= target ? 'var(--secondary)' : 'var(--warning)' }} />
            <div style={{ position: 'absolute', left: `${target}%`, top: 0, bottom: 0, width: '2px', background: 'white', opacity: 0.5 }} />
        </div>
    </div>
);

const RuleCard = ({ name, type, impact, desc }: any) => (
    <div className="glass" style={{ padding: '1.5rem', transition: 'transform 0.3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', textTransform: 'uppercase' }}>{type}</span>
            <span style={{ color: impact.startsWith('+') ? 'var(--error)' : 'var(--success)', fontWeight: 'bold' }}>{impact}</span>
        </div>
        <h4 style={{ marginBottom: '0.5rem' }}>{name}</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{desc}</p>
        <button style={{ background: 'transparent', color: 'white', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
            Configure <ChevronRight size={14} />
        </button>
    </div>
);

export default AdminAnalytics;
