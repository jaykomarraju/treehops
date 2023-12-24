import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the import path as needed

const RequireAuth = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        // User not logged in, redirect to login page
        return <Navigate to="/auth" />;
    }

    return children;
};

export default RequireAuth;
