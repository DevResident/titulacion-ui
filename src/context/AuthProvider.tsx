import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextType } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setTokenState] = useState<string | null>(localStorage.getItem('auth_token'));

    const setToken = useCallback((t: string | null) => {
        setTokenState(t);
        if (t) localStorage.setItem('auth_token', t);
        else localStorage.removeItem('auth_token');
    }, []);

    const logout = useCallback(() => {
        setToken(null);
    }, [setToken]);

    const value: AuthContextType = useMemo(
        () => ({ token, setToken, logout }),
        [token, setToken, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
