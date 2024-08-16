import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    username?: string;  // Optional: Add username
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setUsername?: React.Dispatch<React.SetStateAction<string | undefined>>;  // Optional: Add setter for username
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('jwtToken'));
    const [username, setUsername] = useState<string | undefined>(undefined);

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, setIsLoggedIn, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
