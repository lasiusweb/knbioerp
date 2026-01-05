import React from 'react';
import { Leaf, Phone, Mail, User, ShoppingCart, Search, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
            {/* Top Bar */}
            <div style={{ background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--glass-border)', padding: '0.5rem 2rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} /> +91 98860 12345</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> contact@knbiosciences.in</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="/admin/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Partner Login</a>
                        <span>Help Center</span>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <div className="glass" style={{ margin: '0.5rem 1rem', padding: '0.75rem 1.5rem', borderRadius: '1rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'white' }}>
                        <Leaf color="var(--primary)" size={32} />
                        <div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', lineHeight: 1 }}>KN Biosciences</h1>
                            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Agri-Aqua Solutions</p>
                        </div>
                    </a>

                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        <NavLink href="/" label="Home" />
                        <NavLink href="/products/" label="Products" />
                        <NavLink href="/services/" label="Services" />
                        <NavLink href="/about/" label="About" />
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={20} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" placeholder="Search..." style={{ padding: '0.5rem 1rem', paddingRight: '2.5rem', width: '200px', fontSize: '0.9rem' }} />
                        </div>
                        <ShoppingCart size={22} cursor="pointer" />
                        <a href="/admin/login" style={{ color: 'white' }}><User size={22} cursor="pointer" /></a>
                    </div>
                </div>
            </div>
        </header>
    );
};

const NavLink = ({ href, label }: { href: string; label: string }) => (
    <a href={href} style={{
        textDecoration: 'none',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'color 0.3s'
    }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')} onMouseOut={(e) => (e.currentTarget.style.color = 'white')}>
        {label}
    </a>
);

export const Footer: React.FC = () => {
    return (
        <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--glass-border)', padding: '4rem 2rem 2rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Leaf color="var(--primary)" size={32} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>KN Biosciences</h2>
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        Leading the transition to sustainable agriculture and aquaculture through biotechnology and professional consulting.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <SocialIcon icon={<Facebook size={20} />} />
                        <SocialIcon icon={<Twitter size={20} />} />
                        <SocialIcon icon={<Instagram size={20} />} />
                        <SocialIcon icon={<Linkedin size={20} />} />
                    </div>
                </div>

                <div>
                    <h3 style={{ marginBottom: '1.5rem' }}>Quick Links</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <FooterLink href="/products/" label="Product Catalog" />
                        <FooterLink href="/services/" label="Our Services" />
                        <FooterLink href="/about/" label="Company Story" />
                        <FooterLink href="/admin/register" label="Become a Dealer" />
                    </ul>
                </div>

                <div>
                    <h3 style={{ marginBottom: '1.5rem' }}>Our Locations</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        Headquarters: Hebbal, Bengaluru<br />
                        Manufacturing: Dharwad, Karnataka
                    </p>
                    <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>contact@knbiosciences.in</p>
                </div>

                <div>
                    <h3 style={{ marginBottom: '1.5rem' }}>Newsletter</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Get the latest farming tips and product updates.</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="email" placeholder="Email" style={{ flex: 1 }} />
                        <button style={{ background: 'var(--primary)', color: 'black', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: '1400px', margin: '2rem auto 0', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                © 2026 KN BioSciences India Pvt Ltd. All rights reserved.
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
    <div className="glass" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.3s' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
        {icon}
    </div>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <li>
        <a href={href} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'white')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {label}
        </a>
    </li>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="bg-gradient" />
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};
