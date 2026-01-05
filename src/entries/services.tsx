import { createRoot } from 'react-dom/client';
import { Layout } from '../components/shared/Layout';
import { ClipboardCheck, Settings } from 'lucide-react';
import '../styles/index.css';

const Services = () => (
    <Layout>
        {/* Section 1: Header */}
        <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Expert Consulting</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                We don't just sell products; we build systems. Our engineering and biological teams provide end-to-end integration for your farm or industry.
            </p>
        </section>

        {/* Section 2: Cards */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                <ServiceRow
                    icon={<Settings size={40} color="var(--primary)" />}
                    title="STP & ETP Solutions"
                    desc="Complete design, installation, and maintenance of Sewage Treatment Plants and Effluent Treatment Plants. We ensure 100% compliance with environmental standards while recovering water for agriculture."
                    steps={['Site Survey', 'Process Selection', 'Installation', 'Monitoring']}
                />
                <ServiceRow
                    icon={<ClipboardCheck size={40} color="var(--secondary)" />}
                    title="Organic Farming Consultation"
                    desc="Transition your traditional farm to a certified organic powerhouse. We provide soil health analysis, pest management strategies, and certification assistance."
                    steps={['Soil Analysis', 'SOP Design', 'Input Management', 'Certification']}
                    reverse
                />
            </div>
        </section>
    </Layout>
);

const ServiceRow = ({ icon, title, desc, steps, reverse = false }: any) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div style={{ order: reverse ? 1 : 0 }}>
            <div style={{ marginBottom: '1.5rem' }}>{icon}</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{title}</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem' }}>{desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {steps.map((s: string) => (
                    <div key={s} className="glass" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>{s}</div>
                ))}
            </div>
        </div>
        <div className="glass" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', order: reverse ? 0 : 1 }}>
            <p style={{ color: 'var(--text-muted)' }}>Service Visualization Image</p>
        </div>
    </div>
);

createRoot(document.getElementById('root')!).render(<Services />);
