import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUserProfile } from '../models';

interface AuthState {
    user: IUserProfile | null;
    isAuthenticated: boolean;
    token: string | null;
}

interface AppContextType {
    state: AuthState;
    login: (user: IUserProfile, token: string) => void;
    logout: () => void;
    updateProfile: (updates: Partial<IUserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        token: null,
    });

    // Initialize from localStorage for persistence
    useEffect(() => {
        const savedToken = localStorage.getItem('kn_token');
        const savedUser = localStorage.getItem('kn_user');
        if (savedToken && savedUser) {
            setState({
                user: JSON.parse(savedUser),
                token: savedToken,
                isAuthenticated: true,
            });
        }
    }, []);

    const login = (user: IUserProfile, token: string) => {
        localStorage.setItem('kn_token', token);
        localStorage.setItem('kn_user', JSON.stringify(user));
        setState({ user, token, isAuthenticated: true });
    };

    const logout = () => {
        localStorage.removeItem('kn_token');
        localStorage.removeItem('kn_user');
        setState({ user: null, token: null, isAuthenticated: false });
    };

    const updateProfile = (updates: Partial<IUserProfile>) => {
        if (state.user) {
            const newUser = { ...state.user, ...updates };
            localStorage.setItem('kn_user', JSON.stringify(newUser));
            setState(prev => ({ ...prev, user: newUser }));
        }
    };

    return (
        <AppContext.Provider value={{ state, login, logout, updateProfile }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppStore = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppStore must be used within an AppProvider');
    }
    return context;
};
