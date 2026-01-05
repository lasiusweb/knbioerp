import { createRoot } from 'react-dom/client';
import { Layout } from '../components/shared/Layout';
import { Filter, ShoppingBag, ArrowUpRight } from 'lucide-react';
import '../styles/index.css';

const Products = () => (
    <Layout>
        {/* Section 1: Page Header */}
        <section style={{ padding: '4rem 2rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Product Catalog</h1>
            <p style={{ color: 'var(--text-muted)' }}>Sustainable solutions for aquaculture, poultry, and agriculture.</p>
        </section>

        {/* Section 2: Filters & Search */}
        <section style={{ padding: '0 2rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
            <div className="glass" style={{ padding: '1rem 2rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)' }}>
                    <Filter size={20} /> <span style={{ fontWeight: 'bold' }}>Filters:</span>
                </div>
                {['All Products', 'Probiotics', 'Seeds', 'Machinery', 'Fertilizers'].map(cat => (
                    <button key={cat} style={{ background: 'transparent', color: 'white', fontSize: '1rem' }}>{cat}</button>
                ))}
            </div>
        </section>

        {/* Section 3: Product Grid */}
        <section style={{ padding: '0 2rem 6rem', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                <ProductCard name="Pro-Shrimp Boost" cat="Aquaculture" price="₹ 4,500" />
                <ProductCard name="Nitro-Aqua Stabilizer" cat="Water Treatment" price="₹ 2,800" />
                <ProductCard name="Organic Paddy Seeds" cat="Agriculture" price="₹ 1,200" />
                <ProductCard name="Auto-Feeder Pro" cat="Machinery" price="₹ 18,500" />
                <ProductCard name="Poultry-Immune+" cat="Poultry" price="₹ 3,200" />
                <ProductCard name="Soil-Health Pro" cat="Fertilizers" price="₹ 950" />
            </div>
        </section>
    </Layout>
);

const ProductCard = ({ name, cat, price }: any) => (
    <div className="glass animate-fade-in" style={{ padding: '1.5rem', transition: 'all 0.3s' }}>
        <div style={{ width: '100%', aspectRatio: '1/1', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={64} opacity={0.2} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 'bold' }}>{cat}</p>
                <h3 style={{ fontSize: '1.25rem', margin: '0.25rem 0' }}>{name}</h3>
            </div>
            <ArrowUpRight size={20} color="var(--text-muted)" />
        </div>
        <p style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>{price}</p>
        <button style={{ width: '100%', padding: '0.85rem', background: 'white', color: 'black', borderRadius: '0.5rem', fontWeight: 'bold' }}>Add to Cart</button>
    </div>
);

createRoot(document.getElementById('root')!).render(<Products />);
