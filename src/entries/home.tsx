import { createRoot } from 'react-dom/client';
import { Layout } from '../components/shared/Layout';
import { ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import '../styles/index.css';

const Home = () => (
    <Layout>
        {/* Section 1: Hero Slider Placeholder */}
        <section style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 2rem' }}>
            <div className="animate-fade-in">
                <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                    Pioneering <span style={{ color: 'var(--primary)' }}>Sustainable</span><br />Agri-Aqua Excellence
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                    Bridging biotechnology and traditional farming to deliver high-yield, eco-friendly solutions for the modern producer.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'black', borderRadius: '0.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Browse Catalog <ArrowRight size={20} />
                    </button>
                    <button className="glass" style={{ padding: '1rem 2rem', color: 'white' }}>Get Free Quote</button>
                </div>
            </div>
        </section>

        {/* Section 2: Specialization */}
        <section style={{ padding: '6rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Our Specialization</h2>
                <div style={{ height: '4px', width: '60px', background: 'var(--primary)', margin: '1rem auto' }}></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <SpecCard icon={<Zap color="var(--primary)" />} title="Aquaculture Probiotics" desc="Advanced water treatment and feed supplements for high-density shrimp and fish farming." />
                <SpecCard icon={<ShieldCheck color="var(--secondary)" />} title="STP & ETP Solutions" desc="Custom-engineered sewage and effluent treatment plants for eco-conscious industries." />
                <SpecCard icon={<Heart color="var(--accent)" />} title="Integrated Poultry" desc="Bio-secure nutritional solutions to enhance immunity and growth in commercial poultry." />
            </div>
        </section>

        {/* Section 3: Trust Builders */}
        <section className="glass" style={{ margin: '4rem 2rem', padding: '4rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '3rem' }}>Trusted by 10,000+ Farmers Across India</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                <StatItem val="15+" label="Years Experience" />
                <StatItem val="850+" label="Dealer Network" />
                <StatItem val="100%" label="Organic Certified" />
                <StatItem val="ISO" label="9001:2015" />
            </div>
        </section>
    </Layout>
);

const SpecCard = ({ icon, title, desc }: any) => (
    <div className="glass" style={{ padding: '2.5rem', transition: 'transform 0.3s' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
        <div style={{ marginBottom: '1.5rem' }}>{icon}</div>
        <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
    </div>
);

const StatItem = ({ val, label }: any) => (
    <div>
        <h3 style={{ fontSize: '3rem', fontWeight: '800', color: 'white' }}>{val}</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
    </div>
);

createRoot(document.getElementById('root')!).render(<Home />);
