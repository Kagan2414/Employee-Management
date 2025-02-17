// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';  // Adjust the path if needed


const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) return <LoadingSpinner />;
    
    if (!user) return <Navigate to="/login" />;
    
    return children;
};


export default ProtectedRoute;