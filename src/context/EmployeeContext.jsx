import { createContext, useContext, useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const INITIAL_EMPLOYEES = [
  { id: '1', name: 'Kanishk', department: 'Engineering', salary: 95000, email: 'kanishk@example.com', contact: '9876543210' },
  { id: '2', name: 'Apurv', department: 'Marketing', salary: 72000, email: 'apurv@example.com', contact: '9876543211' },
  { id: '3', name: 'Krrish', department: 'Sales', salary: 68000, email: 'krrish@example.com', contact: '9876543212' },
  { id: '4', name: 'Aryan', department: 'Human Resources', salary: 65000, email: 'aryan@example.com', contact: '9876543213' },
  { id: '5', name: 'Vinay', department: 'Finance', salary: 88000, email: 'vinay@example.com', contact: '9876543214' },
];

const EmployeeContext = createContext(null);

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useLocalStorage('employees', INITIAL_EMPLOYEES);

  const addEmployee = (data) => {
    const newEmployee = { id: generateId(), ...data };
    setEmployees((prev) => [...prev, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id, data) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...data } : emp))
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const getEmployeeById = (id) => employees.find((emp) => emp.id === id);

  const value = useMemo(
    () => ({
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      getEmployeeById,
    }),
    [employees]
  );

  return (
    <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider');
  }
  return context;
}
