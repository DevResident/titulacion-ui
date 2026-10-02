import { createContext } from 'react';

export type AuthContextType = {
    token: string | null;
    setToken: (t: string | null) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export {};
