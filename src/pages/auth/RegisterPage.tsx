import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, ShieldCheck, Briefcase, MapPin } from 'lucide-react';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('farmer');

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
            <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Join the Network</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create your professional account</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', padding: '0.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem' }}>
                    {['farmer', 'dealer', 'distributor'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            style={{
                                flex: 1,
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                background: role === r ? 'var(--primary)' : 'transparent',
                                color: role === r ? 'black' : 'white',
                                textTransform: 'capitalize',
                                fontWeight: '500'
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input type="text" placeholder="First Name" style={{ flex: 1 }} required />
                        <input type="text" placeholder="Last Name" style={{ flex: 1 }} required />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="email" placeholder="Email Address" style={{ width: '100%', paddingLeft: '3rem' }} required />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="Business Name" style={{ width: '100%', paddingLeft: '3rem' }} required />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="Location / Region" style={{ width: '100%', paddingLeft: '3rem' }} required />
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        style={{
                            background: 'white',
                            color: 'black',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            fontWeight: '600',
                            marginTop: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        Create Account <UserPlus size={18} />
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
