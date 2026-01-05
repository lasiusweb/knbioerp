import { createRoot } from 'react-dom/client';
import { Layout } from '../components/shared/Layout';
import { Award, Target, Flag } from 'lucide-react';
import '../styles/index.css';

const About = () => (
    <Layout>
        <section style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Our Story</h1>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '3rem' }}>
                Founded in 2011, KN Biosciences started with a single mission: to make high-tech biotechnology accessible to the rural heartlands of India. Today, we are a leader in sustainable agri-tech, serving thousands of farmers and industrial sectors.
            </p>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.02)', padding: '6rem 2rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                <AboutIcon icon={<Target color="var(--primary)" />} title="Our Vision" desc="To lead the global transition toward sustainable, chemical-free food systems through biological innovation." />
                <AboutIcon icon={<Flag color="var(--secondary)" />} title="Our Mission" desc="Empowering farmers with bio-solutions that increase yield while restoring soil and water ecosystems." />
                <AboutIcon icon={<Award color="var(--accent)" />} title="Core Values" desc="Integrity, Innovation, and Interdependence. We grow when our farming communities grow." />
            </div>
        </section>
    </Layout>
);

const AboutIcon = ({ icon, title, desc }: any) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginBottom: '1.5rem' }}>{icon}</div>
        <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
    </div>
);

createRoot(document.getElementById('root')!).render(<About />);
