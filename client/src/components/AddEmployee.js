import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    department: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  
  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;
    
    if (!employee.name.trim()) {
      tempErrors.name = "Name is required";
      formIsValid = false;
    }
    
    if (!employee.email.trim()) {
      tempErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      tempErrors.email = "Email is invalid";
      formIsValid = false;
    }
    
    if (!employee.department.trim()) {
      tempErrors.department = "Department is required";
      formIsValid = false;
    }
    
    if (!employee.salary) {
      tempErrors.salary = "Salary is required";
      formIsValid = false;
    } else if (isNaN(employee.salary) || Number(employee.salary) <= 0) {
      tempErrors.salary = "Salary must be a positive number";
      formIsValid = false;
    }
    
    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setServerError('');
    
    try {
      await api.post('/employees', {
        ...employee,
        salary: Number(employee.salary)
      });
      navigate('/');
    } catch (error) {
      setServerError('Failed to add employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Employee</h1>
        
        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{serverError}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter employee name"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter employee email"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              className={`input-field ${errors.department ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter employee department"
              value={employee.department}
              onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
            />
            {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Salary (Rs.)</label>
            <input
              type="number"
              className={`input-field ${errors.salary ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter employee salary"
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
            {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button 
              type="button" 
              onClick={handleCancel} 
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary relative"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="opacity-0">Save Employee</span>
                  <svg className="animate-spin absolute inset-0 m-auto h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                'Save Employee'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;