import { memo, useState, createContext, useContext } from 'react';

const authContext = createContext(null); // Ensure default value is null

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Add setUser to allow updates

    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within a ContextProvider");
    }
    return context;
};

export default memo(ContextProvider);