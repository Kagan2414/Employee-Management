import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  // Set document title
  React.useEffect(() => {
    document.title = 'Employee Management System';
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
          </Routes>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;